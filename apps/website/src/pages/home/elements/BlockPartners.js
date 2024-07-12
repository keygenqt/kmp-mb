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
import {LocalizationContext, RouteContext, DataLottie} from '../../../base';
import {
    Box,
    Stack,
    Typography,
    Button,
} from '@mui/material';

export function BlockPartners(props) {
    const {t} = React.useContext(LocalizationContext)
    const {route} = React.useContext(RouteContext)

    return (
        <Box className={'BlockPartners'} sx={{textAlign: 'center'}}>
            <Stack spacing={2}>
                <Typography variant='h3' color={'text.primary'}>
                    {t('pages.home.t_BlockPartners_title')}
                </Typography>

                <Typography variant='text1' color={'text.primary'}>
                    {t('pages.home.t_BlockPartners_text')}
                </Typography>

                <Box>
                    <Lottie
                        className={'LaptopLottie'}
                        animationData={DataLottie.laptop}
                    />
                </Box>

                <Box>
                    <Button
                        variant='contained'
                        onClick={() => {
                            route.openUrlNewTab('https://docs.google.com/forms/d/e/1FAIpQLScfD4eQ1IIWhBSXZr87dorYbW-Em9Z8wTpD2UEEQxjVj-eZ0w/viewform')
                        }}
                    >
                        {t('pages.home.t_BlockPartners_btn')}
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
}

BlockPartners.propTypes = {};
