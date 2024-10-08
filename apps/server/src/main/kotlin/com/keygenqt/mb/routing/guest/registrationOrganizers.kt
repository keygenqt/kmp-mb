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
package com.keygenqt.mb.routing.guest

import com.keygenqt.mb.extension.getUserRoles
import com.keygenqt.mb.extension.receiveValidate
import com.keygenqt.mb.shared.db.entities.toResponse
import com.keygenqt.mb.shared.db.service.RegOrganizersService
import com.keygenqt.mb.shared.responses.StateResponse
import com.keygenqt.mb.validators.models.RegOrganizerValidate
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.koin.ktor.ext.inject

fun Route.guestRegistrationOrganizers() {
    val regOrganizersService: RegOrganizersService by inject()

    route("/registration-organizers") {
        post {
            // get request
            val request = call.receiveValidate<RegOrganizerValidate>()
            // act
            regOrganizersService.transaction {
                insert(
                    fname = request.fname,
                    lname = request.lname,
                    why = request.why,
                    experience = request.experience,
                    activity = request.activity,
                    email = request.email,
                    emailNotion = request.emailNotion,
                    telegram = request.telegram,
                    city = request.city,
                    country = request.country,
                    expectations = request.expectations,
                ).toResponse(call.getUserRoles())
            }
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
