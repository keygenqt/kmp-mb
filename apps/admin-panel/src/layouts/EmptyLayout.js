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
    Brightness5Outlined,
    Brightness4Outlined,
} from '@mui/icons-material';
import {
    CacheStorage,
    CacheKeys,
    useCacheStorage,
} from '../base';
import {
    Box,
    Button,
} from '@mui/material';

export function EmptyLayout(props) {
    const darkMode = useCacheStorage(CacheKeys.darkMode, false, false)
    return (
        <>
            <Box
                className={'Table-Row'}
                sx={{
                    background: '#802aea0a'
                }}
            >
                <Box id={'Table-Cell-Page'} className={'Table-Cell ' + props.className} sx={{
                        verticalAlign: props.isCenter === true ? 'middle' : 'top'
                    }}
                >
                    {props.children}
                </Box>
            </Box>
            <Button
                sx={{
                    minWidth: '50px !important',
                    height: '50px',
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    borderRadius: 50
                }}
                color='primary'
                onClick={() => {
                    CacheStorage.set(CacheKeys.darkMode, !darkMode, false)
                }}
            >
                {darkMode ? (
                    <Brightness4Outlined color='primary'/>
                ) : (
                    <Brightness5Outlined color='primary'/>
                )}
            </Button>
        </>
    )
}

EmptyLayout.propTypes = {
    children: PropTypes.element.isRequired,
    className: PropTypes.string.isRequired,
    isCenter: PropTypes.bool,
};
