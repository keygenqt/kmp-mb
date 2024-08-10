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
import com.keygenqt.mb.shared.requests.RegExpertRequest
import com.keygenqt.mb.shared.requests.RegOrganizerRequest
import com.keygenqt.mb.shared.requests.RegPartnerRequest
import com.keygenqt.mb.shared.requests.StatisticViewRequest
import com.keygenqt.mb.shared.service.ServiceRequest
import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.GlobalScope

@OptIn(ExperimentalJsExport::class)
@JsExport
@Suppress("unused", "NON_EXPORTABLE_TYPE")
class PostRequestJS(
    private val client: ServiceRequest
) {
    @OptIn(DelicateCoroutinesApi::class)
    fun registrationExpert(
        request: RegExpertRequest
    ) = GlobalScope.promise { client.post.registrationExpert(request) }

    @OptIn(DelicateCoroutinesApi::class)
    fun registrationOrganizer(
        request: RegOrganizerRequest
    ) = GlobalScope.promise { client.post.registrationOrganizer(request) }

    @OptIn(DelicateCoroutinesApi::class)
    fun registrationPartner(
        request: RegPartnerRequest
    ) = GlobalScope.promise { client.post.registrationPartner(request) }

    @OptIn(DelicateCoroutinesApi::class)
    fun sendStatisticView(
        request: StatisticViewRequest
    ) = GlobalScope.promise { client.post.sendStatisticView(request) }
}
