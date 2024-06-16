package mb.shared.service.impl


import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.GlobalScope
import mb.shared.extensions.promise
import mb.shared.service.ServiceRequest

@OptIn(ExperimentalJsExport::class)
@JsExport
@Suppress("unused", "NON_EXPORTABLE_TYPE")
class GetRequestJS(
    private val client: ServiceRequest
) {
    @OptIn(DelicateCoroutinesApi::class)
    fun experts() = GlobalScope.promise { client.get.experts() }
}

