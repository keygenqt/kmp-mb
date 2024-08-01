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
import com.keygenqt.mb.shared.db.entities.RegOrganizerEntity
import com.keygenqt.mb.shared.db.entities.RegOrganizers
import com.keygenqt.mb.shared.interfaces.IService
import org.jetbrains.exposed.sql.SortOrder

class RegOrganizersService(
    override val db: DatabaseMysql
) : IService<RegOrganizersService> {
    /**
     * Get all entities
     */
    fun getAll() = RegOrganizerEntity
        .all()
        .orderBy(Pair(RegOrganizers.updateAt, SortOrder.DESC))

    /**
     * Find entity by id
     */
    fun findById(
        id: Int
    ) = RegOrganizerEntity.findById(id)

    /**
     * Create entity
     */
    fun insert(
        fname: String,
        lname: String,
        why: String,
        experience: String,
        activity: String,
        email: String,
        emailNotion: String,
        telegram: String,
        city: String,
        country: String,
        expectations: String,
    ): RegOrganizerEntity = RegOrganizerEntity.new {
        this.fname = fname
        this.lname = lname
        this.why = why
        this.experience = experience
        this.activity = activity
        this.email = email
        this.emailNotion = emailNotion
        this.telegram = telegram
        this.city = city
        this.country = country
        this.expectations = expectations
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
    }
}
