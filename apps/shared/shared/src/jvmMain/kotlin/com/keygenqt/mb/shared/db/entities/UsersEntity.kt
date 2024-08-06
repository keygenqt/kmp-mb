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

import com.keygenqt.mb.shared.extension.fromTextUserRole
import com.keygenqt.mb.shared.extension.isNotGuest
import com.keygenqt.mb.shared.extension.toUTC
import com.keygenqt.mb.shared.responses.UserResponse
import com.keygenqt.mb.shared.responses.UserRole
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.Table


object Users : IntIdTable() {
    val roles = varchar("roles", 255)
    val image = varchar("image", 255)
    val fname = varchar("fname", 255)
    val lname = varchar("lname", 255)
    val paswd = varchar("paswd", 255).nullable()
    val short = text("short").nullable()
    val about = text("about").nullable()
    val quote = text("quote").nullable()
    val createAt = long("createAt")
    val updateAt = long("updateAt")
}

object RelationsUserDirections : Table() {
    val user = reference("user", Users)
    val direction = reference("direction", UserDirections)
    override val primaryKey = PrimaryKey(user, direction, name = "PK_userDirections_u_d")
}

object RelationsUserLocales : Table() {
    val user = reference("user", Users)
    val locale = reference("locale", UserLocales)
    override val primaryKey = PrimaryKey(user, locale, name = "PK_userLocale_u_l")
}

object RelationsUserContacts : Table() {
    val user = reference("user", Users)
    val contacts = reference("contacts", UserContacts)
    override val primaryKey = PrimaryKey(user, contacts, name = "PK_userContacts_u_c")
}

object RelationsUserMedia : Table() {
    val user = reference("user", Users)
    val media = reference("media", UserMedia)
    override val primaryKey = PrimaryKey(user, media, name = "PK_userMedia_u_m")
}

class UserEntity(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<UserEntity>(Users)

    var roles by Users.roles
    var image by Users.image
    var fname by Users.fname
    var lname by Users.lname
    var paswd by Users.paswd
    var short by Users.short
    var about by Users.about
    var quote by Users.quote
    var createAt by Users.createAt
    var updateAt by Users.updateAt

    var directions by UserDirectionEntity via RelationsUserDirections
    var locales by UserLocaleEntity via RelationsUserLocales
    var contacts by UserContactEntity via RelationsUserContacts
    var media by UserMediaEntity via RelationsUserMedia
}

/**
 * Convert to [UserResponse]
 * @todo https://youtrack.jetbrains.com/issue/EXPOSED-448/Relationship-many-to-many-with-condition.
 */
fun UserEntity.toResponse(
    roles: List<UserRole> = listOf(UserRole.GUEST)
) = UserResponse(
    id = id.value,
    roles = this.roles.fromTextUserRole().toTypedArray().ifEmpty { null },
    image = image,
    fname = fname,
    lname = lname,
    short = short,
    about = about,
    quote = quote,
    directions = directions.toResponses(roles).toTypedArray().ifEmpty { null },
    locales = locales.toResponses(roles).toTypedArray().ifEmpty { null },
    contacts = contacts.toResponses(roles).toTypedArray().ifEmpty { null },
    media = media.toResponses(roles).toTypedArray().ifEmpty { null },
    // Not guest
    createAt = roles.isNotGuest { createAt.toUTC() },
    updateAt = roles.isNotGuest { updateAt.toUTC() }
)

/**
 * Convert to [List]
 */
fun Iterable<UserEntity>.toResponses(
    roles: List<UserRole> = listOf(UserRole.GUEST)
): List<UserResponse> {
    return map { it.toResponse(roles) }
}
