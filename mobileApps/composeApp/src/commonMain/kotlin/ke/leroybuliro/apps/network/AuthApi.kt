package ke.leroybuliro.apps.network

import io.ktor.client.call.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.util.encodeBase64
import kotlinx.serialization.Serializable
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

@Serializable
data class LoginResponse(val token: String? = null, val error: String? = null)

@Serializable
data class SignupRequest(val email: String, val password: String, val error: String? = null)

@Serializable
data class SignupResponse(val id: String? = null, val email: String? = null, val token: String? = null, val error: String? = null)


object AuthApi {
    private var token: String? = null
    
    fun setToken(newToken: String?) {
        token = newToken
    }

    fun getToken(): String? {
        return token
    }

    fun clearToken() {
        token = null
    }

    suspend fun login(email: String, password: String): LoginResponse = withContext(Dispatchers.Default) {
        try {
            // Create credentials string exactly as the web UI does
            val credentials = "$email:$password"
            // Use the standard Base64 encoding without any padding or line breaks
            val encodedCredentials = credentials.encodeBase64()
            val basic = "Basic $encodedCredentials"
            
            println("Attempting login with auth header: $basic")
            
            val response: HttpResponse = ApiClient.client.get("${ApiClient.BASE_URL}/connect") {
                headers { 
                    append(HttpHeaders.Authorization, basic)
                    append(HttpHeaders.ContentType, ContentType.Application.Json.toString())
                }
            }
            val body = response.body<LoginResponse>()
            if (body.token != null) {
                // Simply store the token in memory
                setToken(body.token)
            }
            return@withContext body
        } catch (e: Exception) {
            println("Login error: ${e.message}")
            // Preserve the original error message
            return@withContext LoginResponse(error = e.message ?: "Operation not permitted")
        }
    }

    suspend fun signup(email: String, password: String): SignupResponse = withContext(Dispatchers.Default) {
        try {
            val response: HttpResponse = ApiClient.client.post("${ApiClient.BASE_URL}/users") {
                contentType(ContentType.Application.Json)
                setBody(SignupRequest(email, password))
            }
            val result = response.body<SignupResponse>()
            
            // If signup was successful and we have an email, we can consider the user logged in
            if (result.email != null && result.id != null && result.token != null) {
                // Simply store the token in memory
                setToken(result.token)
            }
            
            return@withContext result
        } catch (e: Exception) {
            println("Signup error: ${e.message}")
            return@withContext SignupResponse(error = e.message ?: "Signup failed")
        }
    }

    suspend fun logout() = withContext(Dispatchers.Default) {
        try {
            if (token == null) return@withContext
            ApiClient.client.get("${ApiClient.BASE_URL}/disconnect") {
                headers { append("X-Token", token!!) }
            }
        } catch (e: Exception) {
            // Log error but continue with token removal
            println("Logout error: ${e.message}")
        } finally {
            clearToken()
        }
    }
}
