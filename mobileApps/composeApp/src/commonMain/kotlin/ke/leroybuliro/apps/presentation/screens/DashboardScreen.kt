package ke.leroybuliro.apps.presentation.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

import androidx.compose.material.Button
import ke.leroybuliro.apps.localization.StringResources
import ke.leroybuliro.apps.presentation.theme.DarkColorPalette
import ke.leroybuliro.apps.presentation.theme.LightColorPalette

@Composable
fun DashboardScreen(
//    userEmail: String,
    onLogout: () -> Unit,
    isDarkTheme: Boolean,
    ) {
    MaterialTheme(colors = if (isDarkTheme) DarkColorPalette else LightColorPalette) {
        Surface(
            modifier = Modifier.fillMaxSize(),
            color = MaterialTheme.colors.background
        ) {
            Column(
                modifier = Modifier.fillMaxSize().padding(24.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center
            ) {
//                Text("Hi $userEmail", style = MaterialTheme.typography.h4)
                Text("Access Granted", style = MaterialTheme.typography.h4)
                Spacer(Modifier.height(32.dp))
                Button(onClick = onLogout) {
                    Text(StringResources.logout)
                }
            }
        }
    }
}
