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
package com.keygenqt.mb.shared.requests

import kotlinx.serialization.Serializable
import kotlin.js.ExperimentalJsExport
import kotlin.js.JsExport

/**
 * Request RegOrganizer
 */
@OptIn(ExperimentalJsExport::class)
@JsExport
@Serializable
data class RegOrganizerRequest(
    val fname: String,
    val lname: String,
    val why: String,
    val experience: String,
    val activity: String,
    val email: String,
    val emailNotion: String,
    val telegram: String,
    val city: String,
    val country: String,
    val expectations: String,
)
