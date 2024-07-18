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

import com.keygenqt.mb.shared.extension.toUTC
import com.keygenqt.mb.shared.responses.CountryResponse
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.Table


object Countries : IntIdTable() {
    val name = varchar("name", 255)
    val createAt = long("createAt")
    val updateAt = long("updateAt")
}

object RelationsCountriesColumnLocales : Table() {
    private val country = reference("country", Countries)
    private val locale = reference("locale", ColumnLocales)
    override val primaryKey = PrimaryKey(country, locale, name = "PK_countryLocale_c_l")
}

class CountryEntity(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<CountryEntity>(Countries)

    var name by Countries.name
    var createAt by Countries.createAt
    var updateAt by Countries.updateAt

    var locales by ColumnLocaleEntity via RelationsCountriesColumnLocales
}

/**
 * Convert to [CountryResponse]
 */
fun CountryEntity.toResponse() = CountryResponse(
    id = id.value,
    name = name,
    createAt = createAt.toUTC(),
    updateAt = updateAt.toUTC(),
    locales = locales.toResponses().toTypedArray().ifEmpty { null },
)

/**
 * Convert to [List]
 */
fun Iterable<CountryEntity>.toResponses(): List<CountryResponse> {
    return map { it.toResponse() }
}

/**
 * Convert to [CountryResponse]
 */
fun CountryEntity.toGuestResponse() = CountryResponse(
    id = id.value,
    name = name,
    locales = locales.toGuestResponses().toTypedArray().ifEmpty { null },
)

/**
 * Convert to [List]
 */
fun Iterable<CountryEntity>.toGuestResponses(): List<CountryResponse> {
    return map { it.toGuestResponse() }
}
