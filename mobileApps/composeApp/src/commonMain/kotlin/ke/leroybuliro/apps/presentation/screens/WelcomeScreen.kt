package ke.leroybuliro.apps.presentation.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import filesmanager.composeapp.generated.resources.Res
import filesmanager.composeapp.generated.resources.*
import ke.leroybuliro.apps.presentation.theme.DarkColorPalette
import ke.leroybuliro.apps.presentation.theme.LightColorPalette
import org.jetbrains.compose.resources.*

@Composable
fun WelcomeScreen(
    onLogin: () -> Unit, 
    onSignup: () -> Unit,
    isDarkTheme: Boolean,
    onToggleTheme: () -> Unit
) {
    // Locally scope MaterialTheme for WelcomeScreen only
    MaterialTheme(
        colorScheme = if (isDarkTheme)
                DarkColorPalette
            else
                LightColorPalette
    ) {
        Surface(
            modifier = Modifier.fillMaxSize(),
            color = MaterialTheme.colorScheme.background
        ) {
            // Box to allow proper positioning of elements
            Box(modifier = Modifier.fillMaxSize()) {
                // Theme toggle button in the top-right corner
                IconButton(
                    onClick = {
                        onToggleTheme()
                    },
                    modifier = Modifier
                        .align(Alignment.TopEnd)
                        .padding(18.dp, 50.dp)
                        .size(48.dp),
                    colors = IconButtonDefaults.iconButtonColors(
                        containerColor = Color.Transparent,
                    ),
                    content = {
                        Icon(
                            modifier = Modifier.size(34.dp),
                            painter = if (isDarkTheme)
                                    painterResource(Res.drawable.light_mode_24px)
                                else
                                    painterResource(Res.drawable.dark_mode_24px),
                            contentDescription = if (isDarkTheme)
                                    stringResource(Res.string.switch_to_light_theme)
                                else
                                    stringResource(Res.string.switch_to_dark_theme),
                            tint = if (isDarkTheme)
                                    Color.Yellow
                                else
                                    Color.DarkGray
                        )
                    }
                )

                // Main content column
                Column(
                    modifier = Modifier.fillMaxSize().padding(24.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Center
                ) {
                    Text(
                        text = stringResource(Res.string.app_name),
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onBackground
                    )
                    Spacer(Modifier.height(8.dp))

                    Spacer(Modifier.height(32.dp))
                    Button(
                        onClick = onLogin,
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text(
                            text = stringResource(Res.string.login),
                            style = TextStyle(
                                fontWeight = FontWeight.SemiBold,
                                fontSize = 16.sp
                            )
                        )
                    }

                    Spacer(Modifier.height(16.dp))
                    Button(
                        onClick = onSignup,
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text(
                            text = stringResource(Res.string.signup),
                            style = TextStyle(
                                fontWeight = FontWeight.SemiBold,
                                fontSize = 16.sp
                            )
                        )
                    }
                }
            }
        }
    }
}
