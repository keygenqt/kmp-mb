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
import com.keygenqt.mb.extension.checkChangeRoles
import com.keygenqt.mb.extension.getStringParam
import com.keygenqt.mb.extension.getUserRoles
import com.keygenqt.mb.extension.userRoleNotHasForbidden
import com.keygenqt.mb.shared.db.entities.UploadEntity
import com.keygenqt.mb.shared.db.entities.toResponses
import com.keygenqt.mb.shared.db.service.UploadsService
import com.keygenqt.mb.shared.responses.UserRole
import com.keygenqt.mb.shared.utils.ConstantsMime.toExtension
import io.ktor.http.*
import io.ktor.http.content.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.koin.ktor.ext.inject
import java.io.File
import java.util.*

fun Route.uploads() {

    val uploadsService: UploadsService by inject()

    route("/uploads") {
        get("/{name}") {
            // get request
            val name = call.getStringParam()
            val path = "uploads/$name"
            // act
            val file = File(path)
            if (!file.exists()) throw Exceptions.NotFound()
            // response
            call.respondFile(file)
        }
        post {
            // check role
            call.checkChangeRoles()
            call.userRoleNotHasForbidden(UserRole.ADMIN, UserRole.MANAGER)
            // get request
            val uploads = mutableListOf<UploadEntity>()
            // act
            val multipart = call.receiveMultipart()
            multipart.forEachPart { part ->
                if (part is PartData.FileItem) {

                    val name = "${UUID.randomUUID()}.${part.contentType.toExtension()}"
                    val file = File("uploads/$name")

                    part.streamProvider().use { its ->
                        file.outputStream().buffered().use {
                            its.copyTo(it)
                        }
                    }

                    uploads.add(
                        uploadsService.transaction {
                            insert(
                                fileName = name,
                                contentType = part.contentType ?: throw Exceptions.BadRequest(),
                                originalFileName = part.originalFileName
                                    ?: throw Exceptions.BadRequest()
                            )
                        }
                    )
                }
                part.dispose()
            }
            // response
            call.respond(uploads.toResponses(call.getUserRoles()))
        }
        delete("/{name}") {
            // check role
            call.checkChangeRoles()
            call.userRoleNotHasForbidden(UserRole.ADMIN)
            // get request
            val name = call.getStringParam()
            // act
            uploadsService.transaction {
                findByFileName(name)?.deleteEntity() ?: throw Exceptions.NotFound()
            }
            val file = File("uploads/$name")
            if (file.exists()) file.delete()
            // response
            call.respond(HttpStatusCode.OK)
        }
    }
}
