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
import humanNumber from 'human-number';
import ReactApexChart from 'react-apexcharts';
import {
    useTheme,
    useMediaQuery,
    Grid,
    Box,
    Stack,
    Typography,
    CardHeader,
    Avatar,
    Card,
    CardActionArea,
} from '@mui/material';
import {
    useHttpQuery,
    useCacheStorage,
    CacheKeys,
    Shared,
    CardCount,
    CardIcon,
    RouteContext,
} from '../../base'
import {
    Home,
    Apartment,
    Star,
    AppRegistration,
    BarChart,
    TrendingUp,
} from '@mui/icons-material';

export function DashboardPage(props) {

    const {palette, breakpoints} = useTheme();
    const {route} = React.useContext(RouteContext)
    const isMD = useMediaQuery(breakpoints.down('md'))
    const darkMode = useCacheStorage(CacheKeys.darkMode, false, false)

    const countPageViewHome = useHttpQuery(Shared.queries.countPageViewHome)
    const countPageViewCommunity = useHttpQuery(Shared.queries.countPageViewCommunity)
    const countPageViewExperts = useHttpQuery(Shared.queries.countPageViewExperts)
    const countPageViewRegs = useHttpQuery(Shared.queries.countPageViewRegs)
    const topCommunity = useHttpQuery(Shared.queries.topCommunity)
    const countPageViewActivity = useHttpQuery(Shared.queries.countPageViewActivity)

    return (
        <Box sx={{width: 1}}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
                    <CardCount
                        icon={<Home/>}
                        title={'Main page\nviews'}
                        desc={'Number of views of the main page of the website.'}
                    >
                        {countPageViewHome ? humanNumber(countPageViewHome['value']) : '∞'}
                    </CardCount>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
                    <CardCount
                        icon={<Apartment/>}
                        title={'Community\nviews'}
                        desc={'Number of views of the community page of the website.'}
                    >
                        {countPageViewCommunity ? humanNumber(countPageViewCommunity['value']) : '∞'}
                    </CardCount>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
                    <CardCount
                        icon={<Star/>}
                        title={'Experts\nviews'}
                        desc={'Number of views of the experts page of the website.'}
                    >
                        {countPageViewExperts ? humanNumber(countPageViewExperts['value']) : '∞'}
                    </CardCount>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
                    <CardCount
                        icon={<AppRegistration/>}
                        title={'Registrations\nviews'}
                        desc={'Number of views of the registrations page of the website.'}
                    >
                        {countPageViewRegs ? humanNumber(countPageViewRegs['value']) : '∞'}
                    </CardCount>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={8}>
                    <CardIcon
                        icon={<BarChart/>}
                        title={'Website activity'}
                        desc={'Site activity based on views by month.'}
                    >
                        <ReactApexChart
                            type="area"
                            height={isMD ? 300 : 480}
                            options={{
                                chart: {
                                    height: isMD ? 300 : 480,
                                    type: 'area',
                                    toolbar: {
                                        show: false
                                    }
                                },
                                dataLabels: {
                                    enabled: false
                                },
                                stroke: {
                                    curve: 'smooth'
                                },
                                xaxis: {
                                    type: 'category',
                                    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                                },
                            }}
                            series={[{
                                color: palette.primary.main,
                                name: 'Views',
                                data: countPageViewActivity ? countPageViewActivity.values.map((e) => e.value) : []
                            }]}
                        />
                    </CardIcon>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <CardIcon
                        icon={<TrendingUp/>}
                        title={'Top community'}
                        desc={'Top visited cities of communities on the website.'}
                    >
                        <Stack
                            spacing={2}
                            direction="column"
                            justifyContent={topCommunity?.toArray()?.length > 0 ? 'flex-start' : 'center'}
                            alignItems="center"
                            sx={{
                                minHeight: isMD ? 0 : 494,
                                '& .MuiAvatar-root': {
                                    height: 50,
                                    width: 50,
                                },
                                '& .MuiCardHeader-title': {
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    lineHeight: '1.2',
                                    fontFamily: [
                                        'Jura',
                                        'sans-serif',
                                    ].join(','),
                                    textOverflow: 'ellipsis',
                                    noWrap: true,
                                    overflow: 'hidden',
                                },
                                '& .MuiCardHeader-content': {
                                    display: 'block',
                                    overflow: 'hidden',
                                },
                            }
                        }>
                            {topCommunity ? (
                                topCommunity.toArray().length === 0 ? (
                                    <Typography variant="h5" color={'text.primary'}>
                                        Not found.
                                    </Typography>
                                ) : (
                                    topCommunity.toArray()?.map((city) => (
                                        <Card key={`city-${city.id}`} sx={{
                                            width: 1,
                                            bgcolor: '#d9d9d91a'
                                        }}>
                                            <CardActionArea
                                                onClick={() => route.openUrlNewTab(`https://mb.keygenqt.com/city/${city.id}`)}
                                            >
                                                <CardHeader
                                                    avatar={
                                                        <Avatar
                                                            src={city.image}
                                                            aria-label="City"
                                                        >
                                                            {city.name[0]}
                                                        </Avatar>
                                                    }
                                                    title={city.name}
                                                    subheader={`${city.viewCount} visits per city page.`}
                                                />
                                            </CardActionArea>
                                        </Card>
                                    ))
                                )
                            ) : (
                                <Typography variant="h5" color={'text.primary'}>
                                    Loading...
                                </Typography>
                            )}
                        </Stack>
                    </CardIcon>
                </Grid>
            </Grid>
        </Box>
    );
}

DashboardPage.propTypes = {};
