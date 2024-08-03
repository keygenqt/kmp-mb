/*
 * Copyright 2023 Vitaliy Zarubin
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

import com.keygenqt.mb.base.Exceptions
import com.keygenqt.mb.shared.responses.StateResponse
import com.keygenqt.mb.utils.AppLogger
import io.ktor.http.*
import io.ktor.server.plugins.statuspages.*
import io.ktor.server.response.*

/**
 * Catch errors
 */
fun StatusPagesConfig.configure() {
    status(HttpStatusCode.Unauthorized, HttpStatusCode.NotFound) { call, cause ->
        call.respond(
            status = cause,
            message = StateResponse(
                code = cause.value,
                message = cause.description
            )
        )
    }
    exception<Throwable> { call, cause ->
        when (cause) {
            is Exceptions.UnprocessableEntity -> {
                call.respond(
                    status = cause.status,
                    message = StateResponse(
                        code = cause.status.value,
                        message = cause.status.description,
                        validates = cause.validate.toResponse().toTypedArray()
                    )
                )
            }
            is Exceptions -> {
                call.respond(
                    status = cause.status,
                    message = StateResponse(
                        code = cause.status.value,
                        message = cause.status.description
                    )
                )
            }
            else -> {
                call.respond(
                    status = HttpStatusCode.InternalServerError,
                    message = StateResponse(
                        code = HttpStatusCode.InternalServerError.value,
                        message = HttpStatusCode.InternalServerError.description
                    )
                )
            }
        }
        AppLogger.log.error("StatusPagesConfig", cause)
    }
}
