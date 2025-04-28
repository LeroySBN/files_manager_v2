package ke.leroybuliro.apps

import androidx.compose.foundation.layout.*
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

import androidx.compose.material.Button

@Composable
fun DashboardScreen(userEmail: String, onLogout: () -> Unit) {
    Column(
        modifier = Modifier.fillMaxSize().padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text("Hi $userEmail", style = MaterialTheme.typography.h4)
        Spacer(Modifier.height(32.dp))
        Button(onClick = onLogout) {
            Text("Logout")
        }
    }
}
