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

import com.keygenqt.mb.extension.validateIds
import com.keygenqt.mb.interfaces.IdDataValidate
import com.keygenqt.mb.interfaces.IdValidate
import com.keygenqt.mb.shared.db.entities.UserMediaEntity
import com.keygenqt.mb.shared.responses.UserMediaResponse
import com.keygenqt.mb.shared.responses.UserMediaTypes
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
    override val id: Int? = null,

    @field:Size(min = 3, max = 250)
    @field:URL
    val link: String,

    @field:NotNull(message = "Select type required")
    override val type: UserMediaTypes,
) : IdValidate

/**
 * Map data with validate
 */
fun List<UserMediaValidate>.toData(
    values: SizedIterable<UserMediaEntity> = emptySized()
): List<UserMediaResponse> {
    this.validateIds(values.map { IdDataValidate(it.id.value, it.type) })
    return map {
        UserMediaResponse(
            id = it.id,
            link = it.link,
            type = it.type
        )
    }
}
