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
import com.keygenqt.mb.extension.*
import com.keygenqt.mb.shared.db.entities.toResponse
import com.keygenqt.mb.shared.db.entities.toResponses
import com.keygenqt.mb.shared.db.service.UserContactsService
import com.keygenqt.mb.shared.db.service.UserLocalesService
import com.keygenqt.mb.shared.db.service.UserMediaService
import com.keygenqt.mb.shared.db.service.UsersService
import com.keygenqt.mb.shared.responses.UserRole
import com.keygenqt.mb.validators.models.UserValidate
import com.keygenqt.mb.validators.models.toData
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.koin.ktor.ext.inject

fun Route.users() {
    val usersService: UsersService by inject()
    val userContactsService: UserContactsService by inject()
    val userLocalesService: UserLocalesService by inject()
    val userMediaService: UserMediaService by inject()

    route("/users") {
        get {
            // check role
            call.checkChangeRoles()
            call.userRoleNotHasForbidden(UserRole.ADMIN)
            // act
            val response = usersService.transaction {
                getAll().toResponses(call.getUserRoles())
            }
            // response
            call.respond(response)
        }
        get("/{id}") {
            // check role
            call.checkChangeRoles()
            call.userRoleNotHasForbidden(UserRole.ADMIN)
            // get request
            val id = call.getNumberParam()
            // act
            val response = usersService.transaction {
                findById(id)?.toResponse(call.getUserRoles()) ?: throw Exceptions.NotFound()
            }
            // response
            call.respond(response)
        }
        post {
            // check role
            call.checkChangeRoles()
            call.userRoleNotHasForbidden(UserRole.ADMIN)
            // get request
            val request = call.receiveValidate<UserValidate>()
            // act
            val idsContact = userContactsService.transaction {
                request.contacts.toData().inserts()
            }
            val idsLocale = userLocalesService.transaction {
                request.locales.toData().inserts()
            }
            val idsMedia = userMediaService.transaction {
                request.media.toData().inserts()
            }
            val response = usersService.transaction {
                insert(
                    image = request.image,
                    fname = request.fname,
                    lname = request.lname,
                    short = request.short,
                    about = request.about,
                    quote = request.quote,
                    roles = request.roles,
                    directions = request.directions,
                    locales = idsLocale,
                    contacts = idsContact,
                    media = idsMedia,
                    password = request.password,
                ).toResponse(call.getUserRoles())
            }
            // response
            call.respond(response)
        }
        put("/{id}") {
            // check role
            call.checkChangeRoles()
            call.userRoleNotHasForbidden(UserRole.ADMIN, UserRole.MANAGER)
            // get request
            val id = call.getNumberParam()
            val request = call.receiveValidate<UserValidate>()
            // act
            val model = usersService.transaction {
                findById(id) ?: throw Exceptions.NotFound()
            }
            val response = with(model) {
                val idsContact = userContactsService.transaction {
                    request.contacts.toData(contacts).inserts() + request.contacts.toData(contacts).updates()
                }
                val idsLocale = userLocalesService.transaction {
                    request.locales.toData(locales).inserts() + request.locales.toData(locales).updates()
                }
                val idsMedia = userMediaService.transaction {
                    request.media.toData(media).inserts() + request.media.toData(media).updates()
                }
                usersService.transaction {
                    update(
                        image = request.image,
                        fname = request.fname,
                        lname = request.lname,
                        short = request.short,
                        about = request.about,
                        quote = request.quote,
                        roles = request.roles,
                        directions = request.directions,
                        locales = idsLocale,
                        contacts = idsContact,
                        media = idsMedia,
                        password = request.password,
                    ).toResponse(call.getUserRoles())
                }
            }
            // response
            call.respond(response)
        }
        delete("/{id}") {
            // check role
            call.checkChangeRoles()
            call.userRoleNotHasForbidden(UserRole.ADMIN)
            // get request
            val id = call.getNumberParam()
            // act
            usersService.transaction {
                findById(id)?.deleteEntity() ?: throw Exceptions.NotFound()
            }
            // response
            call.respond(HttpStatusCode.OK)
        }
    }
}
