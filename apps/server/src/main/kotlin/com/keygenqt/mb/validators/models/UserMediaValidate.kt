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
package com.keygenqt.mb.validators.models

import com.keygenqt.mb.shared.db.entities.UserMediaEntity
import com.keygenqt.mb.shared.responses.UserMediaResponse
import com.keygenqt.mb.shared.responses.UserMediaTypes
import com.keygenqt.mb.validators.custom.NotNullNotBlank
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size
import kotlinx.serialization.Serializable
import org.hibernate.validator.constraints.URL
import org.jetbrains.exposed.sql.SizedIterable
import org.jetbrains.exposed.sql.emptySized

/**
 * Request user media validate
 */
@Suppress("PROVIDED_RUNTIME_TOO_LOW")
@Serializable
data class UserMediaValidate(
    val id: Int? = null,

    @field:NotNullNotBlank
    @field:Size(min = 3, max = 250)
    @field:URL
    val link: String,

    @field:NotNull(message = "Select type required")
    val type: UserMediaTypes,
)

/**
 * Map validate data to Entity
 */
fun List<UserMediaValidate>.toEntities(
    media: SizedIterable<UserMediaEntity> = emptySized()
): List<UserMediaResponse> {
    if (size != map { it.type }.distinct().size) {
        throw RuntimeException("There should be no duplicate types.")
    }
    if (media.any { find -> !filter { it.id != null }.map { it.id }.contains(find.id.value) }) {
        throw RuntimeException("Media found that do not belong to the entity.")
    }
    if (media.any { find -> filter { it.id == null }.map { it.type }.contains(find.type) }) {
        throw RuntimeException("Duplicate types were found, you need to specify the Id to update them.")
    }
    return map {
        UserMediaResponse(
            id = it.id,
            link = it.link,
            type = it.type
        )
    }
}
