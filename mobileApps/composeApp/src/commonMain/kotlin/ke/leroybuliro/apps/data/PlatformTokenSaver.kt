package ke.leroybuliro.apps.data

interface PlatformTokenSaver {
    suspend fun saveToken(token: String)
    suspend fun getToken(token: String): String?
    suspend fun clearToken()
}
