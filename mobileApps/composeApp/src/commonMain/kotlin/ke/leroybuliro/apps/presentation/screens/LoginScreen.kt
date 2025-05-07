package ke.leroybuliro.apps.presentation.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.VisibilityOff
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import ke.leroybuliro.apps.localization.StringResources
import ke.leroybuliro.apps.presentation.theme.DarkColorPalette
import ke.leroybuliro.apps.presentation.theme.LightColorPalette

@Composable
fun LoginScreen(
    onLogin: suspend (email: String, password: String) -> String?,
    onSwitchToSignup: () -> Unit,
    isDarkTheme: Boolean,
) {
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var error by remember { mutableStateOf<String?>(null) }
    var loading by remember { mutableStateOf(false) }
    var attemptLogin by remember { mutableStateOf(false) }
    var passwordVisible by remember { mutableStateOf(false) }

    MaterialTheme(colors = if (isDarkTheme) DarkColorPalette else LightColorPalette) {
        Surface(
            modifier = Modifier.fillMaxSize(),
            color = MaterialTheme.colors.background
        ) {
            Column(
                modifier = Modifier.fillMaxSize().padding(16.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center
            ) {
                Text(
                    StringResources.login,
                    style = MaterialTheme.typography.h4,
                )
                Spacer(Modifier.height(16.dp))
                OutlinedTextField(
                    value = email,
                    onValueChange = { email = it },
                    label = { Text(StringResources.email) },
                    colors = TextFieldDefaults.outlinedTextFieldColors(
                        textColor = MaterialTheme.colors.onBackground,
                        cursorColor = MaterialTheme.colors.onBackground,
                        placeholderColor = MaterialTheme.colors.onBackground,
                        focusedLabelColor = MaterialTheme.colors.primary,
                        unfocusedLabelColor = MaterialTheme.colors.onBackground,
                        unfocusedBorderColor = MaterialTheme.colors.onBackground,
                        focusedBorderColor = MaterialTheme.colors.primary,
                    ),
                    modifier = Modifier.fillMaxWidth(),
                )
                Spacer(Modifier.height(8.dp))
                OutlinedTextField(
                    value = password,
                    onValueChange = { password = it },
                    label = { Text(StringResources.password) },
                    colors = TextFieldDefaults.outlinedTextFieldColors(
                        textColor = MaterialTheme.colors.onBackground,
                        cursorColor = MaterialTheme.colors.onBackground,
                        placeholderColor = MaterialTheme.colors.onBackground,
                        focusedLabelColor = MaterialTheme.colors.primary,
                        unfocusedLabelColor = MaterialTheme.colors.onBackground,
                        unfocusedBorderColor = MaterialTheme.colors.onBackground,
                        focusedBorderColor = MaterialTheme.colors.primary,
                    ),
                    visualTransformation = if (passwordVisible) VisualTransformation.None else PasswordVisualTransformation(),
                    modifier = Modifier.fillMaxWidth(),
                    trailingIcon = {
                        IconButton(onClick = { passwordVisible = !passwordVisible }) {
                            Icon(
                                imageVector = if (passwordVisible) Icons.Filled.VisibilityOff else Icons.Filled.Visibility,
                                contentDescription = if (passwordVisible) "Hide password" else "Show password",
                                tint = MaterialTheme.colors.onBackground
                            )
                        }
                    }
                )
                Spacer(Modifier.height(16.dp))
                if (error != null) {
                    Text(error ?: "", color = MaterialTheme.colors.error)
                    Spacer(Modifier.height(8.dp))
                }
                LaunchedEffect(attemptLogin) {
                    if (attemptLogin && !loading) {
                        loading = true
                        error = null
                        val result = onLogin(email, password)
                        if (result != null) {
                            error = result
                        }
                        loading = false
                        attemptLogin = false
                    }
                }

                Button(
                    onClick = { attemptLogin = true },
                    enabled = !loading,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    if (loading)
                        CircularProgressIndicator(Modifier.size(20.dp), strokeWidth = 2.dp)
                    else
                        Text(
                            StringResources.loginButton,
                            style = TextStyle(
                                fontWeight = FontWeight.SemiBold,
                                fontSize = 16.sp
                            )
                        )
                }
                Spacer(Modifier.height(8.dp))
                TextButton(onClick = onSwitchToSignup) {
                    Text(StringResources.noAccountYet)
                }
            }
        }
    }
}
