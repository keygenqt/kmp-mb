import * as React from 'react';
import Lottie from "lottie-react";
import {DataLottie, LocalizationContext, RouteContext} from '../../base';
import {
    Box,
    Stack,
    Typography,
    Button,
} from '@mui/material';

export function ErrorPage(props) {
    const {t} = React.useContext(LocalizationContext)
    const {route, routes} = React.useContext(RouteContext)
    return (
        <Box className={'ContentPage'}>
            <Stack spacing={4}>

                <Typography variant='h2' color={'text.primary'}>
                    {t('pages.error.t_title')}
                </Typography>

                <Box>
                    <Lottie
                        className={'ErrorLottie'}
                        loop={false}
                        animationData={DataLottie.error_404}
                    />
                </Box>

                <Typography variant='text1' color={'text.primary'}>
                    {t('pages.error.t_text')}
                </Typography>

                <Box>
                    <Button
                        variant='contained'
                        onClick={() => {
                            route.toLocation(routes.home)
                        }}
                    >
                        {t('pages.error.t_btn')}
                    </Button>
                </Box>

            </Stack>
        </Box>
    );
}

ErrorPage.propTypes = {};