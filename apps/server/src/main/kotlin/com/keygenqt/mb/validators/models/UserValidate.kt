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

import com.keygenqt.mb.shared.responses.UserRole
import com.keygenqt.mb.validators.custom.*
import jakarta.validation.Valid
import jakarta.validation.constraints.Size
import kotlinx.serialization.Serializable

/**
 * Request user validate
 */
@Suppress("PROVIDED_RUNTIME_TOO_LOW")
@Serializable
@UserDirectionsValidate
@UserPasswordValidate
@UserLocalesValidate
data class UserValidate(
    val id: Int?,

    @field:NotNullNotBlank
    @field:Size(min = 3, max = 250)
    val image: String,

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

    @field:Valid
    val contacts: List<UserContactValidate> = listOf(),

    @field:Valid
    val locales: List<UserLocaleValidate> = listOf(),

    @field:Valid
    val media: List<UserMediaValidate> = listOf(),

    /**
     * List ids directions
     */
    val directions: List<Int> = listOf(),

    /**
     * List roles user
     */
    val roles: List<UserRole> = listOf(UserRole.ORGANIZER),

    /**
     * User for MANAGER & ADMIN
     */
    @field:Size(min = 8, max = 12)
    val password: String?,
)
