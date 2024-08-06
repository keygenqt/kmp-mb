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
import org.jetbrains.exposed.sql.SortOrder
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.SqlExpressionBuilder.inList
import org.jetbrains.exposed.sql.deleteWhere

class CountriesService(
    override val db: DatabaseMysql
) : IService<CountriesService> {
    /**
     * Get all entities.
     */
    fun getAll() = CountryEntity
        .all()
        .orderBy(Pair(Countries.name, SortOrder.ASC))

    /**
     * Find entity by id.
     */
    fun findById(
        id: Int
    ) = CountryEntity.findById(id)

    /**
     * Create entity.
     */
    fun insert(
        name: String,
        locales: List<Int>,
    ) = CountryEntity.new {
        this.name = name
        this.locales = ColumnLocaleEntity.find { (ColumnLocales.id inList locales) }
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
    }

    /**
     * Update entity.
     */
    fun CountryEntity.update(
        name: String,
        locales: List<Int>,
    ) = apply {
        this.name = name
        this.locales = ColumnLocaleEntity.find { (ColumnLocales.id inList locales) }
        this.updateAt = System.currentTimeMillis()
    }

    /**
     * Delete entity with check and relations.
     */
    fun CountryEntity.deleteEntity() = apply {
        // Check relations
        if (CityEntity.find { (Cities.countryID eq id) }.count().toInt() != 0) {
            throw RuntimeException("There are dependencies on this model in the database.")
        }
        // Get relations ids
        val idsLocale = RelationsCitiesColumnLocales
            .select(RelationsCitiesColumnLocales.locale)
            .where { RelationsCitiesColumnLocales.city eq id }
            .map { it[RelationsCitiesColumnLocales.locale] }
            .toList()
        // Delete relations
        RelationsCountriesColumnLocales.deleteWhere { country eq id }
        // Delete entities
        ColumnLocales.deleteWhere { ColumnLocales.id inList idsLocale }
        // Delete model
        this.delete()
    }
}
