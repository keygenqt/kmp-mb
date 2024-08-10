package com.keygenqt.mb.shared.requests

import kotlinx.serialization.Serializable
import kotlin.js.ExperimentalJsExport
import kotlin.js.JsExport

/**
 * Pages with statistic view
 */
@OptIn(ExperimentalJsExport::class)
@JsExport
enum class StatisticViewPage {
    HOME,
    COMMUNITY,
    CITY,
    EXPERTS,
    EXPERT,
    REG_EXPERT,
    REG_ORGANIZER,
    REG_PARTNER
}

/**
 * Request statistic about open view website
 */
@OptIn(ExperimentalJsExport::class)
@JsExport
@Serializable
data class StatisticViewRequest(
    val pageKey: StatisticViewPage,
    val id: String? = null,
)
