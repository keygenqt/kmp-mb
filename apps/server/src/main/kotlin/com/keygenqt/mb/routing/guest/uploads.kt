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

import com.keygenqt.mb.base.Exceptions
import com.keygenqt.mb.extension.getStringParam
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.io.File

fun Route.guestUploads() {
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
    }
}
