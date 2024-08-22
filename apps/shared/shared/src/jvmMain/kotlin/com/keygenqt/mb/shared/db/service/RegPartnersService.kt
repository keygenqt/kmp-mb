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
import com.keygenqt.mb.shared.db.entities.RegOrganizers
import com.keygenqt.mb.shared.db.entities.RegPartnerEntity
import com.keygenqt.mb.shared.db.entities.RegPartners
import com.keygenqt.mb.shared.interfaces.IService
import com.keygenqt.mb.shared.responses.RegPartnerState
import org.jetbrains.exposed.sql.SortOrder

class RegPartnersService(
    override val db: DatabaseMysql
) : IService<RegPartnersService> {
    /**
     * Get all entities.
     */
    fun getAll() = RegPartnerEntity
        .all()
        .orderBy(Pair(RegPartners.id, SortOrder.DESC))

    /**
     * Find entity by id.
     */
    fun findById(
        id: Int
    ) = RegPartnerEntity.findById(id)

    /**
     * Create entity.
     */
    fun insert(
        company: String,
        fname: String,
        lname: String,
        email: String,
        telegram: String?,
        phone: String,
        format: String,
    ) = RegPartnerEntity.new {
        this.company = company
        this.fname = fname
        this.lname = lname
        this.email = email
        this.telegram = telegram
        this.phone = phone
        this.format = format
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
    }

    /**
     * Update entity.
     */
    fun RegPartnerEntity.update(
        note: String,
        state: RegPartnerState,
    ) = apply {
        this.note = note
        this.state = state
        this.updateAt = System.currentTimeMillis()
    }

    /**
     * Delete entity.
     */
    fun RegPartnerEntity.deleteEntity() = this.delete()
}
