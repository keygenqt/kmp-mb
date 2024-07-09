import * as React from 'react';
import {useTheme, useMediaQuery, Stack, Container} from '@mui/material';
import {BlockAbout} from './elements/BlockAbout';
import {BlockCards} from './elements/BlockCards';
import {BlockImages} from './elements/BlockImages';
import {BlockPartners} from './elements/BlockPartners';


export function HomePage(props) {
    const theme = useTheme()
    const isMD = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Stack
        spacing={isMD ? 4 : 6}
        className={'ContentPage'}
        alignItems="center"
        >
            <Container maxWidth='xl'>
                <BlockAbout/>
            </Container>
            <Container maxWidth='lg'>
                <BlockCards/>
            </Container>
            <Container maxWidth='lg'>
                <BlockImages/>
            </Container>
            <Container maxWidth='lg'>
                <BlockPartners/>
            </Container>
        </Stack>

    );
}


HomePage.propTypes = {};
