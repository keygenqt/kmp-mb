package mb.shared.models

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlin.js.ExperimentalJsExport
import kotlin.js.JsExport

@OptIn(ExperimentalJsExport::class)
@JsExport
@Serializable
data class ExpertModel(
    @SerialName("id")
    val id: Int,
    @SerialName("name")
    val name: String,
)
