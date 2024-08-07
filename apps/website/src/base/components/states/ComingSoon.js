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
import Lottie from "lottie-react";
import {DataLottie} from '../../data/DataLottie';
import {LocalizationContext, RouteContext} from '../..';
import {
    Box,
    Stack,
    Typography,
    Button
} from '@mui/material';

export function ComingSoon(props) {
    const {t} = React.useContext(LocalizationContext)
    const {route, routes} = React.useContext(RouteContext)
    return (
        <Stack
            sx={{height: '100%'}}
            direction="column"
            justifyContent="space-between"
            alignItems="center"
        >
            {!props.children ? <Box/> :(<Box sx={{marginBottom: 5}}>{props.children}</Box>)}

            <Box sx={{
                paddingLeft: 3,
                paddingRight: 3,
                textAlign: 'center',
                '& .PageLottie': {
                    width: '275px',
                    margin: '-5px auto',
                    position: 'relative',
                    left: '-23px'
                }
            }}>
                <Stack spacing={4}>

                    <Typography variant='h2' color={'text.primary'}>
                        {t('components.coming_soon.t_title')}
                    </Typography>

                    <Box>
                        <Lottie
                            className={'PageLottie'}
                            loop={false}
                            animationData={DataLottie.coming_soon}
                        />
                    </Box>

                    <Typography variant='text1' color={'text.primary'}>
                        {t('components.coming_soon.t_text')}
                    </Typography>

                    <Box>
                        <Button
                            variant='contained'
                            onClick={() => {
                                route.toLocation(routes.home)
                            }}
                        >
                            {t('components.coming_soon.t_btn')}
                        </Button>
                    </Box>

                </Stack>
            </Box>

            <Box/>
        </Stack>
    );
}

ComingSoon.propTypes = {};
