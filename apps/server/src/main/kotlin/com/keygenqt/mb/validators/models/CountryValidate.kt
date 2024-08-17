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

import com.keygenqt.mb.validators.custom.CheckColumnLocales
import com.keygenqt.mb.validators.custom.NotNullNotBlank
import jakarta.validation.Valid
import jakarta.validation.constraints.Size
import kotlinx.serialization.Serializable

/**
 * Request country validate
 */
@Suppress("PROVIDED_RUNTIME_TOO_LOW")
@Serializable
data class CountryValidate(
    @field:NotNullNotBlank
    @field:Size(min = 3, max = 250)
    val name: String,

    /**
     * List locales data
     */
    @field:CheckColumnLocales
    @field:Valid
    val locales: List<ColumnLocaleValidate>,
)
