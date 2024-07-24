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
import {LocalizationContext, RouteContext} from '../../../base';
import {
    useTheme,
    useMediaQuery,
    Card,
    CardContent,
    Stack,
    Typography,
    Box,
    Button,
} from '@mui/material';

export function BlockInfo(props) {
    const theme = useTheme()
    const isMD = useMediaQuery(theme.breakpoints.down('md'))
    const {t, isLocEn} = React.useContext(LocalizationContext)
    const {route} = React.useContext(RouteContext)

    const {
        city,
    } = props

    return (
        <Card sx={{padding: isMD ? 2 : 3}}>
            <CardContent>
                <Stack
                    direction={isMD ? 'column' : 'row'}
                    spacing={4}
                >
                    <Box sx={{textAlign: 'center'}}>
                        <img src={city.image} alt='Logo' className='LogoCity' />
                    </Box>

                    <Stack
                        spacing={isMD ? 2 : 3}
                        direction="column"
                        justifyContent="space-between"
                        sx={{ flexGrow: 1 }}
                    >
                        <Stack
                            spacing={isMD ? 2 : 3}
                        >
                            <Typography variant="h3" component="div">
                                {isLocEn ? city.en : city.ru}
                            </Typography>

                            <Typography variant={isMD ? 'text2' : 'text1'} color={'text.primary'}>
                                {t('pages.city.t_text1', { city: isLocEn ? city.en : city.ru})}
                            </Typography>

                            <Typography variant={isMD ? 'text2' : 'text1'} color={'text.primary'}>
                                {t('pages.city.t_text2')}
                            </Typography>

                            <Typography variant={'text1'} color={'text.primary'} sx={{fontWeight: 500}}>
                                {t('pages.city.t_text3')}
                            </Typography>
                        </Stack>

                        <Stack textAlign="right">
                            <Box>
                                <Button
                                    variant='contained'
                                    onClick={() => {
                                        route.openUrlNewTab(city.telegram)
                                    }}
                                >
                                    {t('pages.city.t_join_btn')}
                                </Button>
                            </Box>
                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}

BlockInfo.propTypes = {
    city: PropTypes.object.isRequired,
};
