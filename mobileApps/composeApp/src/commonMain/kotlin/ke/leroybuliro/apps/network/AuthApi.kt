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

    suspend fun login(email: String, password: String): LoginResponse = withContext(Dispatchers.Default) {
        try {
            val credentials = "$email:$password"
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
                // TODO:save token to disk
                println("Login successful. Token: $token")
            }
            return@withContext body
        } catch (e: Exception) {
            println("Login error: ${e.message}")
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
            
            if (result.email != null && result.id != null) {
                // TODO: success screen instructing user to login then redirect to login screen
                println("Signup successful.")
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
            println("Logout error: ${e.message}")
        } finally {
//            clearToken()
            // TODO: implement clearToken 
        }
    }
}
