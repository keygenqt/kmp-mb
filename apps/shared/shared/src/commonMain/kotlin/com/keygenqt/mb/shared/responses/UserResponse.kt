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
 * User roles
 */
@OptIn(ExperimentalJsExport::class)
@JsExport
enum class UserRole {
    GUEST, ORGANIZER, EXPERT, MANAGER, ADMIN
}

/**
 * User response
 */
@OptIn(ExperimentalJsExport::class)
@JsExport
@Serializable
@Suppress("ArrayInDataClass")
data class UserResponse(
    val id: Int,
    val roles: Array<UserRole>? = null,
    val image: String,
    val fname: String,
    val lname: String,
    val short: String?,
    val about: String?,
    val quote: String? = null,
    val createAt: String? = null,
    val updateAt: String? = null,
    val directions: Array<UserDirectionResponse>? = null,
    val locales: Array<UserLocaleResponse>? = null,
    val contacts: Array<UserContactResponse>? = null,
    val media: Array<UserMediaResponse>? = null,
) {
    fun getFnameLocale(language: String): String {
        for (item: UserLocaleResponse in (locales ?: emptyArray())) {
            if (item.locale.check(language)) return item.fname
        }
        return fname
    }
    fun getLnameLocale(language: String): String {
        for (item: UserLocaleResponse in (locales ?: emptyArray())) {
            if (item.locale.check(language)) return item.lname
        }
        return lname
    }
    fun getShortLocale(language: String): String? {
        for (item: UserLocaleResponse in (locales ?: emptyArray())) {
            if (item.locale.check(language)) return item.short
        }
        return short
    }
    fun getAboutLocale(language: String): String? {
        for (item: UserLocaleResponse in (locales ?: emptyArray())) {
            if (item.locale.check(language)) return item.about
        }
        return about
    }
    fun getQuoteLocale(language: String): String? {
        for (item: UserLocaleResponse in (locales ?: emptyArray())) {
            if (item.locale.check(language)) return item.quote
        }
        return quote
    }
}
