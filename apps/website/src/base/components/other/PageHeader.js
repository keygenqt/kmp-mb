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
import PropTypes from 'prop-types';
import {
    useTheme,
    useMediaQuery,
    Container,
    Stack,
    Card,
    CardContent,
} from '@mui/material';

export function PageHeader(props) {
    const theme = useTheme()
    const isMD = useMediaQuery(theme.breakpoints.down('md'))
    return (
        <Container maxWidth='xl'>
            <Card sx={{padding: isMD ? 2 : 3}}>
                <CardContent>
                    <Stack spacing={isMD ? 2 : 3}>
                        {props.children}
                    </Stack>
                </CardContent>
            </Card>
        </Container>
    );
}

PageHeader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]).isRequired
};
