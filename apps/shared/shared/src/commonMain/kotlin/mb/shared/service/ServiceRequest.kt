package mb.shared.service

import io.ktor.client.*
import io.ktor.client.plugins.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.json.Json
import mb.shared.base.ResponseException
import mb.shared.service.impl.GetRequest

/**
 * Get platform client
 */
expect fun httpClient(config: HttpClientConfig<*>.() -> Unit = {}): HttpClient

/**
 * Common service network
 */
class ServiceRequest(url: String) {

    private val json = Json {
        prettyPrint = true
        isLenient = true
        ignoreUnknownKeys = true
    }

    private var httpClient = httpClient {

        expectSuccess = false

        HttpResponseValidator {
            validateResponse { response ->
                if (response.status != HttpStatusCode.OK) {
                    throw ResponseException(
                        code = response.status.value,
                        error = "Error KM js client"
                    )
                }
            }
        }

        install(DefaultRequest) {
            url(url)
            contentType(ContentType.Application.Json)
        }

        install(ContentNegotiation) {
            json(json)
        }
    }

    val get = GetRequest(httpClient)
}
