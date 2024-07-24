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
    LocalizationContext,
    RouteContext,
    useHttpQuery,
    Shared,
    PageError500,
    PageLoader,
    ScrollRecovery,
    CacheKeys,
    CacheStorage,
    useCacheStorage,
} from '../../base';
import {
    useTheme,
    useMediaQuery,
    Container,
    Box,
    Stack,
    Card,
    CardContent,
    Typography,
    Button,
} from '@mui/material';
import {Group} from '@mui/icons-material';

import {BlockCities} from './elements/BlockCities';

export function CommunityPage(props) {
    const theme = useTheme()
    const isMD = useMediaQuery(theme.breakpoints.down('md'))
    const isSM = useMediaQuery(theme.breakpoints.down('sm'))
    const {t} = React.useContext(LocalizationContext)
    const {route} = React.useContext(RouteContext)

    // Get data
    const cities = useHttpQuery(Shared.queries.cities)
    const countries = useHttpQuery(Shared.queries.countries)

    const headerPage = (
        <Container maxWidth='xl'>
            <Card sx={{padding: isMD ? 2 : 3}}>
                <CardContent>
                    <Stack spacing={isMD ? 2 : 3}>
                        <Stack spacing={2} direction={isSM ? 'column' : 'row'} alignItems={isSM ? 'right' : 'center'}>
                            <Group fontSize="large"/>
                            <Typography variant="h3" component="div">
                                {t('pages.community.t_title')}
                            </Typography>
                        </Stack>
                        <Typography variant={isMD ? 'text2' : 'text1'} color={'text.primary'}>
                            {t('pages.community.t_text')}
                        </Typography>
                        <Typography variant={'text1'} color={'text.primary'} sx={{fontWeight: 500}}>
                            {t('pages.community.t_subtext')}
                        </Typography>
                        <Box>
                            <Button
                                variant='contained'
                                onClick={() => {
                                    route.openUrlNewTab("https://docs.google.com/forms/d/1Oqt0y2dgP9NjVqxW3CBEaIWEPlZPKW1NmPHu_BuKYVA/viewform?edit_requested=true")
                                }}
                            >
                                {t('pages.community.t_btn')}
                            </Button>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        </Container>
    );

    // Error get data
    if (cities === null || countries === null) {
        return (
            <PageError500>
                {headerPage}
            </PageError500>
        )
    }

    // Loading get data
    if (cities === undefined || countries === undefined) {
        return (
            <PageLoader>
                {headerPage}
            </PageLoader>
        )
    }

    return (
        <>
            <ScrollRecovery/>
            <Stack
                spacing={isMD ? 4 : 6}
                className={'ContentPage'}
                alignItems="center"
            >
                {headerPage}
                <Container maxWidth='lg'>
                    <BlockCities
                        cities={cities}
                        countries={countries}
                    />
                </Container>
            </Stack>
        </>

    );
}

CommunityPage.propTypes = {};
