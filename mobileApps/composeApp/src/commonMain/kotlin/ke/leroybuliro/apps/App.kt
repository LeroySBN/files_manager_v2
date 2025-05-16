package ke.leroybuliro.apps

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Snackbar
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import ke.leroybuliro.apps.data.PlatformTokenSaver
//import ke.leroybuliro.apps.domain.File
//import ke.leroybuliro.apps.presentation.file_list.FileListScreen
//import ke.leroybuliro.apps.presentation.file_list.FileListState
import ke.leroybuliro.apps.presentation.screens.LoginScreen
import ke.leroybuliro.apps.presentation.screens.SignupScreen
import ke.leroybuliro.apps.presentation.screens.WelcomeScreen
import ke.leroybuliro.apps.presentation.viewmodels.AuthViewModel
import kotlinx.coroutines.launch

enum class Screen {
    Welcome, Login, Signup,
//    FileList
}

// TODO: use sharedFlow to send snack-bar error events to the ui

//private val files = (1..20).map {
//    File(
//        fileId = it.toString(),
//        userId = "1",
//        name = "File $it",
//        type = "file",
//        isPublic = false,
//        parentId = "0"
//    )
//}

@Composable
fun App(platformTokenSaver: PlatformTokenSaver) {
    var isDarkMode by remember { mutableStateOf(false) }
    val backgroundColor = if (isDarkMode) Color(0xFFBBBBBB) else Color.White
    val toggleTheme = {
        isDarkMode = !isDarkMode
    }
    val authViewModel = remember { AuthViewModel(platformTokenSaver) }
    val errorMsg by authViewModel.error.collectAsState()

    MaterialTheme {
        Surface(
            modifier = Modifier.fillMaxSize()
                .background(backgroundColor)
        ) {
            var screen by remember { mutableStateOf(Screen.Welcome) }
            var userEmail by remember { mutableStateOf<String?>(null) }
            val coroutineScope = rememberCoroutineScope()

            when (screen) {
                Screen.Welcome -> {
                    WelcomeScreen(
                        onLogin = { screen = Screen.Login },
                        onSignup = { screen = Screen.Signup },
                        isDarkTheme = isDarkMode,
                        onToggleTheme = toggleTheme
                    )
                }

                Screen.Login -> {
                    LoginScreen(
                        isDarkTheme = isDarkMode,
                        onLogin = { email, password ->
                            coroutineScope.launch {
                                authViewModel.login(email, password) {
                                    userEmail = email
//                                    screen = Screen.FileList
                                }
                            }
                            // errorMsg and loading are handled by ViewModel
                            null // UI should read errorMsg from ViewModel
                        },
                        onSwitchToSignup = { screen = Screen.Signup }
                    )
                }

                Screen.Signup -> {
                    SignupScreen(
                        isDarkTheme = isDarkMode,
                        onSignup = { email, password ->
                            coroutineScope.launch {
                                authViewModel.signup(email, password) {
                                    userEmail = email
                                    screen = Screen.Login
                                }
                            }
                            // errorMsg and loading are handled by ViewModel
                            null // UI should read errorMsg from ViewModel
                        },
                        onSwitchToLogin = { screen = Screen.Login }
                    )
                }

//                Screen.FileList -> {
//                    FileListScreen(
//                        state = FileListState(
//                            documentList = files,
//                            collectionList = files.filter { it.type == "collections" },
//                            selectedTabIndex = 0,
//                            isLoading = false,
//                            error = null
//                        ),
//                        onAction = {},
//                        isDarkTheme = isDarkMode,
//                        onLogout = {
//                            coroutineScope.launch {
//                                authViewModel.logout {
//                                    userEmail = null
//                                    screen = Screen.Welcome
//                                }
//                            }
//                        }
//                    )
//                }
            }

            if (errorMsg != null) {
                Box(
                    modifier = Modifier.fillMaxSize().padding(16.dp),
                    contentAlignment = Alignment.BottomCenter
                ) {
                    Snackbar { Text(errorMsg ?: "") }
                }
            }
        }
    }
}
