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
    useStatisticView,
    PageLoader,
    PageError500,
    PageHeader,
    ScrollRecovery,
} from '../../base';
import {
    useTheme,
    useMediaQuery,
    Container,
    Box,
    Stack,
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
    const {route, routes} = React.useContext(RouteContext)

    // Send view
    useStatisticView(Shared.pageKey.EXPERTS)

    // Get data
    const experts = useHttpQuery(Shared.queries.experts)
    const directions = useHttpQuery(Shared.queries.directions)

    const pageHeader = (
        <PageHeader>
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
                        route.toLocation(routes.registrationExpert)
                    }}
                >
                    {t('pages.experts.t_btn')}
                </Button>
            </Box>
        </PageHeader>
    )

    // Error get data
    if (experts === null || directions === null) {
        return (
            <PageError500>
                {pageHeader}
            </PageError500>
        )
    }

    // Loading get data
    if (experts === undefined || directions === undefined) {
        return (
            <PageLoader>
                {pageHeader}
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
                {pageHeader}
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
