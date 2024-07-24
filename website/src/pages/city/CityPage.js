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
    useTheme,
    useMediaQuery,
    Stack,
    Container,
} from '@mui/material';

import {DataCities} from '../../base/data/DataCities';
import {BlockInfo} from './elements/BlockInfo'
import {BlockCarousel} from './elements/BlockCarousel'
import {BlockOrganizers} from './elements/BlockOrganizers'
import {ErrorPage} from "../";

export function CityPage(props) {
    let {id} = useParams();
    const [data] = React.useState(DataCities.find(x => x.id === parseInt(id)))
    const theme = useTheme()
    const isMD = useMediaQuery(theme.breakpoints.down('md'))

    if (!data) {
        return (
            <ErrorPage/>
        )
    }

    return (
        <Stack
            spacing={isMD ? 4 : 6}
            className={'ContentPage'}
            alignItems="center"
        >
            <Container maxWidth='xl'>
                <BlockInfo city={data}/>
            </Container>
            {data.images.length === 0 ? null : (
                <Container maxWidth='lg'>
                    <BlockCarousel images={data.images}/>
                </Container>
            )}
            {data.organizers.length === 0 ? null : (
                <Container maxWidth='lg'>
                    <BlockOrganizers organizers={data.organizers}/>
                </Container>
            )}
        </Stack>
    );
}

CityPage.propTypes = {};
