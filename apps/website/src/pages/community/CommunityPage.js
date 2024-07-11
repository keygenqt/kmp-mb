import * as React from 'react';
import {LocalizationContext, RouteContext} from '../../base';
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

    return (
        <Stack
            spacing={isMD ? 4 : 6}
            className={'ContentPage'}
            alignItems="center"
        >
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
            <Container maxWidth='lg'>
                <BlockCities/>
            </Container>
        </Stack>
    );
}

CommunityPage.propTypes = {};
