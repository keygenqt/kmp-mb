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

import com.keygenqt.mb.shared.db.entities.UserContactEntity
import com.keygenqt.mb.shared.db.entities.UserContacts
import com.keygenqt.mb.shared.responses.ContactTypes
import com.keygenqt.mb.validators.custom.NotNullNotBlank
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size
import kotlinx.serialization.Serializable
import org.hibernate.validator.constraints.URL
import org.jetbrains.exposed.sql.ResultRow

/**
 * Request user contact validate
 */
@Suppress("PROVIDED_RUNTIME_TOO_LOW")
@Serializable
data class UserContactValidate(
    val id: Int? = null,

    @field:NotNullNotBlank
    @field:Size(min = 3, max = 250)
    @field:URL
    val link: String,

    @field:NotNull(message = "Select type required")
    val type: ContactTypes,
)

/**
 * Map validate data to Entity
 */
fun List<UserContactValidate>.toEntities(): List<UserContactEntity> {
    return mapIndexed { index, data ->
        UserContactEntity.wrapRow(
            ResultRow.createAndFillValues(
                mapOf(
                    UserContacts.id to (data.id ?: -index),
                    UserContacts.link to data.link,
                    UserContacts.type to data.type
                )
            )
        )
    }
}
