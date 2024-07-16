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

import com.keygenqt.mb.shared.extension.toUTC
import com.keygenqt.mb.shared.responses.ExpertResponse
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.Table


object Experts : IntIdTable() {
    val isPublished = bool("isPublished").default(false)
    val createAt = long("createAt")
    val updateAt = long("updateAt")
}

object ExpertInfo : Table() {
    private val expert = reference("expert", Experts)
    private val info = reference("info", ExpertsInfo)
    override val primaryKey = PrimaryKey(expert, info, name = "PK_expertInfo_e_i")
}

object ExpertDirections : Table() {
    private val expert = reference("expert", Experts)
    private val direction = reference("direction", Directions)
    override val primaryKey = PrimaryKey(expert, direction, name = "PK_expertDirections_e_d")
}

class ExpertEntity(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<ExpertEntity>(Experts)

    var isPublished by Experts.isPublished
    var createAt by Experts.createAt
    var updateAt by Experts.updateAt

    var info by ExpertInfoEntity via ExpertInfo
    var directions by DirectionEntity via ExpertDirections
}

/**
 * Convert to [ExpertResponse]
 */
fun ExpertEntity.toResponse() = ExpertResponse(
    id = id.value,
    isPublished = isPublished,
    createAt = createAt.toUTC(),
    updateAt = updateAt.toUTC(),
    info = info.toResponses().toTypedArray(),
    directions = directions.toResponses().toTypedArray(),
)

/**
 * Convert to [List]
 */
fun Iterable<ExpertEntity>.toResponses(): List<ExpertResponse> {
    return map { it.toResponse() }
}

/**
 * Convert to [ExpertResponse]
 */
fun ExpertEntity.toGuestResponse() = ExpertResponse(
    id = id.value,
    info = info.toGuestResponses().toTypedArray(),
    // @todo https://youtrack.jetbrains.com/issue/EXPOSED-448/Relationship-many-to-many-with-condition.
    directions = directions.filter { it.isPublished }.toGuestResponses().toTypedArray(),
)

/**
 * Convert to [List]
 */
fun Iterable<ExpertEntity>.toGuestResponses(): List<ExpertResponse> {
    return map { it.toGuestResponse() }
}
