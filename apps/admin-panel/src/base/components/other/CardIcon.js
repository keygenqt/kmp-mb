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
    Card,
    Typography,
    Stack,
    Box,
} from '@mui/material';

export function CardIcon(props) {
    return (
        <Card>
            <Stack sx={{p: 2}} spacing={2}>
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    spacing={2}
                >
                    <Box sx={{
                        position: 'relative',
                        top: 4
                    }}>
                        {props.icon}
                    </Box>
                    <Stack spacing={1} sx={{marginTop: 2}}>
                        <Typography variant="h5" color={'text.primary'} sx={{whiteSpace: 'pre'}}>
                            {props.title}
                        </Typography>
                        <Typography
                            variant="caption"
                            color={'text.primary'}
                        >
                            {props.desc}
                        </Typography>
                    </Stack>
                </Stack>

                {props.children}
            </Stack>
        </Card>
    );
}

CardIcon.propTypes = {
    icon: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
};
