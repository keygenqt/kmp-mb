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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';

export function DialogRemove(props) {
    return (
        <Dialog
            open={props.isOpen}
            onClose={() => {}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Do you wish to delete the data?
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                The data will be permanently deleted if there are no links or other deletion restrictions in the database.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={props.onClickDisagree}>Disagree</Button>
            <Button onClick={props.onClickAgree}>
                Agree
            </Button>
            </DialogActions>
        </Dialog>
    );
}

DialogRemove.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClickAgree: PropTypes.func.isRequired,
    onClickDisagree: PropTypes.func.isRequired,
};
