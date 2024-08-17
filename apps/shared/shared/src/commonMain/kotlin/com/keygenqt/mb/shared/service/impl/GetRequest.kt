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

import com.keygenqt.mb.shared.responses.*
import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.request.*

class GetRequest(private val client: HttpClient) {
    @Throws(Exception::class)
    suspend fun users(): List<UserResponse> {
        return client.get("api/users").body()
    }

    @Throws(Exception::class)
    suspend fun experts(): List<UserResponse> {
        return client.get("api/experts").body()
    }

    @Throws(Exception::class)
    suspend fun expert(id: Int): UserResponse {
        return client.get("api/experts/$id").body()
    }

    @Throws(Exception::class)
    suspend fun directions(): List<UserDirectionResponse> {
        return client.get("api/directions").body()
    }

    @Throws(Exception::class)
    suspend fun direction(id: Int): UserDirectionResponse {
        return client.get("api/directions/$id").body()
    }

    @Throws(Exception::class)
    suspend fun cities(): List<CityResponse> {
        return client.get("api/cities").body()
    }

    @Throws(Exception::class)
    suspend fun city(id: Int): CityResponse {
        return client.get("api/cities/$id").body()
    }

    @Throws(Exception::class)
    suspend fun countries(): List<CountryResponse> {
        return client.get("api/countries").body()
    }

    @Throws(Exception::class)
    suspend fun country(id: Int): CountryResponse {
        return client.get("api/countries/$id").body()
    }

    @Throws(Exception::class)
    suspend fun registrationExperts(): List<RegExpertResponse> {
        return client.get("api/registration-experts").body()
    }

    @Throws(Exception::class)
    suspend fun registrationExpert(id: Int): RegExpertResponse {
        return client.get("api/registration-experts/$id").body()
    }

    @Throws(Exception::class)
    suspend fun registrationOrganizers(): List<RegOrganizerResponse> {
        return client.get("api/registration-organizers").body()
    }

    @Throws(Exception::class)
    suspend fun registrationOrganizer(id: Int): RegOrganizerResponse {
        return client.get("api/registration-organizers/$id").body()
    }

    @Throws(Exception::class)
    suspend fun registrationPartners(): List<RegPartnerResponse> {
        return client.get("api/registration-partners").body()
    }

    @Throws(Exception::class)
    suspend fun registrationPartner(id: Int): RegPartnerResponse {
        return client.get("api/registration-partners/$id").body()
    }

    @Throws(Exception::class)
    suspend fun authRoles(): UserRolesResponse {
        return client.get("api/auth/roles").body()
    }

    @Throws(Exception::class)
    suspend fun countPageViewHome(): DataValueResponse {
        return client.get("api/dashboard/view-home").body()
    }

    @Throws(Exception::class)
    suspend fun countPageViewCommunity(): DataValueResponse {
        return client.get("api/dashboard/view-community").body()
    }

    @Throws(Exception::class)
    suspend fun countPageViewExperts(): DataValueResponse {
        return client.get("api/dashboard/view-experts").body()
    }

    @Throws(Exception::class)
    suspend fun countPageViewRegs(): DataValueResponse {
        return client.get("api/dashboard/view-regs").body()
    }

    @Throws(Exception::class)
    suspend fun topCommunity(): List<CityResponse> {
        return client.get("api/dashboard/top-community").body()
    }

    @Throws(Exception::class)
    suspend fun countPageViewActivity(): DataKeyValuesResponse {
        return client.get("api/dashboard/view-activity").body()
    }
}
