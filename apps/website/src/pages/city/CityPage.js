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
    Shared,
    useHttpQuery,
    useStatisticView,
    PageError404,
    PageLoader,
} from '../../base';
import {
    useTheme,
    useMediaQuery,
    Stack,
    Container,
} from '@mui/material';

import {BlockInfo} from './elements/BlockInfo'
import {BlockCarousel} from './elements/BlockCarousel'
import {BlockOrganizers} from './elements/BlockOrganizers'

export function CityPage(props) {
    let {id} = useParams();

    const data = useHttpQuery(Shared.queries.city, id)

    const theme = useTheme()
    const isMD = useMediaQuery(theme.breakpoints.down('md'))

    // Send view
    useStatisticView(Shared.pageKey.CITY, id)

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

    return (
        <Stack
            spacing={isMD ? 4 : 6}
            className={'ContentPage'}
            alignItems="center"
        >
            <BlockInfo city={data}/>
            
            {!data.uploads ? null : (
                <Container maxWidth='lg'>
                    <BlockCarousel images={data.uploads}/>
                </Container>
            )}
            {!data.organizers ? null : (
                <Container maxWidth='lg'>
                    <BlockOrganizers organizers={data.organizers}/>
                </Container>
            )}
        </Stack>
    );
}

CityPage.propTypes = {};
