package ke.leroybuliro.apps.network

import io.ktor.client.call.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import kotlinx.serialization.Serializable
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlin.jvm.JvmInline

@Serializable
data class LoginResponse(val token: String? = null, val email: String? = null, val error: String? = null)

@Serializable
data class SignupRequest(val email: String, val password: String)
@Serializable
data class SignupResponse(val email: String? = null, val error: String? = null)

import com.russhwolf.settings.Settings

object AuthApi {
    private const val TOKEN_KEY = "auth_token"
    private val settings: Settings = Settings()
    private var token: String? = null

    fun getToken(): String? {
        if (token == null) {
            token = settings.getStringOrNull(TOKEN_KEY)
        }
        return token
    }

    fun clearToken() {
        token = null
        settings.remove(TOKEN_KEY)
    }

    suspend fun login(email: String, password: String): LoginResponse = withContext(Dispatchers.Default) {
        val basic = "Basic " + ("$email:$password").encodeToByteArray().let { java.util.Base64.getEncoder().encodeToString(it) }
        val response: HttpResponse = ApiClient.client.get("${ApiClient.BASE_URL}/connect") {
            headers { append(HttpHeaders.Authorization, basic) }
        }
        val body = response.body<LoginResponse>()
        if (body.token != null) {
            token = body.token
            settings.putString(TOKEN_KEY, body.token)
        }
        body
    }

    suspend fun signup(email: String, password: String): SignupResponse = withContext(Dispatchers.Default) {
        val response: HttpResponse = ApiClient.client.post("${ApiClient.BASE_URL}/users") {
            contentType(ContentType.Application.Json)
            setBody(SignupRequest(email, password))
        }
        response.body()
    }

    suspend fun logout() = withContext(Dispatchers.Default) {
        if (token == null) return@withContext
        ApiClient.client.get("${ApiClient.BASE_URL}/disconnect") {
            headers { append(HttpHeaders.Authorization, "Bearer $token") }
        }
        token = null
    }
}
