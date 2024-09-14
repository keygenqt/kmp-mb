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
import com.keygenqt.mb.shared.db.service.RegPartnersService
import com.keygenqt.mb.shared.responses.StateResponse
import com.keygenqt.mb.validators.models.RegPartnerValidate
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.koin.ktor.ext.inject

fun Route.guestRegistrationPartners() {
    val regPartnersService: RegPartnersService by inject()

    route("/registration-partners") {
        post {
            // get request
            val request = call.receiveValidate<RegPartnerValidate>()
            // act
            regPartnersService.transaction {
                insert(
                    company = request.company,
                    fname = request.fname,
                    lname = request.lname,
                    email = request.email,
                    telegram = request.telegram,
                    phone = request.phone,
                    format = request.format,
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
