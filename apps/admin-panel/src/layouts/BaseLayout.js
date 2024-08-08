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
    CacheKeys,
    useCacheStorage,
} from '../base';
import {
    Box,
    Stack,
} from '@mui/material';

import {Menu} from './elements/Menu';
import {Header} from './elements/Header';
import {Footer} from './elements/Footer';

export function BaseLayout(props) {
    const showMenu = useCacheStorage(CacheKeys.showMenu, true)
    return (
        <>
            <Box className={'Table-Row'}>
                <Box className={'Table-Cell Header'} sx={{height: '1px'}}>
                    <Header/>
                </Box>
            </Box>
            <Box className={'Table-Row'}>
                <Box id={'Table-Cell-Page'} className={'Table-Cell ' + props.className} sx={{
                        verticalAlign: props.isCenter === true ? 'middle' : 'top'
                    }}
                >
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="stretch"
                        spacing={2}
                        sx={{
                            height: '100%'
                        }}
                    >
                        <Stack
                            width={300}
                            direction="column"
                            spacing={2}
                            sx={{
                                p: 2,
                                paddingRight: 0,
                                marginLeft: showMenu ? '0' : '-315px !important',
                                transitionDuration: '200ms',
                            }}
                        >
                            <Menu/>
                        </Stack>
                        <Stack
                            width={showMenu ? 'calc(100% - 350px)' : 'calc(100% - 35px)'}
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                            sx={{
                                background: '#802aea14',
                                borderRadius: 3,
                                transitionDuration: '200ms',
                            }}
                        >
                            {props.children}
                        </Stack>
                    </Stack>
                </Box>
            </Box>
            <Box className={'Table-Row'} sx={{height: '1px'}}>
                <Box className={'Table-Cell Footer'}>
                    <Footer/>
                </Box>
            </Box>
        </>
    )
}

BaseLayout.propTypes = {
    children: PropTypes.element.isRequired,
    className: PropTypes.string.isRequired,
    isCenter: PropTypes.bool,
};
