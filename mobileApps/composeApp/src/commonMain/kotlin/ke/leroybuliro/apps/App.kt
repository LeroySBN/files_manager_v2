package ke.leroybuliro.apps

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material.Button
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import org.jetbrains.compose.resources.painterResource
import org.jetbrains.compose.ui.tooling.preview.Preview

import filesmanager.composeapp.generated.resources.Res
import filesmanager.composeapp.generated.resources.compose_multiplatform

import ke.leroybuliro.apps.network.AuthApi
import io.ktor.client.plugins.*

@Composable
@Preview
fun App() {
    MaterialTheme {
        var screen by remember { mutableStateOf<Screen>(Screen.Welcome) }
        var userEmail by remember { mutableStateOf<String?>(null) }
        var errorMsg by remember { mutableStateOf<String?>(null) }
        var loading by remember { mutableStateOf(false) }

        fun resetState() {
            errorMsg = null
            loading = false
        }

        when (screen) {
            Screen.Welcome -> {
                WelcomeScreen(
                    onLogin = { screen = Screen.Login },
                    onSignup = { screen = Screen.Signup }
                )
            }
            Screen.Login -> {
                LoginScreen(
                    onLogin = { email, password ->
                        resetState()
                        if (email.isBlank() || password.isBlank()) {
                            return@LoginScreen "Please fill in all fields"
                        }
                        loading = true
                        try {
                            val resp = AuthApi.login(email, password)
                            loading = false
                            if (resp.token != null) {
                                userEmail = email
                                screen = Screen.Dashboard
                                null
                            } else {
                                resp.error ?: "Login failed"
                            }
                        } catch (e: ResponseException) {
                            loading = false
                            e.response.bodyAsText()
                        } catch (e: Exception) {
                            loading = false
                            e.message ?: "Login failed"
                        }
                    },
                    onSwitchToSignup = { screen = Screen.Signup }
                )
            }
            Screen.Signup -> {
                SignupScreen(
                    onSignup = { email, password ->
                        resetState()
                        if (email.isBlank() || password.isBlank()) {
                            return@SignupScreen "Please fill in all fields"
                        }
                        loading = true
                        try {
                            val resp = AuthApi.signup(email, password)
                            loading = false
                            if (resp.email != null) {
                                userEmail = email
                                screen = Screen.Dashboard
                                null
                            } else {
                                resp.error ?: "Signup failed"
                            }
                        } catch (e: ResponseException) {
                            loading = false
                            e.response.bodyAsText()
                        } catch (e: Exception) {
                            loading = false
                            e.message ?: "Signup failed"
                        }
                    },
                    onSwitchToLogin = { screen = Screen.Login }
                )
            }
            Screen.Dashboard -> {
                DashboardScreen(
                    userEmail = userEmail ?: "",
                    onLogout = {
                        loading = true
                        resetState()
                        try {
                            AuthApi.logout()
                        } catch (_: Exception) {}
                        loading = false
                        userEmail = null
                        screen = Screen.Welcome
                    }
                )
            }
        }
        if (loading) {
            // Optionally show a loading overlay
        }
        if (errorMsg != null) {
            // Optionally show error message
        }
    }
}

sealed class Screen {
    object Welcome : Screen()
    object Login : Screen()
    object Signup : Screen()
    object Dashboard : Screen()
}