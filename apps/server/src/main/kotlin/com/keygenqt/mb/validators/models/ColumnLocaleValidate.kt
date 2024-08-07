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

import com.keygenqt.mb.shared.db.entities.ColumnLocaleEntity
import com.keygenqt.mb.shared.responses.ColumnLocaleResponse
import com.keygenqt.mb.shared.responses.Locale
import com.keygenqt.mb.validators.custom.NotNullNotBlank
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.SizedIterable
import org.jetbrains.exposed.sql.emptySized

/**
 * Request locale validate
 */
@Suppress("PROVIDED_RUNTIME_TOO_LOW")
@Serializable
data class ColumnLocaleValidate(
    val id: Int? = null,

    @field:NotNullNotBlank
    @field:Size(min = 3, max = 1000)
    val text: String,

    @field:NotNull(message = "Select locale required")
    val locale: Locale,
)

/**
 * Map validate data to Entity
 */
fun List<ColumnLocaleValidate>.toEntities(
    locales: SizedIterable<ColumnLocaleEntity> = emptySized()
): List<ColumnLocaleResponse> {
    if (size != map { it.locale }.distinct().size) {
        throw RuntimeException("There should be no duplicate locales.")
    }
    if (locales.any { find -> !filter { it.id != null }.map { it.id }.contains(find.id.value) }) {
        throw RuntimeException("Locales found that do not belong to the entity.")
    }
    if (locales.any { find -> filter { it.id == null }.map { it.locale }.contains(find.locale) }) {
        throw RuntimeException("Duplicate locales were found, you need to specify the Id to update them.")
    }
    return map {
        ColumnLocaleResponse(
            id = it.id,
            text = it.text,
            locale = it.locale
        )
    }
}
