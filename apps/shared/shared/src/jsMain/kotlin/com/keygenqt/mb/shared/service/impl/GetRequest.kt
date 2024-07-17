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

import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.GlobalScope
import com.keygenqt.mb.shared.extensions.promise
import com.keygenqt.mb.shared.service.ServiceRequest

@OptIn(ExperimentalJsExport::class)
@JsExport
@Suppress("unused", "NON_EXPORTABLE_TYPE")
class GetRequestJS(
    private val client: ServiceRequest
) {
    @OptIn(DelicateCoroutinesApi::class)
    fun users() = GlobalScope.promise { client.get.users() }
}
