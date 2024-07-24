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
import {DataLottie, LocalizationContext, RouteContext} from '../../../base';
import {
    useTheme,
    useMediaQuery,
    Card,
    CardContent,
    Button,
    Grid,
    Stack,
    Box,
    FormControl,
    MenuItem,
    InputLabel,
    Select,
    TextField,
    Typography,
} from '@mui/material';

import {DataCities} from "../../../base/data/DataCities";

export function BlockCities(props) {

    const theme = useTheme()
    const isSM = useMediaQuery(theme.breakpoints.down('sm'))

    const {t, isLocEn} = React.useContext(LocalizationContext)
    const {route, routes} = React.useContext(RouteContext)

    const [search, setSearch] = React.useState('');
    const [country, setCountry] = React.useState('');

    const countries = []
    const content = []
    DataCities.forEach((item) => {
        // Get localization data
        const search_name = isLocEn ? item.en : item.ru
        const select_country = isLocEn ? item.country_en : item.country_ru

        // Get array for select
        if (!countries.includes(select_country)) {
            countries.push(select_country)
        }
        countries.sort()

        // Filter country
        if (country && country !== select_country) {
            return;
        }

        // Search ru/en name city
        if (!search
            || item.en.toLowerCase().includes(search.toLowerCase())
            || item.ru.toLowerCase().includes(search.toLowerCase())
        ) {
            // Items
            content.push(
                <Grid key={item.id} item xl={3} lg={3} md={4} sm={6} xs={12}>
                    <Card color={'primary'} sx={{
                        '& .MuiCardContent-root': {
                            padding: 2.5,
                            marginBottom: -1
                        }
                    }}>
                        <CardContent>
                            <Stack spacing={1.5}>
                                <Box className={'CityImage'}>
                                    <img src={item.image} alt={search_name} />
                                </Box>
                                <Stack direction={'row'} justifyContent="flex-end">
                                    <Button
                                        color='primary'
                                        size="small"
                                        onClick={() => {
                                            route.toLocation(routes.city, item.id)
                                        }}
                                    >
                                        {t('common.t_more')}
                                    </Button>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            )
        }
    })

    return (
        <Box>
            <Grid
                container
                spacing={isSM ? 4 : 5}
                rowSpacing={isSM ? 4 : 5}
                justifyContent="flex-end"
                sx={{marginBottom: isSM ? 4 : 5}}
            >
                <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
                    <TextField
                        id='outlined-basic'
                        inputProps={{
                            autoComplete: 'off',
                            form: {
                                autoComplete: 'off',
                            },
                        }}
                        label={t('pages.community.t_filter_search')}
                        variant='outlined'
                        sx={{ width: '100%' }}
                        value={search}
                        onChange={(event) => {
                          setSearch(event.target.value);
                        }}
                    />
                </Grid>

                <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="country-select-label">
                        {t('pages.community.t_filter_country')}
                        </InputLabel>
                        <Select
                            labelId="country-select-label"
                            value={country}
                            label={t('pages.community.t_filter_country')}
                            onChange={(event) => {
                                setCountry(event.target.value);
                            }}
                        >
                            <MenuItem value="">
                                <em>{t('common.t_none')}</em>
                            </MenuItem>
                            {countries.map((option) => (
                                <MenuItem key={`cat-${option}`} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            {content.length !== 0 ? (
                <Grid
                    container
                    spacing={isSM ? 4 : 5}
                    rowSpacing={isSM ? 4 : 5}
                >
                    {content}
                </Grid>
            ) : (
                <Stack spacing={4} sx={{paddingTop: 3, paddingBottom: 3}}>
                    <Typography variant='h4' color={'text.primary'} sx={{textAlign: 'center'}}>
                        {t('pages.community.t_not_found')}
                    </Typography>
                    <Box>
                        <Lottie
                            className={'NotFoundLottie'}
                            animationData={DataLottie.not_found}
                        />
                    </Box>
                </Stack>
                )}
        </Box>
    );
}

BlockCities.propTypes = {};
