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
import {
    DataImages,
    LocalizationContext,
    RouteContext,
    useCacheStorage,
    CacheKeys,
} from '../../../base';
import {
    useTheme,
    useMediaQuery,
    Button,
    Box,
    Stack,
    Grid,
    Typography,
} from '@mui/material';

export function BlockAbout(props) {
    const theme = useTheme()
    const isLG = useMediaQuery(theme.breakpoints.down('lg'))
    const {t} = React.useContext(LocalizationContext)
    const {route, routes} = React.useContext(RouteContext)
    const darkMode = useCacheStorage(CacheKeys.darkMode, false)

    return (
        <Box className={'BlockAbout'} sx={{ textAlign: isLG ? 'center' : 'inherit', overflow: 'hidden' }} >
            <Grid
                container
                spacing={{lg: 5}}
                rowSpacing={4}
            >
                <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                    <Box>
                        <Stack spacing={4}>
                            <Typography variant='h2' color={'text.primary'}>
                                {t('pages.home.t_BlockAbout_title')}
                            </Typography>

                            <Typography variant={isLG ? 'text1' : 'subtitle1'} color={'text.primary'}>
                                {t('pages.home.t_BlockAbout_text')}
                            </Typography>

                            <Box>
                                <Button
                                    variant='contained'
                                    onClick={() => {
                                        route.toLocation(routes.community)
                                    }}
                                >
                                    {t('pages.home.t_BlockAbout_btn')}
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                    <Box sx={{width: '100%', textAlign: 'center'}}>
                        <img
                            style={{width: '100%', maxWidth: '600px', maxHeight: '330px'}}
                            src={darkMode ? DataImages.home.map_dark : DataImages.home.map_light}
                            alt='Map' />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

BlockAbout.propTypes = {};
