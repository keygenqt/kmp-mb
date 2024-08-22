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
import {
    Box,
    Stack,
    Typography,
    CircularProgress,
} from '@mui/material';
import {
    PageError404,
} from '../base';

export function FormWithViewLayout(props) {

    const isLoading = props.model === undefined
    const isEmpty = props.model === null

    return (
        <Stack
            spacing={2}
            sx={{width: 1, height: 1}}
            alignItems='center'
            justifyContent={isLoading ? 'space-between' : 'flex-start'}
        >
            {isLoading ? (
                <>
                    <Box/>
                    <CircularProgress size='2.2rem' />
                    <Box/>
                </>
            ) : (
                isEmpty ? (
                    <>
                        <Box/>
                        <PageError404/>
                        <Box/>
                    </>
                ) : (
                    <>
                        <Stack spacing={2} direction="row" sx={{width: 1}}>
                            <Typography variant="h4" color={'text.primary'} sx={{marginBottom: '6px !important'}}>
                                {props.title}
                            </Typography>
                            <Box sx={{ flexGrow: 1 }}/>
                        </Stack>
                        <Box sx={{width: 1}}>
                            {props.children}
                        </Box>
                    </>
                )
            )}
        </Stack>
    )
}

FormWithViewLayout.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    id: PropTypes.string,
    model: PropTypes.object,
};
