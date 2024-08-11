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
package com.keygenqt.mb.shared.db.entities

import com.keygenqt.mb.shared.requests.StatisticViewPage
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable


object StatisticView : IntIdTable() {
    val pageHash = varchar("pageHash", 255).uniqueIndex()
    val pageID = varchar("pageID", 255).nullable()
    val pageKey = enumeration("pageKey", StatisticViewPage::class).default(StatisticViewPage.HOME)
    val createAt = long("createAt")
}

class StatisticViewEntity(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<StatisticViewEntity>(StatisticView)

    var pageHash by StatisticView.pageHash
    var pageID by StatisticView.pageID
    var pageKey by StatisticView.pageKey
    var createAt by StatisticView.createAt
}

