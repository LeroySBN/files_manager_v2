package ke.leroybuliro.apps.localization

import androidx.compose.runtime.Composable
import androidx.compose.runtime.ReadOnlyComposable

//enum class SupportedLanguage { EN, SW }

/**
 * String resources for the application
 */
object StringResources {
    // App name
    val appName = "FileDrive"
    
    // Authentication screens
    val login = "Log In"
    val signup = "Sign Up"
    val logout = "Log Out"
    val email = "Email"
    val password = "Password"
    val loginButton = "Login"
    val signupButton = "Sign Up"
    val noAccountYet = "Don't have an account? Sign up"
    val alreadyHaveAccount = "Already have an account? Log in"

    // Theme
    val currentTheme = "Current theme: "
    val darkTheme = "Dark"
    val lightTheme = "Light"
    val switchToDarkTheme = "Switch to Dark Theme"
    val switchToLightTheme = "Switch to Light Theme"
    
    // Errors
    val errorTitle = "Error"
    val dismiss = "Dismiss"
    val fillAllFields = "Please fill in all fields"
    val loginFailed = "Login failed"
    val signupFailed = "Signup failed"
    val networkError = "Network error"
    val invalidCredentials = "Invalid email or password"
}

/**
 * Access string resources in a composable context
 */
@Composable
@ReadOnlyComposable
fun stringResource(key: String): String {
    return key
}
