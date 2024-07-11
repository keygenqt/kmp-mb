import * as React from 'react';
import {SouthEast} from '@mui/icons-material';
import {LocalizationContext, RouteContext, DataImages} from '../../../base';
import {
    useTheme,
    useMediaQuery,
    Box,
    Stack,
    Card,
    CardActionArea,
    CardContent,
    Typography,
} from '@mui/material';

const ItemActiveCard = [
    {
        id: 1,
        title: 'pages.home.t_BlockCards_item1_title',
        text: 'pages.home.t_BlockCards_item1_text',
        link: 'https://docs.google.com/forms/d/1Oqt0y2dgP9NjVqxW3CBEaIWEPlZPKW1NmPHu_BuKYVA/viewform?edit_requested=true'
    },
    {
        id: 2,
        title: 'pages.home.t_BlockCards_item2_title',
        text: 'pages.home.t_BlockCards_item2_text',
        link: 'community'
    },
];

export function BlockCards(props) {
    const {t} = React.useContext(LocalizationContext)
    const {route, routes} = React.useContext(RouteContext)
    const theme = useTheme()
    const isMD = useMediaQuery(theme.breakpoints.down('md'))

    const content = []
    ItemActiveCard.forEach((item) => {
        content.push(
            <Card key={item.id} sx={{ maxWidth: isMD ? 'auto' : 350 }}>
                <CardActionArea
                    sx={{padding: 2}}
                    onClick={() => {
                        if (item.link.includes('http')) {
                            route.openUrlNewTab(item.link)
                        } else {
                            route.toLocation(routes[item.link])
                        }
                    }}
                >
                    <CardContent>
                        <Stack spacing={isMD ? 2 : 3}>
                            <Typography variant="h3" component="div">
                                {t(item.title)}
                            </Typography>
                            <Typography variant='text1' color={'text.primary'}>
                                {t(item.text)}
                            </Typography>
                            <Box>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <img className='MuiCardHoverShow Logo' src={DataImages.common.logo} alt='Logo' />
                                    <SouthEast fontSize="large"/>
                                </Stack>
                            </Box>
                        </Stack>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    })

    return (
        <Box className={'BlockCards'}>
            <Stack spacing={isMD ? 3 : 6} direction={isMD ? 'column' : 'row'}>
                {content}
            </Stack>
        </Box>
    );
}

BlockCards.propTypes = {};
