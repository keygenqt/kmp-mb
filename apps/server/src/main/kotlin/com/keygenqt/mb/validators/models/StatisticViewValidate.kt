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

import com.keygenqt.mb.shared.requests.StatisticViewPage
import com.keygenqt.mb.validators.custom.NotNullNotBlank
import kotlinx.serialization.Serializable

/**
 * Request statistic view validate
 */
@Suppress("PROVIDED_RUNTIME_TOO_LOW")
@Serializable
data class StatisticViewValidate(
    val uniqueId: String,

    @field:NotNullNotBlank
    val pageKey: StatisticViewPage,

    val id: String? = null,
)
