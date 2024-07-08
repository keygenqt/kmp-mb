import * as React from 'react';
import PropTypes from 'prop-types';
import {Container, Box} from '@mui/material';

import {Header} from './elements/Header';
import {Footer} from './elements/Footer';


export function BaseLayout(props) {
    return (
        <>
            <Box className={'Table-Row'}>
                <Box className={'Table-Cell Header'} sx={{height: '1px'}}>
                    <Header/>
                </Box>
            </Box>
            <Box className={'Table-Row'}>
                <Box className={'Table-Cell'} sx={{paddingTop: 6, paddingBottom: 6}}>
                    <Container maxWidth='lg'>
                        {props.children}
                    </Container>
                </Box>
            </Box>
            <Box className={'Table-Row'} sx={{height: '1px'}}>
                <Box className={'Table-Cell'}>
                    <Footer/>
                </Box>
            </Box>
        </>
    )
}

BaseLayout.propTypes = {
    children: PropTypes.element.isRequired,
    isCenter: PropTypes.bool,
};
