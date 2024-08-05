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
import com.keygenqt.mb.shared.interfaces.IService
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.sql.SortOrder
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.SqlExpressionBuilder.inList
import org.jetbrains.exposed.sql.deleteWhere
import org.jetbrains.exposed.sql.or

@Suppress("MemberVisibilityCanBePrivate")
class CitiesService(
    override val db: DatabaseMysql
) : IService<CitiesService> {
    /**
     * Get all entities
     */
    fun getAll() = CityEntity
        .all()
        .orderBy(Pair(Cities.name, SortOrder.ASC))

    /**
     * Find entity by id
     */
    fun findById(
        id: Int
    ) = CityEntity.findById(id)

    /**
     * Create entity
     */
    fun insert(
        countryID: Int,
        image: String,
        link: String,
        name: String,
        locales: List<Int>,
        organizers: List<Int>,
        uploads: List<Int>,
    ) = CityEntity.new {
        this.countryID = EntityID(countryID, Countries)
        this.image = image
        this.link = link
        this.name = name
        this.locales = ColumnLocaleEntity.find { (ColumnLocales.id inList locales) }
        this.organizers = UserEntity.find { (Users.id inList organizers) }
        this.uploads = UploadEntity.find { (Uploads.id inList uploads) }
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
    }

    /**
     * Update entity
     */
    fun CityEntity.update(
        countryID: Int? = null,
        image: String? = null,
        link: String? = null,
        name: String? = null,
        locales: List<Int>? = null,
        organizers: List<Int>? = null,
        uploads: List<Int>? = null,
    ) = apply {
        countryID?.let { this.countryID = EntityID(it, Countries) }
        image?.let { this.image = it }
        link?.let { this.link = it }
        name?.let { this.name = it }
        locales?.let { this.locales = ColumnLocaleEntity.find { (ColumnLocales.id inList it) } }
        organizers?.let { this.organizers = UserEntity.find { (Users.id inList it) } }
        uploads?.let { this.uploads = UploadEntity.find { (Uploads.id inList it) } }
        this.updateAt = System.currentTimeMillis()
    }

    /**
     * Delete entity
     */
    fun CityEntity.deleteWithRelations() = apply {
        // Get relations ids
        val idsLocale = RelationsCitiesColumnLocales
            .select(RelationsCitiesColumnLocales.locale)
            .where { RelationsCitiesColumnLocales.city eq id }
            .map { it[RelationsCitiesColumnLocales.locale] }
            .toList()
        val idsImage = Uploads
            .select(Uploads.id)
            .where { Uploads.fileName eq image.substringAfterLast('/') }
            .map { it[Uploads.id] }
            .toList()
        val idsUpload = RelationsCitiesUploads
            .select(RelationsCitiesUploads.upload)
            .where { RelationsCitiesUploads.city eq id }
            .map { it[RelationsCitiesUploads.upload] }
            .toList()
        // Delete relations
        RelationsCitiesColumnLocales.deleteWhere { city eq id }
        RelationsCitiesOrganizers.deleteWhere { city eq id }
        RelationsCitiesUploads.deleteWhere { city eq id }
        // Delete entities
        ColumnLocales.deleteWhere { ColumnLocales.id inList idsLocale }
        Uploads.deleteWhere { (Uploads.id inList idsImage) or (Uploads.id inList idsUpload) }
        // Delete model
        this.delete()
    }
}
