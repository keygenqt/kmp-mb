/*
 * Copyright 2023-2024 Vitaliy Zarubin
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
package com.keygenqt.mb.extension

import com.keygenqt.mb.base.SessionUser
import io.ktor.server.sessions.*

const val SESSION_AUTH_KEY = "SESSION_AUTH"

/**
 * Configure session
 */
fun SessionsConfig.session(
    secret: String?,
    signKey: String?,
) {
    if (secret != null && signKey != null) {
        cookie<SessionUser>(SESSION_AUTH_KEY) {
            cookie.path = "/"
            cookie.maxAgeInSeconds = 604800 // One week
            transform(
                SessionTransportTransformerEncrypt(
                    secret.md5Hex(),
                    signKey.md5Hex()
                )
            )
        }
    } else {
        throw RuntimeException("Error load session secret")
    }
}
