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
import com.keygenqt.mb.extension.getNumberParam
import com.keygenqt.mb.extension.receiveValidate
import com.keygenqt.mb.shared.db.entities.RegExpertEntity
import com.keygenqt.mb.shared.db.entities.toResponse
import com.keygenqt.mb.shared.db.entities.toResponses
import com.keygenqt.mb.shared.db.service.RegExpertsService
import com.keygenqt.mb.shared.responses.UserRole
import com.keygenqt.mb.validators.NotNullNotBlank
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size
import kotlinx.serialization.Serializable
import org.hibernate.validator.constraints.URL
import org.koin.ktor.ext.inject

/**
 * Request insert [RegExpertEntity]
 */
@Serializable
data class RegExpertRequest(
    @field:NotNull
    val directionID: Int,

    @field:NotNull
    val expertID: Int,

    @field:NotNullNotBlank
    @field:Size(min = 3, max = 1000)
    val why: String,

    @field:NotNullNotBlank
    @field:Size(min = 3, max = 250)
    val fname: String,

    @field:NotNullNotBlank
    @field:Size(min = 3, max = 250)
    val lname: String,

    @field:NotNullNotBlank
    @field:Email
    val email: String,

    @field:NotNullNotBlank
    @field:Size(min = 3, max = 250)
    @field:URL
    val telegram: String,

    @field:NotNullNotBlank
    @field:Size(min = 3, max = 250)
    @field:URL
    val cv: String,

    @field:NotNullNotBlank
    @field:Size(min = 3, max = 250)
    val location: String,

    @field:NotNullNotBlank
    @field:Size(min = 3, max = 1000)
    val experience: String,

    @field:NotNullNotBlank
    @field:Size(min = 3, max = 1000)
    val contribution: String,
)

fun Route.registrationExperts() {

    val regExpertsService: RegExpertsService by inject()

    val role = UserRole.GUEST

    route("/registration-experts") {
        get {
            // check role
            // @todo
            // if (role != UserRole.ADMIN) throw Exceptions.Forbidden()
            // act
            val response = regExpertsService.transaction {
                getAll().toResponses()
            }
            // response
            call.respond(response)
        }
        get("/{id}") {
            // check role
            // @todo
            // if (role != UserRole.ADMIN) throw Exceptions.Forbidden()
            // get request
            val id = call.getNumberParam()
            // act
            val response = regExpertsService.transaction {
                findById(id)?.toResponse() ?: throw Exceptions.NotFound()
            }
            // response
            call.respond(response)
        }
        post {
            // get request
            val request = call.receiveValidate<RegExpertRequest>()
            // act
            val response = regExpertsService.transaction {
                insert(
                    directionID = request.directionID,
                    expertID = request.expertID,
                    why = request.why,
                    fname = request.fname,
                    lname = request.lname,
                    email = request.email,
                    telegram = request.telegram,
                    cv = request.cv,
                    location = request.location,
                    experience = request.experience,
                    contribution = request.contribution,
                ).toResponse()
            }
            // response
            call.respond(response)
        }
    }
}
