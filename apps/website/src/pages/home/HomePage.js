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
import {useTheme, useMediaQuery, Stack, Container} from '@mui/material';
import {BlockAbout} from './elements/BlockAbout';
import {BlockCards} from './elements/BlockCards';
import {BlockCarousel} from './elements/BlockCarousel';
import {BlockPartners} from './elements/BlockPartners';
import {useStatisticView, Shared} from '../../base';

export function HomePage(props) {
    const theme = useTheme()
    const isMD = useMediaQuery(theme.breakpoints.down('md'))

    // Send view
    useStatisticView(Shared.pageKey.HOME)

    return (
        <Stack
        spacing={isMD ? 4 : 6}
        className={'ContentPage'}
        alignItems="center"
        >
            <Container maxWidth='xl'>
                <BlockAbout/>
            </Container>
            <Container maxWidth='lg'>
                <BlockCards/>
            </Container>
            <Container maxWidth='lg'>
                <BlockCarousel/>
            </Container>
            <Container maxWidth='lg'>
                <BlockPartners/>
            </Container>
        </Stack>
    );
}


HomePage.propTypes = {};
