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
package com.keygenqt.mb.routing

import com.keygenqt.mb.base.Exceptions
import com.keygenqt.mb.base.SessionService
import com.keygenqt.mb.base.SessionUser
import com.keygenqt.mb.extension.getUserRoles
import com.keygenqt.mb.extension.receiveValidate
import com.keygenqt.mb.shared.db.entities.toResponse
import com.keygenqt.mb.shared.db.service.UsersService
import com.keygenqt.mb.shared.responses.StateResponse
import com.keygenqt.mb.shared.responses.UserRolesResponse
import com.keygenqt.mb.validators.models.LoginValidate
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.sessions.*
import org.koin.ktor.ext.inject

fun Route.auth() {

    val usersService: UsersService by inject()
    val sessionService: SessionService by inject()

    route("/auth") {
        get("/roles") {
            // act
            val roles = call.getUserRoles()
            // response
            call.respond(
                UserRolesResponse(
                    roles = roles.toTypedArray()
                )
            )
        }
        post("/jwt") {
            // get request
            val request = call.receiveValidate<LoginValidate>()
            // act
            val response = usersService.transaction {
                usersService.findUserByAuth(
                    lname = request.lname,
                    password = request.password
                )?.toResponse(call.getUserRoles()) ?: throw Exceptions.Unauthorized()
            }
            // clear session if exist
            call.sessions.clear<SessionUser>()
            // set new session
            call.sessions.set(
                SessionUser(
                    userId = response.id,
                    roles = response.roles?.toList(),
                    token = sessionService.generateToken(response.id),
                )
            )
            // response
            call.respond(
                StateResponse(
                    code = HttpStatusCode.OK.value,
                    message = HttpStatusCode.OK.description
                )
            )
        }
    }
}
