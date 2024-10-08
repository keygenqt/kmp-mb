
/**
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

import shared from "shared";
import {AppConf} from "../../conf/AppConf";
import {locale} from "./elements/locale"
import {queries} from "./elements/queries"

const HttpClient = new shared.com.keygenqt.mb.shared.service.ServiceRequestJS(AppConf.apiUrl)
const Requests = shared.com.keygenqt.mb.shared.requests
const StatisticViewPage = shared.com.keygenqt.mb.shared.requests.StatisticViewPage

export const Shared = {
    locale: locale,
    queries: queries,
    httpClient: HttpClient,
    requests: Requests,
    pageKey: StatisticViewPage
}
