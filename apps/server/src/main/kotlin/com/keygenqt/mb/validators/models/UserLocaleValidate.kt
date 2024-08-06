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

import com.keygenqt.mb.shared.db.entities.UserLocaleEntity
import com.keygenqt.mb.shared.db.entities.UserLocales
import com.keygenqt.mb.shared.responses.Locale
import com.keygenqt.mb.validators.custom.NotBlank
import com.keygenqt.mb.validators.custom.NotNullNotBlank
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.ResultRow

/**
 * Request user locale validate
 */
@Suppress("PROVIDED_RUNTIME_TOO_LOW")
@Serializable
data class UserLocaleValidate(
    val id: Int? = null,

    @field:NotNullNotBlank
    @field:Size(min = 3, max = 250)
    val fname: String,

    @field:NotNullNotBlank
    @field:Size(min = 3, max = 250)
    val lname: String,

    @field:NotBlank
    @field:Size(max = 1000)
    val short: String?,

    @field:NotBlank
    @field:Size(max = 1000)
    val about: String?,

    @field:NotBlank
    @field:Size(max = 1000)
    val quote: String?,

    @field:NotNull(message = "Select locale required")
    val locale: Locale,
)

/**
 * Map validate data to Entity
 */
fun List<UserLocaleValidate>.toEntities(): List<UserLocaleEntity> {
    return mapIndexed { index, data ->
        UserLocaleEntity.wrapRow(
            ResultRow.createAndFillValues(
                mapOf(
                    UserLocales.id to (data.id ?: -index),
                    UserLocales.fname to data.fname,
                    UserLocales.lname to data.lname,
                    UserLocales.short to data.short,
                    UserLocales.about to data.about,
                    UserLocales.quote to data.quote,
                    UserLocales.locale to data.locale
                )
            )
        )
    }
}
