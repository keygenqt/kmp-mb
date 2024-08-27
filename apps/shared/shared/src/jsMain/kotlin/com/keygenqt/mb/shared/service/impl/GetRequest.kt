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
package com.keygenqt.mb.shared.service.impl

import com.keygenqt.mb.shared.extensions.promise
import com.keygenqt.mb.shared.responses.CityResponse
import com.keygenqt.mb.shared.responses.DataKeyValuesResponse
import com.keygenqt.mb.shared.responses.DataValueResponse
import com.keygenqt.mb.shared.responses.UserResponse
import com.keygenqt.mb.shared.service.ServiceRequest
import io.ktor.client.call.*
import io.ktor.client.request.*
import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.GlobalScope

@OptIn(ExperimentalJsExport::class)
@JsExport
@Suppress("unused", "NON_EXPORTABLE_TYPE")
class GetRequestJS(
    private val client: ServiceRequest
) {
    @OptIn(DelicateCoroutinesApi::class)
    fun users() = GlobalScope.promise { client.get.users() }

    @OptIn(DelicateCoroutinesApi::class)
    fun user(id: Int) = GlobalScope.promise { client.get.user(id) }

    @OptIn(DelicateCoroutinesApi::class)
    fun experts() = GlobalScope.promise { client.get.experts() }

    @OptIn(DelicateCoroutinesApi::class)
    fun expert(id: Int) = GlobalScope.promise { client.get.expert(id) }

    @OptIn(DelicateCoroutinesApi::class)
    fun organizers() = GlobalScope.promise { client.get.organizers() }

    @OptIn(DelicateCoroutinesApi::class)
    fun organizer(id: Int) = GlobalScope.promise { client.get.organizer(id) }

    @OptIn(DelicateCoroutinesApi::class)
    fun directions() = GlobalScope.promise { client.get.directions() }

    @OptIn(DelicateCoroutinesApi::class)
    fun direction(id: Int) = GlobalScope.promise { client.get.direction(id) }

    @OptIn(DelicateCoroutinesApi::class)
    fun cities() = GlobalScope.promise { client.get.cities() }

    @OptIn(DelicateCoroutinesApi::class)
    fun city(id: Int) = GlobalScope.promise { client.get.city(id) }

    @OptIn(DelicateCoroutinesApi::class)
    fun countries() = GlobalScope.promise { client.get.countries() }

    @OptIn(DelicateCoroutinesApi::class)
    fun country(id: Int) = GlobalScope.promise { client.get.country(id) }

    @OptIn(DelicateCoroutinesApi::class)
    fun registrationExperts() = GlobalScope.promise { client.get.registrationExperts() }

    @OptIn(DelicateCoroutinesApi::class)
    fun registrationExpert(id: Int) = GlobalScope.promise { client.get.registrationExpert(id) }

    @OptIn(DelicateCoroutinesApi::class)
    fun registrationOrganizers() = GlobalScope.promise { client.get.registrationOrganizers() }

    @OptIn(DelicateCoroutinesApi::class)
    fun registrationOrganizer(id: Int) = GlobalScope.promise { client.get.registrationOrganizer(id) }

    @OptIn(DelicateCoroutinesApi::class)
    fun registrationPartners() = GlobalScope.promise { client.get.registrationPartners() }

    @OptIn(DelicateCoroutinesApi::class)
    fun registrationPartner(id: Int) = GlobalScope.promise { client.get.registrationPartner(id) }

    @OptIn(DelicateCoroutinesApi::class)
    fun authRoles() = GlobalScope.promise { client.get.authRoles() }

    @OptIn(DelicateCoroutinesApi::class)
    fun countPageViewHome() = GlobalScope.promise { client.get.countPageViewHome() }

    @OptIn(DelicateCoroutinesApi::class)
    fun countPageViewCommunity() = GlobalScope.promise { client.get.countPageViewCommunity() }

    @OptIn(DelicateCoroutinesApi::class)
    fun countPageViewExperts() = GlobalScope.promise { client.get.countPageViewExperts() }

    @OptIn(DelicateCoroutinesApi::class)
    fun countPageViewRegs() = GlobalScope.promise { client.get.countPageViewRegs() }

    @OptIn(DelicateCoroutinesApi::class)
    fun topCommunity() = GlobalScope.promise { client.get.topCommunity() }

    @OptIn(DelicateCoroutinesApi::class)
    fun countPageViewActivity() = GlobalScope.promise { client.get.countPageViewActivity() }
}
