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

import kotlinx.serialization.Serializable
import kotlin.js.ExperimentalJsExport
import kotlin.js.JsExport

/**
 * Expert response
 */
@OptIn(ExperimentalJsExport::class)
@JsExport
@Serializable
@Suppress("ArrayInDataClass")
data class ExpertResponse(
    val id: Int,
    val isPublished: Boolean? = null,
    val createAt: String? = null,
    val updateAt: String? = null,
    val info: Array<ExpertInfoResponse>? = null,
    val directions: Array<DirectionResponse>? = null,
)
