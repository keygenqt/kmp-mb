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
import com.keygenqt.mb.shared.db.entities.UserLocaleEntity
import com.keygenqt.mb.shared.interfaces.IService
import com.keygenqt.mb.shared.responses.Locale
import com.keygenqt.mb.shared.responses.UserLocaleResponse

class UserLocalesService(
    override val db: DatabaseMysql
) : IService<UserLocalesService> {
    /**
     * Create entity.
     */
    private fun insert(
        fname: String,
        lname: String,
        short: String?,
        about: String?,
        quote: String?,
        locale: Locale,
    ) = UserLocaleEntity.new {
        this.fname = fname
        this.lname = lname
        this.short = short
        this.about = about
        this.quote = quote
        this.locale = locale
    }

    /**
     * Create entities.
     */
    fun List<UserLocaleResponse>.inserts(): List<Int> {
        val ids: MutableList<Int> = mutableListOf()
        filter { it.id == null }.forEach {
            ids.add(
                insert(
                    fname = it.fname,
                    lname = it.lname,
                    short = it.short,
                    about = it.about,
                    quote = it.quote,
                    locale = it.locale
                ).id.value
            )
        }
        return ids
    }

    /**
     * Update entity.
     */
    private fun update(
        id: Int,
        fname: String,
        lname: String,
        short: String?,
        about: String?,
        quote: String?,
    ) = UserLocaleEntity.findByIdAndUpdate(id) {
        it.fname = fname
        it.lname = lname
        it.short = short
        it.about = about
        it.quote = quote
    }

    /**
     * Update entities.
     */
    fun List<UserLocaleResponse>.updates(): List<Int> {
        val ids: MutableList<Int?> = mutableListOf()
        filter { it.id != null }.forEach {
            ids.add(
                update(
                    id = it.id!!,
                    fname = it.fname,
                    lname = it.lname,
                    short = it.short,
                    about = it.about,
                    quote = it.quote,
                )?.id?.value
            )
        }
        return ids.filterNotNull()
    }
}
