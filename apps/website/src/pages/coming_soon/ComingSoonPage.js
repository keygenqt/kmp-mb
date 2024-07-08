import * as React from 'react';
import Lottie from "lottie-react";
import {DataLottie, LocalizationContext, RouteContext} from '../../base';
import {
    Box,
    Stack,
    Typography,
    Button,
} from '@mui/material';

export function ComingSoonPage(props) {
    const {t} = React.useContext(LocalizationContext)
    const {route, routes} = React.useContext(RouteContext)
    return (
        <Box className={'ContentPage'}>
            <Stack spacing={4}>

                <Typography variant='h2' color={'text.primary'}>
                    {t('pages.coming_soon.t_title')}
                </Typography>

                <Box>
                    <Lottie
                        className={'ComingSoonLottie'}
                        loop={false}
                        animationData={DataLottie.coming_soon}
                    />
                </Box>

                <Typography variant='text1' color={'text.primary'}>
                    {t('pages.coming_soon.t_text')}
                </Typography>

                <Box>
                    <Button
                        variant='contained'
                        onClick={() => {
                            route.toLocation(routes.home)
                        }}
                    >
                        {t('pages.coming_soon.t_btn')}
                    </Button>
                </Box>

            </Stack>
        </Box>
    );
}

ComingSoonPage.propTypes = {};
