import * as React from 'react';
import Lottie from "lottie-react";
import {LocalizationContext, RouteContext, DataLottie} from '../../../base';
import {
    Box,
    Stack,
    Typography,
    Button,
} from '@mui/material';


export function BlockPartners(props) {
    const {t} = React.useContext(LocalizationContext)
    const {route} = React.useContext(RouteContext)

    return (
        <Box className={'BlockPartners'} sx={{textAlign: 'center'}}>
            <Stack spacing={2}>
                <Typography variant='h3' color={'text.primary'}>
                    {t('pages.home.t_BlockPartners_title')}
                </Typography>

                <Typography variant='text1' color={'text.primary'}>
                    {t('pages.home.t_BlockPartners_text')}
                </Typography>

                <Box>
                    <Lottie
                        className={'LaptopLottie'}
                        animationData={DataLottie.laptop}
                    />
                </Box>

                <Box>
                    <Button
                        variant='contained'
                        onClick={() => {
                            route.openUrlNewTab('https://docs.google.com/forms/d/e/1FAIpQLScfD4eQ1IIWhBSXZr87dorYbW-Em9Z8wTpD2UEEQxjVj-eZ0w/viewform')
                        }}
                    >
                        {t('pages.home.t_BlockPartners_btn')}
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
}

BlockPartners.propTypes = {};
