package ke.leroybuliro.apps.presentation.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

// Light theme colors - VERY DISTINCT for debugging
val LightColorPalette = lightColorScheme(
    primary = Color(0xFF2196F3),      // Blue
    inversePrimary = Color(0xFF1976D2),
    secondary = Color(0xFFFF9800),     // Orange
    background = Color.White,
    surface = Color(0xFFF5F5F5),       // Very light gray
    error = Color(0xFFB00020),
    onPrimary = Color.White,
    onSecondary = Color.Black,
    onBackground = Color.Black,
    onSurface = Color.Black,
    onError = Color.White
)

// Dark theme colors with DRAMATICALLY DIFFERENT colors for debugging
val DarkColorPalette = darkColorScheme(
    primary = Color(0xFF64B5F6),      // Light blue
    inversePrimary = Color(0xFF42A5F5),
    secondary = Color(0xFFFFCC80),     // Light orange
    background = Color(0xFF212121),
    surface = Color(0xFFDDDDDD),       // Light gray surface
    error = Color(0xFFCF6679),
    onPrimary = Color.Black,           // Black text on light blue
    onSecondary = Color.Black,         // Black text on light orange
    onBackground = Color.White,        // Black text on medium gray
    onSurface = Color.Black,           // Black text on light gray
    onError = Color.White              // White text on error color
)

@Composable
fun AppTheme(
    darkTheme: Boolean = false,
    content: @Composable () -> Unit
) {
    // Very explicit about which color palette we're using
    val colorPalette = if (darkTheme) {
        println("AppTheme: Using DARK color palette")
        DarkColorPalette
    } else {
        println("AppTheme: Using LIGHT color palette")
        LightColorPalette
    }

    // Apply the theme with the selected colors
    MaterialTheme(
        colorScheme = colorPalette,
        content = content
    )
}
