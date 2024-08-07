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
import com.keygenqt.mb.shared.db.entities.ColumnLocaleEntity
import com.keygenqt.mb.shared.interfaces.IService
import com.keygenqt.mb.shared.responses.ColumnLocaleResponse
import com.keygenqt.mb.shared.responses.Locale

class ColumnLocalesService(
    override val db: DatabaseMysql
) : IService<ColumnLocalesService> {
    /**
     * Create entity.
     */
    private fun insert(
        text: String,
        locale: Locale,
    ) = ColumnLocaleEntity.new {
        this.text = text
        this.locale = locale
    }

    /**
     * Create entities.
     */
    fun List<ColumnLocaleResponse>.inserts(): List<Int> {
        val ids: MutableList<Int> = mutableListOf()
        filter { it.id == null }.forEach {
            ids.add(insert(it.text, it.locale).id.value)
        }
        return ids
    }

    /**
     * Update entity.
     */
    private fun update(
        id: Int,
        text: String,
    ) = ColumnLocaleEntity.findByIdAndUpdate(id) {
        it.text = text
    }

    /**
     * Update entities.
     */
    fun List<ColumnLocaleResponse>.updates(): List<Int> {
        val ids: MutableList<Int?> = mutableListOf()
        filter { it.id != null }.forEach {
            ids.add(update(it.id!!, it.text)?.id?.value)
        }
        return ids.filterNotNull()
    }
}
