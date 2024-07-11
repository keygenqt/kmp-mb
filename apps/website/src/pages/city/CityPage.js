import * as React from 'react';
import {useParams} from "react-router";
import {
    useTheme,
    useMediaQuery,
    Stack,
    Container,
} from '@mui/material';

import {DataCities} from '../../base/data/DataCities';
import {BlockInfo} from './elements/BlockInfo'
import {BlockCarousel} from './elements/BlockCarousel'
import {BlockOrganizers} from './elements/BlockOrganizers'
import {ErrorPage} from "../";

export function CityPage(props) {
    let {id} = useParams();
    const [data] = React.useState(DataCities.find(x => x.id === parseInt(id)))
    const theme = useTheme()
    const isMD = useMediaQuery(theme.breakpoints.down('md'))

    if (!data) {
        return (
            <ErrorPage/>
        )
    }

    return (
        <Stack
            spacing={isMD ? 4 : 6}
            className={'ContentPage'}
            alignItems="center"
        >
            <Container maxWidth='xl'>
                <BlockInfo city={data}/>
            </Container>
            {data.images.length === 0 ? null : (
                <Container maxWidth='lg'>
                    <BlockCarousel images={data.images}/>
                </Container>
            )}
            {data.organizers.length === 0 ? null : (
                <Container maxWidth='lg'>
                    <BlockOrganizers organizers={data.organizers}/>
                </Container>
            )}
        </Stack>
    );
}

CityPage.propTypes = {};
