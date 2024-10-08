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
import {Alert} from '@mui/material';
import Typography from '@mui/material/Typography';

export function AlertInfo(props) {
    return (
        <Alert
            style={props.style}
            severity="info"
            sx={{
                color: 'white.main',
                backgroundColor: 'info.main',
                '& .MuiAlert-icon': {
                    color: 'white.main',
                    position: 'relative',
                    top: '2px'
                },
                '& .MuiAlert-icon svg': {
                    color: 'white.main',
                },
            }}
        >
            <Typography gutterBottom variant="text2">
                {props.children}
            </Typography>
        </Alert>
    );
}

AlertInfo.propTypes = {
    children: PropTypes.string.isRequired
};
