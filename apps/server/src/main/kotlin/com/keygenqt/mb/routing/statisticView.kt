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

import com.keygenqt.mb.extension.receiveValidate
import com.keygenqt.mb.shared.db.service.StatisticViewService
import com.keygenqt.mb.shared.responses.StateResponse
import com.keygenqt.mb.validators.models.StatisticViewValidate
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.koin.ktor.ext.inject

fun Route.statisticView() {
    val statisticViewService: StatisticViewService by inject()

    route("/statistic-view") {
        post {
            // get request
            val request = call.receiveValidate<StatisticViewValidate>()
            // act
            statisticViewService.transaction {
                addIfNotExist(
                    id = request.id,
                    pageKey = request.pageKey,
                    remoteAddress = call.request.origin.remoteAddress,
                )
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
