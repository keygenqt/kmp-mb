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

import * as React from 'react';
import {FormPartner} from './elements/FormPartner';
import {
    LocalizationContext,
    PageHeader,
    Shared,
    useStatisticView,
} from '../../base';
import {
    useTheme,
    useMediaQuery,
    Stack,
    Typography,
    Container,
} from '@mui/material';
import {
    ContentPaste,
} from '@mui/icons-material';


export function RegistrationPartnerPage(props) {
    const theme = useTheme()
    const isMD = useMediaQuery(theme.breakpoints.down('md'))
    const isSM = useMediaQuery(theme.breakpoints.down('sm'))
    const {t} = React.useContext(LocalizationContext)

    // Send view
    useStatisticView(Shared.pageKey.REG_PARTNER)

    return (
        <Stack
            spacing={isMD ? 4 : 6}
            className={'ContentPage'}
            alignItems="center"
        >
            <PageHeader>
                <Stack
                    spacing={2}
                    direction={isSM ? 'column' : 'row'}
                    alignItems={isSM ? 'right' : 'center'}
                >
                    <ContentPaste fontSize="large" sx={{
                        alignSelf: 'flex-start',
                        position: 'relative',
                        top: '6px'
                    }}/>
                    <Typography variant="h3" component="div">
                        {t('pages.registrationPartner.t_title')}
                    </Typography>
                </Stack>
                <Stack spacing={3}>
                    <Typography variant={isMD ? 'text2' : 'text1'} color={'text.primary'}>
                        {t('pages.registrationPartner.t_text1')}
                    </Typography>
                    <Typography variant={isMD ? 'text2' : 'text1'} color={'text.primary'}>
                        {t('pages.registrationPartner.t_text2')}
                    </Typography>
                    <Typography variant={isMD ? 'text2' : 'text1'} color={'text.primary'}>
                        {t('pages.registrationPartner.t_text3')}
                    </Typography>
                    <Typography variant={isMD ? 'text2' : 'text1'} color={'text.primary'}>
                        {t('pages.registrationPartner.t_text4')}
                    </Typography>
                </Stack>

            </PageHeader>

            <Container maxWidth='lg'>
                <FormPartner/>
            </Container>
        </Stack>
    );
}

RegistrationPartnerPage.propTypes = {};
