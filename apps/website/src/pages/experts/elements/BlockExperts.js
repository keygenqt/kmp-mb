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
    CardMedia,
    Chip,
    CircularProgress,
} from '@mui/material';
import shared from "shared";
import {AppConf} from "../../../conf/AppConf";

const HttpClient = new shared.com.keygenqt.mb.shared.service.ServiceRequestJS(AppConf.apiPath)

export function BlockExperts(props) {

    const [dataExperts, setDataExperts] = React.useState(undefined);
    const [dataDirections, setDirections] = React.useState(undefined);

    const wasCalled = React.useRef(false);
    React.useEffect(() => {
      const fetchData = async () => {
        // Only once
        if(wasCalled.current) return;
        wasCalled.current = true;
        // Delay for loader
        await new Promise(r => setTimeout(r, 1000));
        // Get data
        setDataExperts((await HttpClient.get.experts()).toArray());
        setDirections((await HttpClient.get.directions()).toArray());
      }
      fetchData().catch(console.error);
    }, []);

    const theme = useTheme()
    const isSM = useMediaQuery(theme.breakpoints.down('sm'))

    // @todo ru, en, by
    const {t, isLocEn} = React.useContext(LocalizationContext)
    const {route, routes} = React.useContext(RouteContext)

    const [search, setSearch] = React.useState('');
    const [direction, setDirection] = React.useState('');

    const content = []
    dataExperts?.forEach((item) => {
        // // Get localization data
        const fullName = `${item.fname} ${item.lname}`

        // Filter direction
        if (direction && !item.directions.map((direction) => direction.name).includes(direction)) {
            return;
        }

        // Search ru/en name city
        if (!search
            || fullName.toLowerCase().includes(search.toLowerCase())
            || fullName.toLowerCase().includes(search.toLowerCase())
        ) {
            // Items
            content.push(
                <Grid key={`expert-${item.id}`} item xl={3} lg={3} md={4} sm={6} xs={12}>
                    <Card color={'primary'} sx={{
                        '& .MuiCardContent-root': {
                            marginBottom: -1
                        },
                        '@media (max-width: 420px)': {
                            '& .MuiCardMedia-root': {
                                height: 375
                            }
                        }
                    }}>
                        <CardMedia
                            sx={{ height: isSM ? 560 : 380 }}
                            image={`${AppConf.apiUrl}${item.image}`}
                            title={fullName}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {fullName}
                            </Typography>

                            <Stack className={'ExpertChips'} spacing={0.5} direction={'row'} sx={{marginTop: 1.6}}>
                                {item.directions.map((direction, index) => (
                                    <Chip key={`cip-${index}`} className={direction.name.replace(' ', '_')} label={direction.name} variant="outlined" />
                                ))}
                            </Stack>

                            <Stack direction={'row'} justifyContent="flex-end" sx={{paddingTop: 2}}>
                                <Button
                                    color='primary'
                                    size="small"
                                    onClick={() => {
                                        route.toLocation(routes.expert, item.id)
                                    }}
                                >
                                    {t('common.t_more')}
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            )
        }
    })

    return (
        <>
        {dataExperts || dataDirections ? (
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
                            label={t('pages.experts.t_filter_search')}
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
                            <InputLabel id="direction-select-label">
                            {t('pages.experts.t_filter_direction')}
                            </InputLabel>
                            <Select
                                labelId="direction-select-label"
                                value={direction}
                                label={t('pages.experts.t_filter_direction')}
                                onChange={(event) => {
                                    setDirection(event.target.value);
                                }}
                            >
                                <MenuItem value="">
                                    <em>{t('common.t_none')}</em>
                                </MenuItem>
                                {dataDirections?.map((direction) => (
                                    <MenuItem key={`cat-${direction.id}`} value={direction.name}>
                                        {direction.name}
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
                            {t('pages.experts.t_not_found')}
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
        ) : (
            <Box sx={{textAlign: 'center', padding: 6}}>
                <CircularProgress />
            </Box>
        )}
        </>
    );
}

BlockExperts.propTypes = {};
