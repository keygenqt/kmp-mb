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
package com.keygenqt.mb.shared.db.service

import com.keygenqt.mb.shared.db.base.DatabaseMysql
import com.keygenqt.mb.shared.db.entities.*
import com.keygenqt.mb.shared.extension.toText
import com.keygenqt.mb.shared.interfaces.IService
import com.keygenqt.mb.shared.responses.UserRole
import com.keygenqt.mb.shared.utils.Password
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.SqlExpressionBuilder.inList

class UsersService(
    override val db: DatabaseMysql
) : IService<UsersService> {
    /**
     * Get all entities.
     */
    fun getAll(
        role: UserRole? = null
    ) = Users
        .selectAll()
        .apply {
            if (role != null) {
                where { Users.roles like "%${role.name}%" }
            }
        }
        .orderBy(Pair(Users.id, SortOrder.DESC))
        .map { UserEntity.wrapRow(it) }

    /**
     * Find entity by id.
     */
    fun findById(
        id: Int,
        role: UserRole? = null
    ) = UserEntity
        .let {
            if (role != null) {
                it.find { (Users.id eq id) and (Users.roles like "%${role.name}%") }
            } else {
                it.find { (Users.id eq id) }
            }
        }
        .firstOrNull()

    /**
     * Get entity with check password for auth.
     */
    fun findUserByAuth(
        lname: String?,
        password: String?
    ) = UserEntity
        .find {
            (Users.lname eq (lname ?: "")) and (
                (Users.roles like "%${UserRole.ADMIN.name}%") or (Users.roles like "%${UserRole.MANAGER.name}%")
            )
        }
        .firstOrNull()
        ?.let {
            if (it.paswd != null && Password.validate(password, it.paswd!!)) {
                it
            } else {
                null
            }
        }

    /**
     * Create entity.
     */
    fun insert(
        image: String,
        fname: String,
        lname: String,
        short: String?,
        about: String?,
        quote: String?,
        roles: List<UserRole>,
        directions: List<Int>,
        locales: List<Int>,
        contacts: List<Int>,
        media: List<Int>,
    ) = UserEntity.new {
        this.image = image
        this.fname = fname
        this.lname = lname
        this.short = short
        this.about = about
        this.quote = quote
        this.roles = roles.toText()
        this.directions = UserDirectionEntity.find { (UserDirections.id inList directions) }
        this.locales = UserLocaleEntity.find { (UserLocales.id inList locales) }
        this.contacts = UserContactEntity.find { (UserContacts.id inList contacts) }
        this.media = UserMediaEntity.find { (UserMedia.id inList media) }
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
    }

    /**
     * Update entity.
     */
    fun UserEntity.update(
        image: String,
        fname: String,
        lname: String,
        short: String?,
        about: String?,
        quote: String?,
        roles: List<UserRole>,
        directions: List<Int>,
        locales: List<Int>,
        contacts: List<Int>,
        media: List<Int>,
    ) = apply {
        this.image = image
        this.fname = fname
        this.lname = lname
        this.short = short
        this.about = about
        this.quote = quote
        this.roles = roles.toText()
        this.directions = UserDirectionEntity.find { (UserDirections.id inList directions) }
        this.locales = UserLocaleEntity.find { (UserLocales.id inList locales) }
        this.contacts = UserContactEntity.find { (UserContacts.id inList contacts) }
        this.media = UserMediaEntity.find { (UserMedia.id inList media) }
        this.updateAt = System.currentTimeMillis()
    }

    /**
     * Delete entity with check and relations.
     */
    fun UserEntity.deleteEntity() = apply {
        // Check relations
        if (RelationsCitiesOrganizers
                .selectAll()
                .where { (RelationsCitiesOrganizers.user eq id) }
                .count()
                .toInt() != 0
        ) {
            throw RuntimeException("There are dependencies on this model in the database.")
        }
        // Check latest admin
        if (roles.contains(UserRole.ADMIN.name)) {
            if (Users.selectAll()
                    .where { Users.roles like "%${UserRole.ADMIN.name}%" }
                    .count()
                    .toInt() <= 1
            ) {
                throw RuntimeException("The last user with the ADMIN role cannot be deleted.")
            }
        }
        // Get relations ids
        val idsImage = Uploads
            .select(Uploads.id)
            .where { Uploads.fileName eq image.substringAfterLast('/') }
            .map { it[Uploads.id] }
            .toList()
        val idsLocale = RelationsUserLocales
            .select(RelationsUserLocales.locale)
            .where { RelationsUserLocales.user eq id }
            .map { it[RelationsUserLocales.locale] }
            .toList()
        val idsContact = RelationsUserContacts
            .select(RelationsUserContacts.contacts)
            .where { RelationsUserContacts.user eq id }
            .map { it[RelationsUserContacts.contacts] }
            .toList()
        val idsMedia = RelationsUserMedia
            .select(RelationsUserMedia.media)
            .where { RelationsUserMedia.user eq id }
            .map { it[RelationsUserMedia.media] }
            .toList()
        // Delete relations
        RelationsUserDirections.deleteWhere { user eq id }
        RelationsUserLocales.deleteWhere { user eq id }
        RelationsUserContacts.deleteWhere { user eq id }
        RelationsUserMedia.deleteWhere { user eq id }
        // Delete entities
        Uploads.deleteWhere { Uploads.id inList idsImage }
        UserLocales.deleteWhere { ColumnLocales.id inList idsLocale }
        UserContacts.deleteWhere { ColumnLocales.id inList idsContact }
        UserMedia.deleteWhere { ColumnLocales.id inList idsMedia }
        // Delete model
        this.delete()
    }
}
