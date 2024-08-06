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
import com.keygenqt.mb.shared.db.entities.UserContactEntity
import com.keygenqt.mb.shared.interfaces.IService
import com.keygenqt.mb.shared.responses.ContactTypes
import kotlinx.coroutines.runBlocking

class UserContactsService(
    override val db: DatabaseMysql
) : IService<UserContactsService> {
    /**
     * Create entity.
     */
    private fun insert(
        link: String,
        type: ContactTypes,
    ) = UserContactEntity.new {
        this.link = link
        this.type = type
    }

    /**
     * Create entities.
     */
    fun List<UserContactEntity>.inserts(): List<Int> {
        val ids: MutableList<Int> = mutableListOf()
        filter { it.id.value <= 0 }.forEach {
            ids.add(insert(it.link, it.type).id.value)
        }
        return ids
    }

    /**
     * Update entity.
     */
    private fun update(
        id: Int,
        link: String,
    ) = UserContactEntity.findByIdAndUpdate(id) {
        it.link = link
    }

    /**
     * Update entities.
     */
    fun List<UserContactEntity>.updates(): List<Int> {
        val ids: MutableList<Int?> = mutableListOf()
        filter { it.id.value > 0 }.forEach {
            runBlocking { // Exposed not update model in loop
                transactionRaw {
                    ids.add(update(it.id.value, it.link)?.id?.value)
                }
            }
        }
        return ids.filterNotNull()
    }
}
