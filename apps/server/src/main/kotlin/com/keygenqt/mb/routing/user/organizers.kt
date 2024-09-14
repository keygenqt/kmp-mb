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
package com.keygenqt.mb.routing.user

import com.keygenqt.mb.base.Exceptions
import com.keygenqt.mb.extension.getNumberParam
import com.keygenqt.mb.extension.getUserRoles
import com.keygenqt.mb.extension.userRoleNotHasForbidden
import com.keygenqt.mb.shared.db.entities.toResponse
import com.keygenqt.mb.shared.db.entities.toResponses
import com.keygenqt.mb.shared.db.service.UsersService
import com.keygenqt.mb.shared.responses.UserRole
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.koin.ktor.ext.inject

fun Route.userOrganizers() {
    val usersService: UsersService by inject()

    route("/organizers") {
        get {
            // check role
            call.userRoleNotHasForbidden(UserRole.ADMIN, UserRole.MANAGER)
            // act
            val response = usersService.transaction {
                getAll(UserRole.ORGANIZER).toResponses(call.getUserRoles())
            }
            // response
            call.respond(response)
        }
        get("/{id}") {
            // check role
            call.userRoleNotHasForbidden(UserRole.ADMIN, UserRole.MANAGER)
            // get request
            val id = call.getNumberParam()
            // act
            val response = usersService.transaction {
                findById(id, UserRole.ORGANIZER)?.toResponse(call.getUserRoles()) ?: throw Exceptions.NotFound()
            }
            // response
            call.respond(response)
        }
    }
}