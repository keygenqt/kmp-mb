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

import com.keygenqt.mb.shared.db.entities.RegExpertEntity
import com.keygenqt.mb.validators.custom.NotNullNotBlank
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.Min
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size
import kotlinx.serialization.Serializable
import org.hibernate.validator.constraints.URL

/**
 * Request insert [RegExpertEntity]
 * @todo https://github.com/Kotlin/kotlinx.serialization/issues/993#issuecomment-984742051
 */
@Suppress("PROVIDED_RUNTIME_TOO_LOW")
@Serializable
data class RegExpertValidate(
    @field:NotNull
    @field:Min(1)
    val directionID: Int,

    @field:NotNull
    @field:Min(1)
    val expertID: Int,

    @field:NotNullNotBlank
    @field:Size(min = 3, max = 1000)
    val why: String,

    @field:NotNullNotBlank
    @field:Size(min = 3, max = 250)
    val fname: String,

    @field:NotNullNotBlank
    @field:Size(min = 3, max = 250)
    val lname: String,

    @field:NotNullNotBlank
    @field:Email
    val email: String,

    @field:NotNullNotBlank
    @field:Size(min = 3, max = 250)
    @field:URL
    val telegram: String,

    @field:NotNullNotBlank
    @field:Size(min = 3, max = 250)
    @field:URL
    val cv: String,

    @field:NotNullNotBlank
    @field:Size(min = 3, max = 250)
    val location: String,

    @field:NotNullNotBlank
    @field:Size(min = 3, max = 1000)
    val experience: String,

    @field:NotNullNotBlank
    @field:Size(min = 3, max = 1000)
    val contribution: String,
)
