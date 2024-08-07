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

import com.keygenqt.mb.shared.extension.isNotGuest
import com.keygenqt.mb.shared.extension.toUTC
import com.keygenqt.mb.shared.responses.Locale
import com.keygenqt.mb.shared.responses.UserLocaleResponse
import com.keygenqt.mb.shared.responses.UserRole
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable

object UserLocales : IntIdTable() {
    val fname = varchar("fname", 255)
    val lname = varchar("lname", 255)
    val short = text("short").nullable()
    val about = text("about").nullable()
    val quote = text("quote").nullable()
    val locale = enumeration("locale", Locale::class).default(Locale.EN)
}

class UserLocaleEntity(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<UserLocaleEntity>(UserLocales)

    var fname by UserLocales.fname
    var lname by UserLocales.lname
    var short by UserLocales.short
    var about by UserLocales.about
    var quote by UserLocales.quote
    var locale by UserLocales.locale
}

/**
 * Convert to [UserLocaleResponse]
 */
fun UserLocaleEntity.toResponse(
    roles: List<UserRole> = listOf(UserRole.GUEST)
) = UserLocaleResponse(
    fname = fname,
    lname = lname,
    short = short,
    about = about,
    quote = quote,
    locale = locale,
    // Not guest
    id = roles.isNotGuest { id.value },
)

/**
 * Convert to [List]
 */
fun Iterable<UserLocaleEntity>.toResponses(
    roles: List<UserRole> = listOf(UserRole.GUEST)
): List<UserLocaleResponse> {
    return map { it.toResponse(roles) }
}
