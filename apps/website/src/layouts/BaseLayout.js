import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme, useMediaQuery, Box} from '@mui/material';

import {Header} from './elements/Header';
import {Footer} from './elements/Footer';


export function BaseLayout(props) {
    const theme = useTheme()
    const isMD = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <>
            <Box className={'Table-Row'}>
                <Box className={'Table-Cell Header'} sx={{height: '1px'}}>
                    <Header/>
                </Box>
            </Box>
            <Box className={'Table-Row'}>
                <Box className={'Table-Cell ' + props.className} sx={{
                    paddingTop: isMD ? 4 : 6,
                    paddingBottom: isMD ? 4 : 6,
                    verticalAlign: props.isCenter === true ? 'middle' : 'top'
                    }}
                >
                    {props.children}
                </Box>
            </Box>
            <Box className={'Table-Row'} sx={{height: '1px'}}>
                <Box className={'Table-Cell Footer'}>
                    <Footer/>
                </Box>
            </Box>
        </>
    )
}

BaseLayout.propTypes = {
    children: PropTypes.element.isRequired,
    className: PropTypes.string.isRequired,
    isCenter: PropTypes.bool,
};
