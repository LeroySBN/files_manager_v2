package ke.leroybuliro.apps.presentation.theme

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue

/**
 * Manages theme state across the application
 */
object ThemeManager {
    // Default to light theme
    var isDarkTheme by mutableStateOf(false)
    
    /**
     * Toggle between light and dark themes
     */
    fun toggleTheme() {
        isDarkTheme = !isDarkTheme
    }
}
