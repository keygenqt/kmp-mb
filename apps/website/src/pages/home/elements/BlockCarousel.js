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
import {DataImages} from '../../../base';
import {
    useTheme,
    useMediaQuery,
    Box,
} from '@mui/material';
import Carousel from 'react-material-ui-carousel'

export function BlockCarousel(props) {
    const theme = useTheme()
    const isLG = useMediaQuery(theme.breakpoints.up('lg'))
    const isDownSM = useMediaQuery(theme.breakpoints.down('sm'))

    const content = []
    DataImages.home.slider.slice().reverse().forEach((item, index) => {
        content.push(
            <Box className={'Carousel-Item'} sx={{backgroundImage: `url("${item}")`}} key={`slider-${index}`}/>
        )
    })

    return (
        <Box className={'BlockCarousel'}>
            <Carousel
                changeOnFirstRender={true}
                height={isLG ? 550 : isDownSM ? 250 : 400}
                index={0}
                autoPlay={true}
                swipe={false}
                navButtonsAlwaysVisible={true}
            >
                {content}
            </Carousel>
        </Box>
    );
}

BlockCarousel.propTypes = {};
