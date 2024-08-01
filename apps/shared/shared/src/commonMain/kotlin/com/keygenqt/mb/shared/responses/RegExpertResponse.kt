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
 * Registration processing status
 */
@OptIn(ExperimentalJsExport::class)
@JsExport
enum class RegExpertState {
    WAITING, HOLD, PROBATION, REJECT, APPROVED
}

/**
 * Registration expert response
 */
@OptIn(ExperimentalJsExport::class)
@JsExport
@Serializable
data class RegExpertResponse(
    val id: Int,
    val why: String,
    val fname: String,
    val lname: String,
    val location: String,
    val email: String,
    val telegram: String,
    val cv: String,
    val experience: String,
    val contribution: String,
    val note: String?,
    val state: RegExpertState,
    val createAt: String,
    val updateAt: String,
    val direction: UserDirectionResponse,
    val expert: UserResponse,
)
