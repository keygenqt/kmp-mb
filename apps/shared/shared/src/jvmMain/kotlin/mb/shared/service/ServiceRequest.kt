package mb.shared.service

import io.ktor.client.*

actual fun httpClient(config: HttpClientConfig<*>.() -> Unit) = HttpClient {
    config(this)
}
