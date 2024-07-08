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
                isLocEn,
            }}>
            {props.children}
        </LocalizationContext.Provider>
    )
}
