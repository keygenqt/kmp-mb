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

import com.keygenqt.mb.shared.extension.isNotGuest
import com.keygenqt.mb.shared.extension.toUTC
import com.keygenqt.mb.shared.responses.UploadResponse
import com.keygenqt.mb.shared.responses.UserRole
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable

/**
 * Table upload files
 */
object Uploads : IntIdTable() {
    val fileName = varchar("fileName", 255).uniqueIndex()
    val fileMime = varchar("fileMime", 255)
    val originalFileName = varchar("originalFileName", 255)
    val createAt = long("createAt")
}

/**
 * Exposed entity
 */
class UploadEntity(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<UploadEntity>(Uploads)

    var fileName by Uploads.fileName
    var fileMime by Uploads.fileMime
    var originalFileName by Uploads.originalFileName
    var createAt by Uploads.createAt
}

/**
 * Convert to [UploadResponse]
 */
fun UploadEntity.toResponse(
    roles: List<UserRole> = listOf(UserRole.GUEST)
) = UploadResponse(
    fileName = fileName,
    // Not guest
    id = roles.isNotGuest { id.value },
    fileMime = roles.isNotGuest { fileMime },
    originalFileName = roles.isNotGuest { originalFileName },
    createAt = roles.isNotGuest { createAt.toUTC() },
)

/**
 * Convert to [List]
 */
fun Iterable<UploadEntity>.toResponses(
    roles: List<UserRole> = listOf(UserRole.GUEST)
): List<UploadResponse> {
    return map { it.toResponse(roles) }
}
