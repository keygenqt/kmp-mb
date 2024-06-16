package mb.shared.service

import io.ktor.client.*
import io.ktor.client.engine.js.*
import mb.shared.service.impl.GetRequestJS

actual fun httpClient(config: HttpClientConfig<*>.() -> Unit) = HttpClient(Js) {
    config(this)
}

@OptIn(ExperimentalJsExport::class)
@JsExport
class ServiceRequestJS(url: String) {
    private val request = ServiceRequest(url)

    val get = GetRequestJS(request)
}
