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
    Button,
    CircularProgress,
} from '@mui/material';
import {
    Add,
    CloudOff,
} from '@mui/icons-material';
import {
    CustomDataGrid,
} from '../base';


export function GridLayout(props) {
    const isLoading = props.rows === undefined
    const isEmpty = props.rows === undefined || props.rows.length === 0

    return (
        <Stack
            spacing={2}
            sx={{width: 1, height: 1}}
            alignItems='center'
            justifyContent={isLoading || isEmpty ? 'space-between' : 'flex-start'}
        >
            <Stack spacing={2} direction="row" sx={{width: 1}}>
                <Typography variant="h4" color={'text.primary'}>
                    {props.title}
                </Typography>
                <Box sx={{ flexGrow: 1 }}/>
                {props.onClickAdd && (
                    <Button
                        variant="contained"
                        color='white'
                        endIcon={<Add color='text.primary' />}
                        onClick={props.onClickAdd}
                    >
                        Add
                    </Button>
                )}
            </Stack>
            {isLoading ? (
                <>
                    <CircularProgress size='2.2rem' />
                    <Box/>
                </>
            ) : (
                isEmpty ? (
                    <>
                        <Stack
                            alignItems={'center'}
                            spacing={3}
                            sx={{
                                p: 3,
                                borderRadius: 2,
                                backgroundColor: 'background.default'
                            }}
                        >
                            <CloudOff color={'error'} fontSize={'large'} />
                            <Typography variant="h5" color={'text.primary'}>
                                Data not found.
                            </Typography>
                        </Stack>
                        <Box/>
                    </>
                ) : (
                    <CustomDataGrid
                        rows={props.rows}
                        columns={props.columns}
                    />
                )
            )}
        </Stack>
    );
}

GridLayout.propTypes = {
    title: PropTypes.string.isRequired,
    rows: PropTypes.array,
    columns: PropTypes.array.isRequired,
    onClickAdd: PropTypes.func,
};
