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
 * Country response
 */
@OptIn(ExperimentalJsExport::class)
@JsExport
@Serializable
@Suppress("ArrayInDataClass")
data class CityResponse(
    val id: Int,
    val image: String,
    val name: String,
    val createAt: String? = null,
    val updateAt: String? = null,
    val country: CountryResponse,
    val locales: Array<ColumnLocaleResponse>? = null,
    val organizers: Array<UserResponse>? = null,
    val uploads: Array<UploadResponse>? = null,
) {
    fun getNameLocale(language: String): String {
        for (item: ColumnLocaleResponse in (locales ?: emptyArray())) {
            if (item.locale.check(language)) return item.text
        }
        return name
    }
}
