package ke.leroybuliro.apps.presentation.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material.*
import androidx.compose.material.ButtonDefaults
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.DarkMode
import androidx.compose.material.icons.filled.LightMode
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp

import ke.leroybuliro.apps.localization.StringResources
import ke.leroybuliro.apps.presentation.theme.DarkColorPalette
import ke.leroybuliro.apps.presentation.theme.LightColorPalette

@Composable
fun WelcomeScreen(
    onLogin: () -> Unit, 
    onSignup: () -> Unit,
    isDarkTheme: Boolean,
    onToggleTheme: () -> Unit
) {
    // Locally scope MaterialTheme for WelcomeScreen only
    MaterialTheme(colors = if (isDarkTheme) DarkColorPalette else LightColorPalette) {
        Surface(
            modifier = Modifier.fillMaxSize(),
            color = MaterialTheme.colors.background
        ) {
            // Box to allow proper positioning of elements
            Box(modifier = Modifier.fillMaxSize()) {
                // Theme toggle button in the top-right corner
                Button(
                    onClick = {
                        println("Theme toggle button clicked, current theme: $isDarkTheme")
                        onToggleTheme()
                    },
                    modifier = Modifier.align(Alignment.TopEnd).padding(18.dp, 50.dp).size(48.dp),
                    colors = ButtonDefaults.buttonColors(
                        backgroundColor = Color.Transparent,
                    ),
                    elevation = ButtonDefaults.elevation(0.dp),
                    contentPadding = PaddingValues(0.dp)
                ) {
                    // When in dark mode, show light mode icon (sun)
                    // When in light mode, show dark mode icon (moon)
                    Icon(
                        imageVector = if (isDarkTheme) Icons.Filled.LightMode else Icons.Filled.DarkMode,
                        contentDescription = if (isDarkTheme) StringResources.switchToLightTheme else StringResources.switchToDarkTheme,
                        tint = if (isDarkTheme) Color.Yellow else Color.DarkGray,
                        modifier = Modifier.size(34.dp)
                    )
                }

                // Main content column
                Column(
                    modifier = Modifier.fillMaxSize().padding(24.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Center
                ) {
                    Text(
                        StringResources.appName,
                        style = MaterialTheme.typography.h3,
                        color = MaterialTheme.colors.onBackground
                    )
                    Spacer(Modifier.height(8.dp))

                    Spacer(Modifier.height(32.dp))
                    Button(
                        onClick = onLogin,
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text(
                            StringResources.login,
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
                            StringResources.signup,
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
