import * as React from 'react';
import {DataImages} from '../../../base';
import {
    useTheme,
    useMediaQuery,
    Box,
} from '@mui/material';
import Carousel from 'react-material-ui-carousel'


export function BlockCarousel(props) {
    const theme = useTheme()
    const isLG = useMediaQuery(theme.breakpoints.up('lg'))
    const isDownSM = useMediaQuery(theme.breakpoints.down('sm'))

    const content = []
    DataImages.home.slider.slice().reverse().forEach((item, index) => {
        content.push(
            <Box className={'Carousel-Item'} sx={{backgroundImage: `url("${item}")`}} key={`slider-${index}`}/>
        )
    })

    return (
        <Box className={'BlockCarousel'}>
            <Carousel
                changeOnFirstRender={true}
                height={isLG ? 550 : isDownSM ? 250 : 400}
                index={0}
                autoPlay={true}
                swipe={false}
                navButtonsAlwaysVisible={true}
            >
                {content}
            </Carousel>
        </Box>
    );
}

BlockCarousel.propTypes = {};