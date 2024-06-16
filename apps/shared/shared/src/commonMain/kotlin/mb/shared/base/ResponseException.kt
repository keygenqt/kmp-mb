package mb.shared.base

import kotlin.js.ExperimentalJsExport
import kotlin.js.JsExport

@OptIn(ExperimentalJsExport::class)
@JsExport
data class ResponseException(
    val code: Int,
    val error: String,
) : RuntimeException()
