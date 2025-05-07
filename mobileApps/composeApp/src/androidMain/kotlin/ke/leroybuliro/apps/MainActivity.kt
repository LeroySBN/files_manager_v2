package ke.leroybuliro.apps

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview
import ke.leroybuliro.apps.data.AndroidTokenSaver
import ke.leroybuliro.apps.data.PlatformTokenSaver

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val platformTokenSaver: PlatformTokenSaver = AndroidTokenSaver(context = this)
        setContent {
            App(platformTokenSaver)
        }
    }
}

@Preview
@Composable
fun AppAndroidPreview() {
    // For preview, use a fake or dummy implementation if needed
    val dummySaver = object : PlatformTokenSaver {
        override suspend fun saveToken(token: String) {}
        override suspend fun clearToken() {}
        override suspend fun getToken(token: String): String? = null
    }
    App(dummySaver)
}