package ke.leroybuliro.apps.network

import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.logging.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.json.Json

object ApiClient {
    val client = HttpClient(CIO) {
        install(Logging) {
            level = LogLevel.HEADERS
            logger = Logger.DEFAULT
        }

        install(ContentNegotiation) {
            json(Json {
                ignoreUnknownKeys = true
                isLenient = true
                prettyPrint = false
            })
        }

        // Set timeouts to avoid hanging requests
        engine {
            requestTimeout = 30000 // 30 seconds
        }

        // Handle HTTP errors properly
        expectSuccess = true
    }

    const val BASE_URL = "http://localhost:5232"
}
