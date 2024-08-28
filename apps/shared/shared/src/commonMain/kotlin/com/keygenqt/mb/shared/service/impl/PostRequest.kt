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
import io.ktor.client.request.forms.*
import io.ktor.http.*

class PostRequest(private val client: HttpClient) {
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
     * Send statistic about view page website
     */
    @Throws(Exception::class)
    suspend fun sendStatisticView(
        request: StatisticViewRequest
    ): StateResponse {
        return client.post("api/statistic-view") { setBody(request) }.body()
    }

    @Throws(Exception::class)
    suspend fun logout(): StateResponse {
        return client.post("api/logout").body()
    }

    @Throws(Exception::class)
    suspend fun registrationExpert(
        request: RegExpertRequest
    ): StateResponse {
        return client.post("api/registration-experts") { setBody(request) }.body()
    }

    @Throws(Exception::class)
    suspend fun registrationOrganizer(
        request: RegOrganizerRequest
    ): StateResponse {
        return client.post("api/registration-organizers") { setBody(request) }.body()
    }

    @Throws(Exception::class)
    suspend fun registrationPartner(
        request: RegPartnerRequest
    ): StateResponse {
        return client.post("api/registration-partners") { setBody(request) }.body()
    }

    @Throws(Exception::class)
    suspend fun addCountry(
        request: CountryRequest
    ): CountryResponse {
        return client.post("api/countries") { setBody(request) }.body()
    }

    @Throws(Exception::class)
    suspend fun addCity(
        request: CityRequest
    ): CityResponse {
        return client.post("api/cities") { setBody(request) }.body()
    }

    @Throws(Exception::class)
    suspend fun addUser(
        request: UserRequest
    ): UserResponse {
        return client.post("api/users") { setBody(request) }.body()
    }

    @Throws(Exception::class)
    suspend fun addDirection(
        request: DirectionRequest
    ): UserDirectionResponse {
        return client.post("api/directions") { setBody(request) }.body()
    }

    /**
     * Upload file
     */
    @Throws(Exception::class)
    suspend fun uploads(
        files: Array<FileRequest>
    ): List<UploadResponse> {
        return client.submitFormWithBinaryData(
            url = "api/uploads",
            formData = formData {
                files.forEach {
                    append(
                        "file", it.file,
                        Headers.build {
                            append(HttpHeaders.ContentType, it.contentType)
                            append(HttpHeaders.ContentDisposition, "filename=\"${it.name}\"")
                        }
                    )
                }
            }
        ).body()
    }
}
