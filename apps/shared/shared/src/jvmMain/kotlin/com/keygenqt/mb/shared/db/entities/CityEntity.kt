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
import com.keygenqt.mb.shared.responses.CityResponse
import com.keygenqt.mb.shared.responses.UserRole
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.Table


object Cities : IntIdTable() {
    val countryID = reference("country", Countries)
    val image = varchar("image", 255)
    val link = varchar("link", 255)
    val name = varchar("name", 255)
    val createAt = long("createAt")
    val updateAt = long("updateAt")
}

object RelationsCitiesColumnLocales : Table() {
    val city = reference("city", Cities)
    val locale = reference("locale", ColumnLocales)
    override val primaryKey = PrimaryKey(city, locale, name = "PK_cityLocale_c_l")
}

object RelationsCitiesOrganizers : Table() {
    val city = reference("city", Cities)
    private val user = reference("user", Users)
    override val primaryKey = PrimaryKey(city, user, name = "PK_cityUsers_c_u")
}

object RelationsCitiesUploads : Table() {
    val city = reference("city", Cities)
    val upload = reference("upload", Uploads)
    override val primaryKey = PrimaryKey(city, upload, name = "PK_cityUploads_c_u")
}

class CityEntity(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<CityEntity>(Cities)

    var countryID by Cities.countryID

    var image by Cities.image
    var link by Cities.link
    var name by Cities.name
    var createAt by Cities.createAt
    var updateAt by Cities.updateAt

    var country by CountryEntity referencedOn Cities.countryID
    var locales by ColumnLocaleEntity via RelationsCitiesColumnLocales
    var organizers by UserEntity via RelationsCitiesOrganizers
    var uploads by UploadEntity via RelationsCitiesUploads
}

/**
 * Convert to [CityResponse]
 */
fun CityEntity.toResponse(
    roles: List<UserRole> = listOf(UserRole.GUEST)
) = CityResponse(
    id = id.value,
    image = image,
    link = link,
    name = name,
    country = country.toResponse(roles),
    locales = locales.toResponses(roles).toTypedArray().ifEmpty { null },
    organizers = organizers.toResponses(roles).toTypedArray().ifEmpty { null },
    uploads = uploads.toResponses(roles).toTypedArray().ifEmpty { null },
    // Not guest
    createAt = roles.isNotGuest { createAt.toUTC() },
    updateAt = roles.isNotGuest { updateAt.toUTC() }
)

/**
 * Convert to [List]
 */
fun Iterable<CityEntity>.toResponses(
    roles: List<UserRole> = listOf(UserRole.GUEST)
): List<CityResponse> {
    return map { it.toResponse(roles) }
}
