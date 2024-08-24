
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
import {queries} from "./elements/queries"

const HttpClient = new shared.com.keygenqt.mb.shared.service.ServiceRequestJS(AppConf.apiUrl)
const LocaleShared = shared.com.keygenqt.mb.shared.responses.Locale
const RegExpertState = shared.com.keygenqt.mb.shared.responses.RegExpertState
const RegOrganizerState = shared.com.keygenqt.mb.shared.responses.RegOrganizerState
const RegPartnerState = shared.com.keygenqt.mb.shared.responses.RegPartnerState
const UserRole = shared.com.keygenqt.mb.shared.responses.UserRole
const UserMediaTypes = shared.com.keygenqt.mb.shared.responses.UserMediaTypes
const ContactTypes = shared.com.keygenqt.mb.shared.responses.ContactTypes
const Requests = shared.com.keygenqt.mb.shared.requests

export const Shared = {
    queries: queries,
    httpClient: HttpClient,
    requests: Requests,
    /// UserMediaTypes
    userMediaType: UserMediaTypes,
    userMediaTypes: [
        UserMediaTypes.TELEGRAM,
        UserMediaTypes.GITHUB,
        UserMediaTypes.YOUTUBE,
        UserMediaTypes.SITE,
    ],
    /// ContactTypes
    contactType: ContactTypes,
    contactTypes: [
        ContactTypes.EMAIL,
        ContactTypes.TELEGRAM,
        ContactTypes.LINKEDIN,
    ],
    /// UserRole
    role: UserRole,
    roles: [
        UserRole.ORGANIZER,
        UserRole.EXPERT,
        UserRole.MANAGER,
        UserRole.ADMIN,
    ],
    /// LocaleShared
    locale: LocaleShared,
    locales: [
        LocaleShared.BY,
        LocaleShared.EN,
    ],
    /// RegExpertState
    RegExpertState: RegExpertState,
    RegExpertStates: [
        RegExpertState.WAITING,
        RegExpertState.HOLD,
        RegExpertState.PROBATION,
        RegExpertState.REJECT,
        RegExpertState.APPROVED,
    ],
    /// RegOrganizerState
    RegOrganizerState: RegOrganizerState,
    RegOrganizerStates: [
        RegOrganizerState.WAITING,
        RegOrganizerState.HOLD,
        RegOrganizerState.PROBATION,
        RegOrganizerState.REJECT,
        RegOrganizerState.APPROVED,
    ],
    /// RegPartnerState
    RegPartnerState: RegPartnerState,
    RegPartnerStates: [
        RegPartnerState.WAITING,
        RegPartnerState.HOLD,
        RegPartnerState.CLOSE,
        RegPartnerState.DONE,
    ],
}
