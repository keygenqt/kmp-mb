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
package com.keygenqt.mb.shared.service.impl

import com.keygenqt.mb.shared.extensions.promise
import com.keygenqt.mb.shared.requests.*
import com.keygenqt.mb.shared.service.ServiceRequest
import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.GlobalScope

@OptIn(ExperimentalJsExport::class)
@JsExport
@Suppress("unused", "NON_EXPORTABLE_TYPE")
class PutRequestJS(
    private val client: ServiceRequest
) {
    @OptIn(DelicateCoroutinesApi::class)
    fun editCountry(
        id: Int,
        request: CountryRequest
    ) = GlobalScope.promise { client.put.editCountry(id, request) }

    @OptIn(DelicateCoroutinesApi::class)
    fun editCity(
        id: Int,
        request: CityRequest
    ) = GlobalScope.promise { client.put.editCity(id, request) }

    @OptIn(DelicateCoroutinesApi::class)
    fun editUser(
        id: Int,
        request: UserRequest
    ) = GlobalScope.promise { client.put.editUser(id, request) }

    @OptIn(DelicateCoroutinesApi::class)
    fun editDirection(
        id: Int,
        request: DirectionRequest
    ) = GlobalScope.promise { client.put.editUserDirection(id, request) }

    @OptIn(DelicateCoroutinesApi::class)
    fun editRegExpert(
        id: Int,
        request: RegExpertEditRequest
    ) = GlobalScope.promise { client.put.editRegExpert(id, request) }

    @OptIn(DelicateCoroutinesApi::class)
    fun editRegOrganizer(
        id: Int,
        request: RegOrganizerEditRequest
    ) = GlobalScope.promise { client.put.editRegOrganizer(id, request) }

    @OptIn(DelicateCoroutinesApi::class)
    fun editRegPartner(
        id: Int,
        request: RegPartnerEditRequest
    ) = GlobalScope.promise { client.put.editRegPartner(id, request) }
}
