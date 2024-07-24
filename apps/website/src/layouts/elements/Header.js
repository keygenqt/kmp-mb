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
import {Brightness5Outlined, Brightness4Outlined} from '@mui/icons-material';
import {
    DataImages,
    LocalizationContext,
    RouteContext,
    CacheStorage,
    CacheKeys,
    useCacheStorage,
    Shared,
} from '../../base';
import {
    useTheme,
    useMediaQuery,
    AppBar,
    Toolbar,
    IconButton,
    Button,
    Box,
    Stack,
    Avatar,
    Divider,
    ButtonGroup
} from '@mui/material';

export function Header(props) {
    const theme = useTheme()
    const isLG = useMediaQuery(theme.breakpoints.down('lg'))
    const {t} = React.useContext(LocalizationContext)
    const {route, routes} = React.useContext(RouteContext)
    const darkMode = useCacheStorage(CacheKeys.darkMode, false)

    return (
        <AppBar position='relative' color={'transparent'} elevation={0}>
        <Toolbar>
            <IconButton
                size='large'
                edge='start'
                color="inherit"
                aria-label='menu'
                sx={{ mr: 2, padding: 0, marginLeft: '-4px', marginRight: 0}}
                onClick={() => {
                    route.toLocation(routes.home)
                }}
            >
                <Avatar
                    alt={'Logo'}
                    src={DataImages.common.logo}
                    sx={{
                        width: isLG ? 38 : 60,
                        height: isLG ? 38 : 60,
                        '& .MuiAvatar-img': {
                            width: isLG ? 30 : 46,
                            height: isLG ? 30 : 46,
                            objectFit: 'contain',
                            padding: '4px',
                            paddingBottom: '8px'
                        },
                    }}
                />
            </IconButton>

            <Box sx={{ flexGrow: 1 }}/>

            <Stack
                direction='row'
                spacing={isLG ? 0.5 : 2}
            >

                <Button
                    color='primary'
                    onClick={() => {
                        if (route.isPage(routes.city)) {
                            route.toBack()
                        }
                        else if (route.isPage(routes.community)) {
                            // Clear page cache
                            [
                                CacheKeys.communityFilterSearch,
                                CacheKeys.communityFilterCountry,
                                Shared.queries.countries,
                            ].forEach(key => CacheStorage.clearByKey(key, true))
                            // Refresh
                            route.refreshPage()
                        } else {
                            route.toLocation(routes.community)
                        }
                    }}
                >
                    {t('layouts.header.t_community')}
                </Button>

                <Button
                    color='primary'
                    onClick={() => {
                        if (route.isPage(routes.expert)) {
                            route.toBack()
                        }
                        else if (route.isPage(routes.experts)) {
                            // Clear page cache
                            [
                                CacheKeys.expertFilterSearch,
                                CacheKeys.expertFilterDirection,
                                Shared.queries.experts,
                            ].forEach(key => CacheStorage.clearByKey(key, true))
                            // Refresh
                            route.refreshPage()
                        } else {
                            route.toLocation(routes.experts)
                        }
                    }}
                >
                    {t('layouts.header.t_experts')}
                </Button>

                <Divider orientation='vertical' flexItem />

                <ButtonGroup
                    color={'primary'}
                    size='small'
                    variant='text'
                    aria-label='Mode'
                >
                    <Button
                        sx={isLG ? {
                            minWidth: '30px !important',
                            height: '33px',
                            position: 'relative',
                            top: '4px',
                        } : {}}
                        onClick={() => {
                            CacheStorage.set(CacheKeys.darkMode, !darkMode)
                        }}
                    >
                        {darkMode ? (
                            <Brightness4Outlined/>
                        ) : (
                            <Brightness5Outlined/>
                        )}
                    </Button>
                </ButtonGroup>

            </Stack>
        </Toolbar>
    </AppBar>
    );
}

Header.propTypes = {};
