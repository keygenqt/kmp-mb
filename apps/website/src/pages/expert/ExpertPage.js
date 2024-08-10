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
import {useParams} from "react-router";
import {
    LocalizationContext,
    Shared,
    useHttpQuery,
    useStatisticView,
    PageError404,
    PageLoader,
    Helper
} from '../../base';
import {
    useTheme,
    useMediaQuery,
    Stack,
    Container,
    Typography,
} from '@mui/material';
import {FormatQuote} from '@mui/icons-material';

import {BlockInfo} from './elements/BlockInfo'
import {BlockMedia} from './elements/BlockMedia'

export function ExpertPage(props) {
    let {id} = useParams();

    const data = useHttpQuery(Shared.queries.expert, id)

    const theme = useTheme()
    const isMD = useMediaQuery(theme.breakpoints.down('md'))
    const {language} = React.useContext(LocalizationContext)

    // Send view
    useStatisticView(Shared.pageKey.EXPERT, id)

    // Error get data
    if (data === null) {
        return (
            <PageError404/>
        )
    }

    // Loading get data
    if (data === undefined) {
        return (
            <PageLoader/>
        )
    }

    const quote = Helper.locate(data, 'quote', language)

    return (
        <Stack
            spacing={isMD ? 4 : 6}
            className={'ContentPage'}
            alignItems="center"
        >
            <BlockInfo data={data}/>
            
            {!quote ? null : (
                <Container maxWidth='md'>
                    <Stack spacing={3} justifyContent="center" alignItems="center">
                        <Typography color={'text.primary'} sx={{textAlign: 'center'}}>
                            <FormatQuote sx={{ fontSize: 60 }}/>
                        </Typography>
                        <Typography variant={'text1'} color={'text.primary'} sx={{textAlign: 'center'}}>
                            {quote}
                        </Typography>
                    </Stack>
                </Container>
            )}
            {!data.media ? null : (
                <Container maxWidth='lg'>
                    <BlockMedia media={data.media}/>
                </Container>
            )}
        </Stack>
    );
}

ExpertPage.propTypes = {};
