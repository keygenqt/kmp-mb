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

import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.request.*
import com.keygenqt.mb.shared.responses.UserResponse
import com.keygenqt.mb.shared.responses.UserDirectionResponse

class GetRequest(private val client: HttpClient) {
    @Throws(Exception::class)
    suspend fun experts(): List<UserResponse> {
        return client.get("experts").body()
    }

    @Throws(Exception::class)
    suspend fun directions(): List<UserDirectionResponse> {
        return client.get("directions").body()
    }
}
