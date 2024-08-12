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
import com.keygenqt.mb.shared.responses.StateResponse
import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.request.*

class PostRequest(private val client: HttpClient) {
    /**
     * Registration expert
     */
    @Throws(Exception::class)
    suspend fun registrationExpert(
        request: RegExpertRequest
    ): StateResponse {
        return client.post("api/registration-experts") { setBody(request) }.body()
    }

    /**
     * Registration organizer
     */
    @Throws(Exception::class)
    suspend fun registrationOrganizer(
        request: RegOrganizerRequest
    ): StateResponse {
        return client.post("api/registration-organizers") { setBody(request) }.body()
    }

    /**
     * Registration partner
     */
    @Throws(Exception::class)
    suspend fun registrationPartner(
        request: RegPartnerRequest
    ): StateResponse {
        return client.post("api/registration-partners") { setBody(request) }.body()
    }

    /**
     * Send statistic about view page website
     */
    @Throws(Exception::class)
    suspend fun sendStatisticView(
        request: StatisticViewRequest
    ): StateResponse {
        return client.post("api/statistic-view") { setBody(request) }.body()
    }

    /**
     * Login JWT
     */
    @Throws(Exception::class)
    suspend fun authJwt(
        request: AuthJwtRequest
    ): StateResponse {
        return client.post("api/auth/jwt") { setBody(request) }.body()
    }

    /**
     * Logout JWT
     */
    @Throws(Exception::class)
    suspend fun logout(): StateResponse {
        return client.post("api/logout").body()
    }
}
