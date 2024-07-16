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
import com.keygenqt.mb.shared.responses.DirectionResponse
import com.keygenqt.mb.shared.responses.UserRole
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable

/**
 * Table shop products
 */
object Directions : IntIdTable() {
    val name = varchar("name", 255).uniqueIndex()
    val isPublished = bool("isPublished").default(false)
    val createAt = long("createAt")
    val updateAt = long("updateAt")
}

/**
 * Exposed entity
 */
class DirectionEntity(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<DirectionEntity>(Directions)

    var name by Directions.name
    var isPublished by Directions.isPublished
    var createAt by Directions.createAt
    var updateAt by Directions.updateAt
}

/**
 * Convert to [DirectionResponse]
 */
fun DirectionEntity.toResponse() = DirectionResponse(
    id = id.value,
    name = name,
    isPublished = isPublished,
    createAt = createAt.toUTC(),
    updateAt = updateAt.toUTC(),
)

/**
 * Convert to [List]
 */
fun Iterable<DirectionEntity>.toResponses(): List<DirectionResponse> {
    return map { it.toResponse() }
}

/**
 * Convert to [DirectionResponse]
 */
fun DirectionEntity.toGuestResponse() = DirectionResponse(
    id = id.value,
    name = name,
)

/**
 * Convert to [List]
 */
fun Iterable<DirectionEntity>.toGuestResponses(): List<DirectionResponse> {
    return map { it.toGuestResponse() }
}
