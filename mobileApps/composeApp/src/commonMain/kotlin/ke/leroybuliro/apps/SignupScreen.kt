package ke.leroybuliro.apps

import androidx.compose.foundation.layout.*
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp

@Composable
fun SignupScreen(
    onSignup: suspend (email: String, password: String) -> String?,
    onSwitchToLogin: () -> Unit
) {
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var loading by remember { mutableStateOf(false) }
    var error by remember { mutableStateOf<String?>(null) }
    var attemptSignup by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier.fillMaxSize().padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text("Sign Up", style = MaterialTheme.typography.h5)
        Spacer(Modifier.height(16.dp))
        OutlinedTextField(
            value = email,
            onValueChange = { email = it },
            label = { Text("Email") },
            modifier = Modifier.fillMaxWidth()
        )
        Spacer(Modifier.height(8.dp))
        OutlinedTextField(
            value = password,
            onValueChange = { password = it },
            label = { Text("Password") },
            visualTransformation = PasswordVisualTransformation(),
            modifier = Modifier.fillMaxWidth()
        )
        Spacer(Modifier.height(16.dp))
        if (error != null) {
            Text(error ?: "", color = MaterialTheme.colors.error)
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
                Text("Sign Up")
        }
        Spacer(Modifier.height(8.dp))
        TextButton(onClick = onSwitchToLogin) {
            Text("Already have an account? Log in")
        }
    }
}
