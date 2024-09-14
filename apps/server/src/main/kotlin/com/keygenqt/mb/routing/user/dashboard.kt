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

import com.keygenqt.mb.extension.getUserRoles
import com.keygenqt.mb.extension.userRoleNotHasForbidden
import com.keygenqt.mb.shared.db.entities.toResponses
import com.keygenqt.mb.shared.db.service.CitiesService
import com.keygenqt.mb.shared.db.service.RawService
import com.keygenqt.mb.shared.requests.StatisticViewPage
import com.keygenqt.mb.shared.responses.UserRole
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.koin.ktor.ext.inject

fun Route.userDashboard() {

    val rawService: RawService by inject()
    val citiesService: CitiesService by inject()

    route("/dashboard") {
        get("view-home") {
            // act
            val response = rawService.transactionRaw {
                it.getCountPageView(StatisticViewPage.HOME)
            }
            // response
            call.respond(response)
        }
        get("view-community") {
            // act
            val response = rawService.transactionRaw {
                it.getCountPageView(StatisticViewPage.COMMUNITY)
            }
            // response
            call.respond(response)
        }
        get("view-experts") {
            // act
            val response = rawService.transactionRaw {
                it.getCountPageView(StatisticViewPage.EXPERTS)
            }
            // response
            call.respond(response)
        }
        get("view-regs") {
            // act
            val response = rawService.transactionRaw {
                it.getCountPageRegs()
            }
            // response
            call.respond(response)
        }
        get("top-community") {
            // act
            val data = rawService.transactionRaw {
                it.getTopCommunityIDs()
            }
            val response = citiesService.transaction {
                getByIds(data.values.mapNotNull { it.key.toIntOrNull() })
                    .map { entity ->
                        val count = data.values.firstOrNull { it.key.toInt() == entity.id.value }?.value
                        entity.viewCount = count
                        entity
                    }
                    .toResponses(call.getUserRoles())
            }
            // response
            call.respond(response)
        }
        get("view-activity") {
            // act
            val response = rawService.transactionRaw {
                it.getActivityByMonths()
            }
            // response
            call.respond(response)
        }
    }
}
