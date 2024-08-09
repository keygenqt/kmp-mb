/**
 * Copyright 2024 Vitaliy Zarubin
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from 'react';
import {
    Box,
    Stack,
    Button,
    Typography,
} from '@mui/material';
import {
    Add,
} from '@mui/icons-material';
import {
    RouteContext,
} from '../../base';

export function DirectionsPage(props) {
    const {route, routes} = React.useContext(RouteContext)
    return (
        <Stack spacing={2} direction="row" sx={{width: 1}}>
            <Typography variant="h4" color={'text.primary'}>
                Directions
            </Typography>
            <Box sx={{ flexGrow: 1 }}/>
            <Button
                variant="contained"
                color='white'
                endIcon={<Add color='text.primary' />}
                onClick={() => {
                    route.toLocation(routes.direction)
                }}
            >
                Add
            </Button>
        </Stack>
    );
}

DirectionsPage.propTypes = {};
