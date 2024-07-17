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
import com.keygenqt.mb.shared.responses.UserResponse
import com.keygenqt.mb.shared.responses.UserRole
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.Table


object Users : IntIdTable() {
    val role = enumeration("role", UserRole::class).default(UserRole.ORGANIZER)
    val image = varchar("image", 255)
    val fname = varchar("fname", 255)
    val lname = varchar("lname", 255)
    val description = text("description").nullable()
    val quote = text("quote").nullable()
    val createAt = long("createAt")
    val updateAt = long("updateAt")
}

object RelationsUserUserDirections : Table() {
    private val user = reference("user", Users)
    private val direction = reference("direction", UserDirections)
    override val primaryKey = PrimaryKey(user, direction, name = "PK_userDirections_e_d")
}

object RelationsUserUserLocalization : Table() {
    private val user = reference("user", Users)
    private val locale = reference("info", UserLocalizations)
    override val primaryKey = PrimaryKey(user, locale, name = "PK_userLocale_e_l")
}

object RelationsUserUserContacts : Table() {
    private val user = reference("user", Users)
    private val contacts = reference("contacts", UserContacts)
    override val primaryKey = PrimaryKey(user, contacts, name = "PK_userContacts_e_c")
}

object RelationsUserUserMedia : Table() {
    private val user = reference("user", Users)
    private val media = reference("media", UserMedia)
    override val primaryKey = PrimaryKey(user, media, name = "PK_userMedia_e_m")
}

class UserEntity(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<UserEntity>(Users)

    var role by Users.role
    var image by Users.image
    var fname by Users.fname
    var lname by Users.lname
    var description by Users.description
    var quote by Users.quote
    var createAt by Users.createAt
    var updateAt by Users.updateAt

    var directions by UserDirectionEntity via RelationsUserUserDirections
    var locales by UserLocalizationEntity via RelationsUserUserLocalization
    var contacts by UserContactEntity via RelationsUserUserContacts
    var media by UserMediaEntity via RelationsUserUserMedia
}

/**
 * Convert to [UserResponse]
 */
fun UserEntity.toResponse() = UserResponse(
    id = id.value,
    role = role,
    image = image,
    fname = fname,
    lname = lname,
    description = description,
    quote = quote,
    createAt = createAt.toUTC(),
    updateAt = updateAt.toUTC(),
    directions = directions.toResponses().toTypedArray(),
    locales = locales.toResponses().toTypedArray(),
    contacts = contacts.toResponses().toTypedArray(),
    media = media.toResponses().toTypedArray(),
)

/**
 * Convert to [List]
 */
fun Iterable<UserEntity>.toResponses(): List<UserResponse> {
    return map { it.toResponse() }
}

/**
 * Convert to [UserResponse]
 */
// @todo https://youtrack.jetbrains.com/issue/EXPOSED-448/Relationship-many-to-many-with-condition.
fun UserEntity.toGuestResponse() = UserResponse(
    id = id.value,
    image = image,
    fname = fname,
    lname = lname,
    description = description,
    quote = quote,
    directions = directions.toGuestResponses().toTypedArray(),
    locales = locales.toGuestResponses().toTypedArray(),
    contacts = contacts.toGuestResponses().toTypedArray(),
    media = media.toGuestResponses().toTypedArray(),
)

/**
 * Convert to [List]
 */
fun Iterable<UserEntity>.toGuestResponses(): List<UserResponse> {
    return map { it.toGuestResponse() }
}
