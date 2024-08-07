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
import com.keygenqt.mb.shared.responses.ColumnLocaleResponse
import com.keygenqt.mb.shared.responses.Locale
import com.keygenqt.mb.shared.responses.UserRole
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable

object ColumnLocales : IntIdTable() {
    val text = varchar("text", 255)
    val locale = enumeration("locale", Locale::class).default(Locale.EN)
}

class ColumnLocaleEntity(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<ColumnLocaleEntity>(ColumnLocales)

    var text by ColumnLocales.text
    var locale by ColumnLocales.locale
}

/**
 * Convert to [ColumnLocaleResponse]
 */
fun ColumnLocaleEntity.toResponse(
    roles: List<UserRole> = listOf(UserRole.GUEST)
) = ColumnLocaleResponse(
    text = text,
    locale = locale,
    // Not guest
    id = roles.isNotGuest { id.value },
)

/**
 * Convert to [List]
 */
fun Iterable<ColumnLocaleEntity>.toResponses(
    roles: List<UserRole> = listOf(UserRole.GUEST)
): List<ColumnLocaleResponse> {
    return map { it.toResponse(roles) }
}
