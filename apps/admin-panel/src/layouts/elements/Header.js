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
import {Brightness5Outlined, Brightness4Outlined, Menu} from '@mui/icons-material';
import {
    CacheStorage,
    CacheKeys,
    useCacheStorage,
} from '../../base';
import {
    useTheme,
    useMediaQuery,
    AppBar,
    Toolbar,
    Button,
    Box,
    Stack,
    Typography,
    ButtonGroup
} from '@mui/material';

export function Header(props) {
    const theme = useTheme()
    const isLG = useMediaQuery(theme.breakpoints.down('lg'))
    const darkMode = useCacheStorage(CacheKeys.darkMode, false)
    const showMenu = useCacheStorage(CacheKeys.showMenu, true)

    return (
        <AppBar position='relative' color={'transparent'} elevation={0}>
        <Toolbar>
            <Button
                sx={{
                    minWidth: '50px !important',
                    height: '50px',
                    position: 'relative',
                    left: -8
                }}
                color={'inherit'}
                onClick={() => {
                    CacheStorage.set(CacheKeys.showMenu, !showMenu)
                }}
            >
                <Menu/>
            </Button>

            <Stack
                direction='row'
                spacing={isLG ? 0.5 : 2}
            >
                <Stack direction='row'>
                    <Typography variant="h5" color={'#802aea'}>
                        M
                    </Typography>
                    <Typography variant="h5" color={'#b959ff'}>
                        B
                    </Typography>
                </Stack>
                <Typography variant="caption" color={'text.primary'}>
                    Admin-Panel
                </Typography>
            </Stack>

            <Box sx={{ flexGrow: 1 }}/>

            <Stack
                direction='row'
                spacing={isLG ? 0.5 : 2}
            >
                <ButtonGroup
                    color={'primary'}
                    size='small'
                    variant='text'
                    aria-label='Mode'
                >
                    <Button
                        sx={{
                            minWidth: '50px !important',
                            height: '50px',
                            position: 'relative',
                            right: -8
                        }}
                        color='primary'
                        onClick={() => {
                            CacheStorage.set(CacheKeys.darkMode, !darkMode)
                        }}
                    >
                        {darkMode ? (
                            <Brightness4Outlined color='primary'/>
                        ) : (
                            <Brightness5Outlined color='primary'/>
                        )}
                    </Button>
                </ButtonGroup>
            </Stack>
        </Toolbar>
    </AppBar>
    );
}

Header.propTypes = {};
