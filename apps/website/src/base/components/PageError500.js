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
import PropTypes from 'prop-types';
import Lottie from "lottie-react";
import {DataLottie} from '../data/DataLottie';
import {LocalizationContext} from '../../base';
import {
    Box,
    Stack,
    Typography
} from '@mui/material';

export function PageError500(props) {
    const {t} = React.useContext(LocalizationContext)
    return (
        <Stack
            sx={{height: '100%'}}
            direction="column"
            justifyContent="space-between"
            alignItems="center"
        >
            {props.children ? props.children : <Box/>}

            <Box sx={{
                paddingTop: 5,
                paddingLeft: 3,
                paddingRight: 3,
                textAlign: 'center',
                '& .PageLottie': {
                    width: '238px',
                    margin: '-5px auto',
                }
            }}>
                <Stack spacing={3}>
                    <Lottie
                        className={'PageLottie'}
                        animationData={DataLottie.error_500}
                    />
                    <Typography variant='text1' color={'text.primary'}>
                        {t('common.t_error_500')}
                    </Typography>
                </Stack>
            </Box>
            <Box/>
        </Stack>
    );
}

PageError500.propTypes = {
    children: PropTypes.element,
};
