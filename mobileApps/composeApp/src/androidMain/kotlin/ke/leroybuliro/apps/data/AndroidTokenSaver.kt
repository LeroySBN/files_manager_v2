package ke.leroybuliro.apps.data

import android.content.Context

import kotlinx.coroutines.flow.firstOrNull

class AndroidTokenSaver(private val context: Context) : PlatformTokenSaver {
    override suspend fun saveToken(token: String) {
        TokenDataStore.saveToken(context, token)
    }
    override suspend fun getToken(token: String): String? {
        return TokenDataStore.getTokenFlow(context).firstOrNull()
    }
    override suspend fun clearToken() {
        TokenDataStore.clearToken(context)
    }
}
