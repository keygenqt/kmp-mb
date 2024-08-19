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
import com.keygenqt.mb.shared.db.entities.Countries
import com.keygenqt.mb.shared.db.entities.RelationsUserDirections
import com.keygenqt.mb.shared.db.entities.UserDirectionEntity
import com.keygenqt.mb.shared.db.entities.UserDirections
import com.keygenqt.mb.shared.interfaces.IService
import org.jetbrains.exposed.sql.SortOrder
import org.jetbrains.exposed.sql.selectAll

class DirectionsService(
    override val db: DatabaseMysql
) : IService<DirectionsService> {
    /**
     * Get all entities.
     */
    fun getAll() = UserDirectionEntity
        .all()
        .orderBy(Pair(UserDirections.id, SortOrder.DESC))

    /**
     * Find entity by id.
     */
    fun findById(
        id: Int
    ) = UserDirectionEntity.findById(id)

    /**
     * Create entity.
     */
    fun insert(
        name: String,
    ) = UserDirectionEntity.new {
        this.name = name
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
    }

    /**
     * Update entity.
     */
    fun UserDirectionEntity.update(
        name: String,
    ) = apply {
        this.name = name
        this.updateAt = System.currentTimeMillis()
    }

    /**
     * Delete entity with check.
     */
    fun UserDirectionEntity.deleteEntity() = apply {
        // Check relations
        if (RelationsUserDirections
                .selectAll()
                .where { (RelationsUserDirections.direction eq id) }
                .count()
                .toInt() != 0
        ) {
            throw RuntimeException("There are dependencies on this model in the database.")
        }
        // Delete model
        this.delete()
    }
}
