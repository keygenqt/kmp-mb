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

import * as React from "react";
import {Alert, Collapse, IconButton} from "@mui/material";
import {Close} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

export function AlertSuccess(props) {

    const {
        onClose
    } = props

    const [collapse, setCollapse] = React.useState(true);

    return (
        <Collapse in={collapse}>
            <Alert
                style={props.style}
                severity="success"
                sx={{
                    color: 'white.main',
                    backgroundColor: 'success.main',
                    borderRadius: 1,
                    '& .MuiAlert-icon': {
                        color: 'white.main',
                        position: 'relative',
                        top: '2px'
                    },
                    '& .MuiButtonBase-root': {
                        color: 'white.main',
                        position: 'relative',
                        top: '2px'
                    }
                }}
                action={
                    <IconButton
                        aria-label="close"
                        color="white.main"
                        size="small"
                        onClick={() => {
                            setCollapse(false);
                            setTimeout(() => onClose(), 200)
                        }}
                    >
                        <Close fontSize="inherit"/>
                    </IconButton>
                }
            >
                <Typography gutterBottom variant="text2">
                    {props.children}
                </Typography>
            </Alert>
        </Collapse>
    );
}

AlertSuccess.propTypes = {
    style: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.string.isRequired
};
