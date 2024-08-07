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
import com.keygenqt.mb.extension.getUserRoles
import com.keygenqt.mb.extension.receiveValidate
import com.keygenqt.mb.extension.userRoleNotHasForbidden
import com.keygenqt.mb.shared.db.entities.toResponse
import com.keygenqt.mb.shared.db.entities.toResponses
import com.keygenqt.mb.shared.db.service.ColumnLocalesService
import com.keygenqt.mb.shared.db.service.CountriesService
import com.keygenqt.mb.shared.responses.UserRole
import com.keygenqt.mb.validators.models.CountryValidate
import com.keygenqt.mb.validators.models.toEntities
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.koin.ktor.ext.inject

fun Route.countries() {
    val countriesService: CountriesService by inject()
    val columnLocalesService: ColumnLocalesService by inject()

    route("/countries") {
        get {
            // act
            val response = countriesService.transaction {
                getAll().toResponses(call.getUserRoles())
            }
            // response
            call.respond(response)
        }
        get("/{id}") {
            // get request
            val id = call.getNumberParam()
            // act
            val response = countriesService.transaction {
                findById(id)?.toResponse(call.getUserRoles()) ?: throw Exceptions.NotFound()
            }
            // response
            call.respond(response)
        }
        post {
            // check role
            call.userRoleNotHasForbidden(UserRole.ADMIN)
            // get request
            val request = call.receiveValidate<CountryValidate>()
            // act
            val idsLocale = columnLocalesService.transaction {
                request.locales.toEntities().inserts()
            }
            val response = countriesService.transaction {
                insert(
                    name = request.name,
                    locales = idsLocale,
                ).toResponse(call.getUserRoles())
            }
            // response
            call.respond(response)
        }
        put("/{id}") {
            // check role
            call.userRoleNotHasForbidden(UserRole.ADMIN)
            // get request
            val id = call.getNumberParam()
            val request = call.receiveValidate<CountryValidate>()
            // act
            val model = countriesService.transaction {
                findById(id) ?: throw Exceptions.NotFound()
            }
            val response = with(model) {
                val idsLocale = columnLocalesService.transaction {
                    request.locales.toEntities(locales).inserts() + request.locales.toEntities(locales).updates()
                }
                countriesService.transaction {
                    update(
                        name = request.name,
                        locales = idsLocale,
                    ).toResponse(call.getUserRoles())
                }
            }
            // response
            call.respond(response)
        }
        delete("/{id}") {
            // check role
            call.userRoleNotHasForbidden(UserRole.ADMIN)
            // get request
            val id = call.getNumberParam()
            // act
            countriesService.transaction {
                findById(id)?.deleteEntity() ?: throw Exceptions.NotFound()
            }
            // response
            call.respond(HttpStatusCode.OK)
        }
    }
}
