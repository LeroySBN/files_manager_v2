package ke.leroybuliro.apps

import androidx.compose.foundation.layout.*
import androidx.compose.material.Button
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun WelcomeScreen(onLogin: () -> Unit, onSignup: () -> Unit) {
    Column(
        modifier = Modifier.fillMaxSize().padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text("FileCore", style = MaterialTheme.typography.h3)
        Spacer(Modifier.height(32.dp))
        Button(onClick = onLogin, modifier = Modifier.fillMaxWidth()) {
            Text("Log In")
        }
        Spacer(Modifier.height(16.dp))
        Button(onClick = onSignup, modifier = Modifier.fillMaxWidth()) {
            Text("Sign Up")
        }
    }
}
