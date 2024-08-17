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
package com.keygenqt.mb.shared.service

import com.keygenqt.mb.shared.responses.StateResponse
import com.keygenqt.mb.shared.responses.StateResponseException
import io.ktor.client.*
import io.ktor.client.plugins.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.json.Json
import com.keygenqt.mb.shared.service.impl.GetRequest
import com.keygenqt.mb.shared.service.impl.PostRequest
import com.keygenqt.mb.shared.service.impl.PutRequest
import io.ktor.client.call.*

/**
 * Get platform client
 */
expect fun httpClient(config: HttpClientConfig<*>.() -> Unit = {}): HttpClient

/**
 * Common service network
 */
class ServiceRequest(url: String) {

    private val json = Json {
        prettyPrint = true
        isLenient = true
        ignoreUnknownKeys = true
    }

    private var httpClient = httpClient {
        expectSuccess = false
        install(DefaultRequest) {
            url(url)
            contentType(ContentType.Application.Json)
        }
        install(ContentNegotiation) {
            json(json)
        }
        HttpResponseValidator {
            validateResponse { response ->
                if (response.status != HttpStatusCode.OK) {
                    val state: StateResponse = response.body()
                    throw StateResponseException(
                        code = state.code,
                        message = state.message,
                        validates = state.validates
                    )
                }
            }
        }
    }

    val get = GetRequest(httpClient)
    val post = PostRequest(httpClient)
    val put = PutRequest(httpClient)
}
