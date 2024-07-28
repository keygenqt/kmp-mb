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

class RegExpertsService(
    override val db: DatabaseMysql
) : IService<RegExpertsService> {
    /**
     * Get all entities
     */
    fun getAll() = RegExpertEntity
        .all()
        .orderBy(Pair(RegExperts.updateAt, SortOrder.DESC))

    /**
     * Find entity by id
     */
    fun findById(
        id: Int
    ) = RegExpertEntity.findById(id)

    /**
     * Create entity
     */
    fun insert(
        directionID: Int,
        expertID: Int,
        why: String,
        fname: String,
        lname: String,
        email: String,
        telegram: String,
        cv: String,
        location: String,
        experience: String,
        contribution: String,
    ) = RegExpertEntity.new {
        this.directionID = EntityID(directionID, UserDirections)
        this.expertID = EntityID(expertID, Users)
        this.why = why
        this.fname = fname
        this.lname = lname
        this.email = email
        this.telegram = telegram
        this.cv = cv
        this.location = location
        this.experience = experience
        this.contribution = contribution
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
    }
}
