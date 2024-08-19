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

import com.keygenqt.mb.shared.requests.*
import com.keygenqt.mb.shared.responses.*
import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.request.*

class PutRequest(private val client: HttpClient) {
    @Throws(Exception::class)
    suspend fun editCountry(
        id: Int,
        request: CountryRequest
    ): CountryResponse {
        return client.put("api/countries/$id") { setBody(request) }.body()
    }

    @Throws(Exception::class)
    suspend fun editCity(
        id: Int,
        request: CityRequest
    ): CityResponse {
        return client.put("api/cities/$id") { setBody(request) }.body()
    }

    @Throws(Exception::class)
    suspend fun editUserDirection(
        id: Int,
        request: DirectionRequest
    ): UserDirectionResponse {
        return client.put("api/directions/$id") { setBody(request) }.body()
    }

    @Throws(Exception::class)
    suspend fun editRegExpert(
        id: Int,
        request: RegExpertEditRequest
    ): RegExpertResponse {
        return client.put("api/registration-experts/$id") { setBody(request) }.body()
    }

    @Throws(Exception::class)
    suspend fun editRegOrganizer(
        id: Int,
        request: RegOrganizerEditRequest
    ): RegOrganizerResponse {
        return client.put("api/registration-organizers/$id") { setBody(request) }.body()
    }

    @Throws(Exception::class)
    suspend fun editRegPartner(
        id: Int,
        request: RegPartnerEditRequest
    ): RegPartnerResponse {
        return client.put("api/registration-partners/$id") { setBody(request) }.body()
    }
}
