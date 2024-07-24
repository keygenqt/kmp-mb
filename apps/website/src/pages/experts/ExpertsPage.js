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
    Shared,
    useHttpQuery,
    PageLoader,
    PageError500,
    ScrollRecovery,
    CacheKeys,
    useCacheStorage
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
import {Star} from '@mui/icons-material';

import {BlockExperts} from './elements/BlockExperts';

export function ExpertsPage(props) {
    const theme = useTheme()
    const isMD = useMediaQuery(theme.breakpoints.down('md'))
    const isSM = useMediaQuery(theme.breakpoints.down('sm'))
    const {t} = React.useContext(LocalizationContext)
    const {route} = React.useContext(RouteContext)

    // Get data
    const experts = useHttpQuery(Shared.queries.experts)
    const directions = useHttpQuery(Shared.queries.directions)

    const headerPage = (
        <Container maxWidth='xl'>
            <Card sx={{padding: isMD ? 2 : 3}}>
                <CardContent>
                    <Stack spacing={isMD ? 2 : 3}>
                        <Stack spacing={2} direction={isSM ? 'column' : 'row'} alignItems={isSM ? 'right' : 'center'}>
                            <Star fontSize="large"/>
                            <Typography variant="h3" component="div">
                                {t('pages.experts.t_title')}
                            </Typography>
                        </Stack>
                        <Typography variant={isMD ? 'text2' : 'text1'} color={'text.primary'}>
                            {t('pages.experts.t_text')}
                        </Typography>
                        <Typography variant={'text1'} color={'text.primary'} sx={{fontWeight: 500}}>
                            {t('pages.experts.t_subtext')}
                        </Typography>
                        <Box>
                            <Button
                                variant='contained'
                                onClick={() => {
                                    route.openUrlNewTab("https://docs.google.com/forms/d/1o-GCn8g4oWgs_-ZML2YijOBzp9yxjJjWwIy_ie6W-ow/viewform?ts=65637ba7&edit_requested=true")
                                }}
                            >
                                {t('pages.experts.t_btn')}
                            </Button>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        </Container>
    );

    // Error get data
    if (experts === null || directions === null) {
        return (
            <PageError500>
                {headerPage}
            </PageError500>
        )
    }

    // Loading get data
    if (experts === undefined || directions === undefined) {
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
                    <BlockExperts
                        experts={experts}
                        directions={directions}
                    />
                </Container>
            </Stack>
        </>
    );
}

ExpertsPage.propTypes = {};
