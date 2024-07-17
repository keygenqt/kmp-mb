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

import com.keygenqt.mb.shared.responses.UserMediaResponse
import com.keygenqt.mb.shared.responses.UserMediaTypes
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable


object UserMedia : IntIdTable() {
    val link = varchar("link", 255)
    val type = enumeration("type", UserMediaTypes::class).default(UserMediaTypes.SITE)
}

class UserMediaEntity(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<UserMediaEntity>(UserMedia)

    var link by UserMedia.link
    var type by UserMedia.type
}

/**
 * Convert to [UserMediaResponse]
 */
fun UserMediaEntity.toResponse() = UserMediaResponse(
    id = id.value,
    link = link,
    type = type,
)

/**
 * Convert to [List]
 */
fun Iterable<UserMediaEntity>.toResponses(): List<UserMediaResponse> {
    return map { it.toResponse() }
}

/**
 * Convert to [UserMediaResponse]
 */
fun UserMediaEntity.toGuestResponse() = UserMediaResponse(
    link = link,
    type = type,
)

/**
 * Convert to [List]
 */
fun Iterable<UserMediaEntity>.toGuestResponses(): List<UserMediaResponse> {
    return map { it.toGuestResponse() }
}
