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

import React from 'react';
import {useTranslation} from 'react-i18next';
import {LocalizationContext} from './Localization'

export function LocalizationProvider(props) {

    const {t, i18n} = useTranslation()

    const isLocEn = i18n.language === 'en-US'

    return (
        <LocalizationContext.Provider
            value={{
                t,
                i18n,
                language: i18n.language,
                isLocEn,
            }}>
            {props.children}
        </LocalizationContext.Provider>
    )
}
