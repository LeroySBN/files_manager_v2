package ke.leroybuliro.apps

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Snackbar
import androidx.compose.material.Text
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
import ke.leroybuliro.apps.presentation.screens.DashboardScreen
import ke.leroybuliro.apps.presentation.screens.LoadingScreen
import ke.leroybuliro.apps.presentation.screens.LoginScreen
import ke.leroybuliro.apps.presentation.screens.SignupScreen
import ke.leroybuliro.apps.presentation.screens.WelcomeScreen
import ke.leroybuliro.apps.presentation.viewmodels.AuthViewModel
import kotlinx.coroutines.launch
import org.jetbrains.compose.ui.tooling.preview.Preview

enum class Screen {
    Welcome, Login, Signup, Dashboard
}

@Composable
@Preview
fun App(platformTokenSaver: PlatformTokenSaver) {
    var isDarkMode by remember { mutableStateOf(false) }
    val backgroundColor = if (isDarkMode) Color(0xFFBBBBBB) else Color.White
    val toggleTheme = {
        isDarkMode = !isDarkMode
        println("THEME TOGGLED: isDarkMode = $isDarkMode")
    }
    val authViewModel = remember { AuthViewModel(platformTokenSaver) }
    val loading by authViewModel.loading.collectAsState()
    val errorMsg by authViewModel.error.collectAsState()

    MaterialTheme {
        Box(
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
                                    screen = Screen.Dashboard
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
                                    screen = Screen.Dashboard
                                }
                            }
                            // errorMsg and loading are handled by ViewModel
                            null // UI should read errorMsg from ViewModel
                        },
                        onSwitchToLogin = { screen = Screen.Login }
                    )
                }

                Screen.Dashboard -> {
                    DashboardScreen(
                        isDarkTheme = isDarkMode,
                        onLogout = {
                            coroutineScope.launch {
                                authViewModel.logout {
                                    userEmail = null
                                    screen = Screen.Welcome
                                }
                            }
                        }
                    )
                }
            }

            if (loading) {
                LoadingScreen()
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
