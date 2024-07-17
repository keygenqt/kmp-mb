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
package com.keygenqt.mb.shared.db.entities

import com.keygenqt.mb.shared.responses.Localization
import com.keygenqt.mb.shared.responses.UserLocalizationResponse
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable

object UserLocalizations : IntIdTable() {
    val fname = varchar("fname", 255)
    val lname = varchar("lname", 255)
    val description = text("description").nullable()
    val quote = text("quote").nullable()
    val locale = enumeration("locale", Localization::class).default(Localization.RU)
}

class UserLocalizationEntity(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<UserLocalizationEntity>(UserLocalizations)

    var fname by UserLocalizations.fname
    var lname by UserLocalizations.lname
    var description by UserLocalizations.description
    var quote by UserLocalizations.quote
    var locale by UserLocalizations.locale
}

/**
 * Convert to [UserLocalizationResponse]
 */
fun UserLocalizationEntity.toResponse() = UserLocalizationResponse(
    id = id.value,
    fname = fname,
    lname = lname,
    description = description,
    quote = quote,
    locale = locale,
)

/**
 * Convert to [List]
 */
fun Iterable<UserLocalizationEntity>.toResponses(): List<UserLocalizationResponse> {
    return map { it.toResponse() }
}

/**
 * Convert to [UserLocalizationResponse]
 */
fun UserLocalizationEntity.toGuestResponse() = UserLocalizationResponse(
    fname = fname,
    lname = lname,
    description = description,
    quote = quote,
    locale = locale,
)

/**
 * Convert to [List]
 */
fun Iterable<UserLocalizationEntity>.toGuestResponses(): List<UserLocalizationResponse> {
    return map { it.toGuestResponse() }
}
