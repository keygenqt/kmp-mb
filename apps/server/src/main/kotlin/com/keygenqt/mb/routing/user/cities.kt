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
import com.keygenqt.mb.extension.receiveValidate
import com.keygenqt.mb.extension.userRoleNotHasForbidden
import com.keygenqt.mb.shared.db.entities.toResponse
import com.keygenqt.mb.shared.db.service.CitiesService
import com.keygenqt.mb.shared.db.service.ColumnLocalesService
import com.keygenqt.mb.shared.responses.UserRole
import com.keygenqt.mb.validators.models.CityValidate
import com.keygenqt.mb.validators.models.toData
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.koin.ktor.ext.inject

fun Route.userCities() {
    val citiesService: CitiesService by inject()
    val columnLocalesService: ColumnLocalesService by inject()

    route("/cities") {
        post {
            // check role
            call.userRoleNotHasForbidden(UserRole.ADMIN, UserRole.MANAGER)
            // get request
            val request = call.receiveValidate<CityValidate>()
            // act
            val idsLocale = columnLocalesService.transaction {
                request.locales.toData().inserts()
            }
            val response = citiesService.transaction {
                insert(
                    countryID = request.countryID,
                    image = request.image,
                    link = request.link,
                    name = request.name,
                    locales = idsLocale,
                    organizers = request.organizers,
                    uploads = request.uploads,
                ).toResponse(call.getUserRoles())
            }
            // response
            call.respond(response)
        }
        put("/{id}") {
            // check role
            call.userRoleNotHasForbidden(UserRole.ADMIN, UserRole.MANAGER)
            // get request
            val id = call.getNumberParam()
            val request = call.receiveValidate<CityValidate>()
            // act
            val model = citiesService.transaction {
                findById(id) ?: throw Exceptions.NotFound()
            }
            val response = with(model) {
                val idsLocale = columnLocalesService.transaction {
                    request.locales.toData(locales).inserts() + request.locales.toData(locales).updates()
                }
                citiesService.transaction {
                    update(
                        countryID = request.countryID,
                        image = request.image,
                        link = request.link,
                        name = request.name,
                        locales = idsLocale,
                        organizers = request.organizers,
                        uploads = request.uploads,
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
            citiesService.transaction {
                findById(id)?.deleteEntity() ?: throw Exceptions.NotFound()
            }
            // response
            call.respond(HttpStatusCode.OK)
        }
    }
}
