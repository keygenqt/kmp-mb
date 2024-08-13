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
import {
    Grid,
    Card,
    Box,
} from '@mui/material';
import {
    CardCount
} from '../../base'
import {
    Home,
    Apartment,
    Star,
    AppRegistration,
} from '@mui/icons-material';

export function DashboardPage(props) {
    return (
        <Box sx={{width: 1}}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
                    <CardCount
                        icon={<Home/>}
                        title={'Main page\nviews'}
                        desc={'Number of views of the main page of the website.'}
                    >
                        {humanNumber(100)}
                    </CardCount>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
                    <CardCount
                        icon={<Apartment/>}
                        title={'Community\nviews'}
                        desc={'Number of views of the community page of the website.'}
                    >
                        {humanNumber(1111)}
                    </CardCount>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
                    <CardCount
                        icon={<Star/>}
                        title={'Experts\nviews'}
                        desc={'Number of views of the experts page of the website.'}
                    >
                        {humanNumber(20000)}
                    </CardCount>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
                    <CardCount
                        icon={<AppRegistration/>}
                        title={'Registrations\nviews'}
                        desc={'Number of views of the registrations page of the website.'}
                    >
                        {humanNumber(100000)}
                    </CardCount>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={8}>
                    <Card>Chart</Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <Card>Top</Card>
                </Grid>
            </Grid>
        </Box>
    );
}

DashboardPage.propTypes = {};
