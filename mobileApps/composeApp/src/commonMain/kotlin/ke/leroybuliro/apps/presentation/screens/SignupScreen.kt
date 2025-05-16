package ke.leroybuliro.apps.presentation.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import filesmanager.composeapp.generated.resources.Res
import filesmanager.composeapp.generated.resources.*
import ke.leroybuliro.apps.presentation.theme.DarkColorPalette
import ke.leroybuliro.apps.presentation.theme.LightColorPalette
import org.jetbrains.compose.resources.*

@Composable
fun SignupScreen(
    onSignup: suspend (email: String, password: String) -> String?,
    onSwitchToLogin: () -> Unit,
    isDarkTheme: Boolean,
) {
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var error by remember { mutableStateOf<String?>(null) }
    var loading by remember { mutableStateOf(false) }
    var attemptSignup by remember { mutableStateOf(false) }
    var passwordVisible by remember { mutableStateOf(false) }

    // Use a Surface with the theme background color
    MaterialTheme(
        colorScheme = if (isDarkTheme) DarkColorPalette else LightColorPalette
    ) {
        Surface(
            modifier = Modifier.fillMaxSize(),
            color = MaterialTheme.colorScheme.background
        ) {
            Column(
                modifier = Modifier.fillMaxSize().padding(16.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center
            ) {
                Text(
                    text = stringResource(Res.string.signup),
                    style = MaterialTheme.typography.titleLarge,
                )
                Spacer(Modifier.height(16.dp))
                OutlinedTextField(
                    modifier = Modifier.fillMaxWidth(),
                    value = stringResource(Res.string.email),
                    onValueChange = { email = it },
                    label = {
                        Text(
                            text = stringResource(Res.string.email),
                        )
                    },
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedTextColor = MaterialTheme.colorScheme.onBackground,
                        unfocusedTextColor = MaterialTheme.colorScheme.onBackground,
                        cursorColor = MaterialTheme.colorScheme.onBackground,
                        focusedBorderColor = MaterialTheme.colorScheme.primary,
                        unfocusedBorderColor = MaterialTheme.colorScheme.onBackground,
                        focusedLabelColor = MaterialTheme.colorScheme.primary,
                        unfocusedLabelColor = MaterialTheme.colorScheme.onBackground,
                        focusedPlaceholderColor = MaterialTheme.colorScheme.onBackground,
                        unfocusedPlaceholderColor = MaterialTheme.colorScheme.onBackground,
                    ),
                )
                Spacer(Modifier.height(8.dp))
                OutlinedTextField(
                    value = stringResource(Res.string.password),
                    onValueChange = { password = it },
                    label = {
                        Text(
                            text = stringResource(Res.string.password),
                        )
                    },
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedTextColor = MaterialTheme.colorScheme.onBackground,
                        unfocusedTextColor = MaterialTheme.colorScheme.onBackground,
                        cursorColor = MaterialTheme.colorScheme.onBackground,
                        focusedBorderColor = MaterialTheme.colorScheme.primary,
                        unfocusedBorderColor = MaterialTheme.colorScheme.onBackground,
                        focusedLabelColor = MaterialTheme.colorScheme.primary,
                        unfocusedLabelColor = MaterialTheme.colorScheme.onBackground,
                        focusedPlaceholderColor = MaterialTheme.colorScheme.onBackground,
                        unfocusedPlaceholderColor = MaterialTheme.colorScheme.onBackground,
                    ),
                    visualTransformation = if (passwordVisible)
                            VisualTransformation.None
                        else
                            PasswordVisualTransformation(),
                    modifier = Modifier.fillMaxWidth(),
                    trailingIcon = {
                        IconButton(onClick = { passwordVisible = !passwordVisible }) {
                            Icon(
                                painter = if (passwordVisible)
                                        painterResource(Res.drawable.visibility_off_24px)
                                    else
                                        painterResource(Res.drawable.visibility_24px),
                                contentDescription = if (passwordVisible)
                                        stringResource(Res.string.hide_password)
                                    else
                                        stringResource(Res.string.show_password),
                                tint = MaterialTheme.colorScheme.onBackground
                            )
                        }
                    }
                )
                Spacer(Modifier.height(16.dp))
                if (error != null) {
                    Text(error ?: "", color = MaterialTheme.colorScheme.error)
                    Spacer(Modifier.height(8.dp))
                }
                LaunchedEffect(attemptSignup) {
                    if (attemptSignup && !loading) {
                        loading = true
                        error = null
                        val result = onSignup(email, password)
                        if (result != null) {
                            error = result
                        }
                        loading = false
                        attemptSignup = false
                    }
                }

                Button(
                    onClick = { attemptSignup = true },
                    enabled = !loading,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    if (loading)
                        CircularProgressIndicator(Modifier.size(20.dp), strokeWidth = 2.dp)
                    else
                        Text(
                            text = stringResource(Res.string.signup),
                            style = TextStyle(
                                fontWeight = FontWeight.SemiBold,
                                fontSize = 16.sp
                            )
                        )
                }
                Spacer(Modifier.height(8.dp))
                TextButton(onClick = onSwitchToLogin) {
                    Text(
                        text = stringResource(Res.string.already_have_account)
                    )
                }
            }
        }
    }
}
