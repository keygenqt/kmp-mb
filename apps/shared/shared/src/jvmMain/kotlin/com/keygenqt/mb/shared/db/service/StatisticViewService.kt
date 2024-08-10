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
import com.keygenqt.mb.shared.db.entities.StatisticView
import com.keygenqt.mb.shared.db.entities.StatisticViewEntity
import com.keygenqt.mb.shared.extension.toMD5
import com.keygenqt.mb.shared.interfaces.IService
import com.keygenqt.mb.shared.requests.StatisticViewPage
import org.jetbrains.exposed.dao.id.EntityID

class StatisticViewService(
    override val db: DatabaseMysql
) : IService<StatisticViewService> {

    private fun isHasView(
        pageHash: String,
    ) = StatisticViewEntity.find { StatisticView.id eq pageHash }.count().toInt() != 0

    /**
     * Create entity.
     */
    fun addIfNotExist(
        pageKey: StatisticViewPage,
        remoteAddress: String?,
        id: String?
    ) {
        // unique key hash
        val pageHash = "$pageKey-$remoteAddress-$id".toMD5()
        if (!isHasView(pageHash)) {
            StatisticViewEntity.new {
                this.pageHash = EntityID(pageHash, StatisticView)
                this.pageID = id
                this.pageKey = pageKey
                this.createAt = System.currentTimeMillis()
            }
        }
    }
}
