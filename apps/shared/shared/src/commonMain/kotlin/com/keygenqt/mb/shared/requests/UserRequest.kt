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

import com.keygenqt.mb.shared.responses.ContactTypes
import com.keygenqt.mb.shared.responses.Locale
import com.keygenqt.mb.shared.responses.UserMediaTypes
import com.keygenqt.mb.shared.responses.UserRole
import kotlinx.serialization.Serializable
import kotlin.js.ExperimentalJsExport
import kotlin.js.JsExport

/**
 * Request city
 */
@OptIn(ExperimentalJsExport::class)
@JsExport
@Serializable
@Suppress("ArrayInDataClass")
data class UserRequest(
    val id: Int?,
    val image: String,
    val fname: String,
    val lname: String,
    val short: String?,
    val about: String?,
    val quote: String?,
    val contacts: Array<UserContactRequest>,
    val locales: Array<UserLocaleRequest>,
    val media: Array<UserMediaRequest>,
    val directions: Array<Int>,
    val roles: Array<UserRole>,
    val password: String?,
)

/**
 * Request user contact
 */
@OptIn(ExperimentalJsExport::class)
@JsExport
@Serializable
data class UserContactRequest(
    val id: Int?,
    val link: String,
    val type: ContactTypes,
)

/**
 * Request user media
 */
@OptIn(ExperimentalJsExport::class)
@JsExport
@Serializable
data class UserMediaRequest(
    val id: Int?,
    val link: String,
    val type: UserMediaTypes,
)

/**
 * Request user contact
 */
@OptIn(ExperimentalJsExport::class)
@JsExport
@Serializable
data class UserLocaleRequest(
    val id: Int?,
    val fname: String,
    val lname: String,
    val short: String?,
    val about: String?,
    val quote: String?,
    val locale: Locale,
)
