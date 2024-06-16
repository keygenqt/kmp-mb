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
package mb.routing

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import mb.shared.models.ExpertModel

fun Route.experts() {
    get("/experts") {
        call.respond(listOf(
            ExpertModel(1, "Expert 1"),
            ExpertModel(2, "Expert 2"),
            ExpertModel(3, "Expert 3"),
            ExpertModel(4, "Expert 4"),
            ExpertModel(5, "Expert 5"),
        ))
    }
}
