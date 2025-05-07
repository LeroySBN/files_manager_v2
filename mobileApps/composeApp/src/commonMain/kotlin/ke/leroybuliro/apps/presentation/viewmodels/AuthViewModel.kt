package ke.leroybuliro.apps.presentation.viewmodels

import ke.leroybuliro.apps.data.PlatformTokenSaver
import ke.leroybuliro.apps.network.AuthApi
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class AuthViewModel(
    private val platformTokenSaver: PlatformTokenSaver
) {
    private val _loading = MutableStateFlow(false)
    val loading: StateFlow<Boolean> = _loading

    private val _error = MutableStateFlow<String?>(null)
    val error: StateFlow<String?> = _error

    // Call this from UI to attempt login
    fun login(email: String, password: String, onSuccess: () -> Unit) {
        CoroutineScope(Dispatchers.Main).launch {
            _loading.value = true
            _error.value = null
            try {
                val response = AuthApi.login(email, password)
                if (response.token != null) {
                    platformTokenSaver.saveToken(response.token)
                    onSuccess()
                } else {
                    _error.value = response.error ?: "Unknown login error"
                }
            } catch (e: Exception) {
                _error.value = e.message ?: "Login failed"
            } finally {
                _loading.value = false
            }
        }
    }

    // Call this from UI to attempt signup
    fun signup(email: String, password: String, onSuccess: () -> Unit) {
        CoroutineScope(Dispatchers.Main).launch {
            _loading.value = true
            _error.value = null
            try {
                val response = AuthApi.signup(email, password)
                if (response.token != null) {
                    platformTokenSaver.saveToken(response.token)
                    onSuccess()
                } else {
                    _error.value = response.error ?: "Unknown signup error"
                }
            } catch (e: Exception) {
                _error.value = e.message ?: "Signup failed"
            } finally {
                _loading.value = false
            }
        }
    }

    // Call this from UI to logout
    fun logout(onSuccess: () -> Unit) {
        CoroutineScope(Dispatchers.Main).launch {
            _loading.value = true
            try {
                AuthApi.logout()
            } catch (e: Exception) {
                // Log error but continue
            } finally {
                platformTokenSaver.clearToken()
                _loading.value = false
                onSuccess()
            }
        }
    }
}
