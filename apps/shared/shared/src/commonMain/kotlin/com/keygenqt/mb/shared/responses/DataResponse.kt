/*
 * Copyright 2024 Vitaliy Zarubin
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.keygenqt.mb.shared.responses

import io.ktor.http.*
import kotlinx.serialization.Serializable
import kotlin.js.ExperimentalJsExport
import kotlin.js.JsExport

/**
 * Int response
 */
@OptIn(ExperimentalJsExport::class)
@JsExport
@Serializable
data class DataValueResponse(
    val code: Int = HttpStatusCode.OK.value,
    val value: Int,
)

/**
 * Key-Value response
 */
@OptIn(ExperimentalJsExport::class)
@JsExport
@Serializable
data class DataKeyValueResponse(
    val code: Int = HttpStatusCode.OK.value,
    val key: String,
    val value: Int,
)

/**
 * Key-Value array response
 */
@OptIn(ExperimentalJsExport::class)
@JsExport
@Serializable
@Suppress("ArrayInDataClass")
data class DataKeyValuesResponse(
    val code: Int = HttpStatusCode.OK.value,
    val values: Array<DataKeyValueResponse>,
)
