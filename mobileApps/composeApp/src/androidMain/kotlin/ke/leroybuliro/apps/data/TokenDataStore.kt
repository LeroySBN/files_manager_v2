package ke.leroybuliro.apps.data

import android.content.Context
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

private const val DATASTORE_NAME = "user_prefs"
private val TOKEN_KEY = stringPreferencesKey("auth_token")

val Context.tokenDataStore by preferencesDataStore(
    name = DATASTORE_NAME
)

object TokenDataStore {
    suspend fun saveToken(context: Context, token: String) {
        context.tokenDataStore.edit { prefs ->
            prefs[TOKEN_KEY] = token
        }
    }

    fun getTokenFlow(context: Context): Flow<String?> =
        context.tokenDataStore.data.map { prefs ->
            prefs[TOKEN_KEY]
        }

    suspend fun clearToken(context: Context) {
        context.tokenDataStore.edit { prefs ->
            prefs.remove(TOKEN_KEY)
        }
    }
}
