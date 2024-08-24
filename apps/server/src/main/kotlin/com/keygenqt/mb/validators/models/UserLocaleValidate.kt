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
import com.keygenqt.mb.shared.db.entities.UserLocaleEntity
import com.keygenqt.mb.shared.responses.Locale
import com.keygenqt.mb.shared.responses.UserLocaleResponse
import com.keygenqt.mb.validators.custom.NotNullNotBlank
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.SizedIterable
import org.jetbrains.exposed.sql.emptySized

/**
 * Request user locale validate
 */
@Suppress("PROVIDED_RUNTIME_TOO_LOW")
@Serializable
data class UserLocaleValidate(
    override val id: Int? = null,

    @field:NotNullNotBlank
    @field:Size(min = 3, max = 250)
    val fname: String,

    @field:NotNullNotBlank
    @field:Size(min = 3, max = 250)
    val lname: String,

    @field:Size(max = 1000)
    val short: String?,

    @field:Size(max = 1000)
    val about: String?,

    @field:Size(max = 1000)
    val quote: String?,

    @field:NotNull(message = "Select locale required")
    val locale: Locale

) : IdValidate {
    override val type: Locale get() = this.locale
}

/**
 * Map data with validate
 */
fun List<UserLocaleValidate>.toData(
    values: SizedIterable<UserLocaleEntity> = emptySized()
): List<UserLocaleResponse> {
    this.validateIds(values.map { IdDataValidate(it.id.value, it.locale) })
    return map {
        UserLocaleResponse(
            id = it.id,
            fname = it.fname,
            lname = it.lname,
            short = it.short,
            about = it.about,
            quote = it.quote,
            locale = it.locale
        )
    }
}
