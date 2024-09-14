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
    Button,
    Stack,
    TextField,
    InputAdornment,
    Avatar,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider,
} from '@mui/material';
import {
    Shared
} from '../../../base'
import {
    Upload,
    Autorenew
} from '@mui/icons-material';

export function TextFieldFile(props) {
    const theme = useTheme()
    const isSM = useMediaQuery(theme.breakpoints.down('sm'))

    const inputRef = React.useRef(null)
    const inputFileRef = React.useRef(null)

    const [showImage, setShowImage] = React.useState(undefined)
    const [isShowImage, setIsShowImage] = React.useState(false)

    /* 0 - default, 1 - loading, 2 - error */
    const [state, setState] = React.useState(0)

    return (
        <>
            <Dialog
                open={isShowImage}
                onClose={() => setIsShowImage(false)}
            >
                <DialogTitle>
                    Image
                </DialogTitle>
                <Divider/>
                <DialogContent>
                    <img style={{
                        maxWidth: 500,
                        maxHeight: 500,
                        borderRadius: 10
                    }} src={showImage} alt="logo"/>
                </DialogContent>
                <Divider/>
                <DialogActions>
                    <Button onClick={() => setIsShowImage(false)}>Close</Button>
                </DialogActions>
            </Dialog>

            <input
                type="file"
                style={{ display: "none" }}
                onChange={async (event) => {
                    if (event.target.files) {
                        setState(1)
                        const file = event.target.files[0]
                        try {
                            const response = (await Shared.httpClient.post.uploads([new Shared.requests.FileRequest(
                                file.name,
                                file.type,
                                new Int8Array(await file.arrayBuffer())
                            )])).toArray()

                            // Emit value change
                            if (response[0]?.fileName && inputRef.current) {
                                inputRef.current.setAttribute('data-id', response[0]?.id)
                                inputRef.current.value = `/api/uploads/${response[0]?.fileName}`
                                inputRef.current._valueTracker.setValue(inputRef.current)
                                inputRef.current.dispatchEvent(new Event("input", { bubbles: true }))
                            }
                            setState(0)
                        } catch (error) {
                            console.error(error)
                            setState(2)
                        }
                    }
                }}
                accept="image/x-png,image/jpg,image/jpeg"
                ref={inputFileRef}
            />
            <Stack
                direction={isSM ? 'column-reverse' : 'row'}
                spacing={2}
                sx={{width: 1}}
            >
                <Button
                    sx={{maxHeight: 57}}
                    variant="outlined"
                    color={state === 2 ? 'error' : 'primary'}
                    onClick={() => {
                        if (inputFileRef.current) {
                            inputFileRef.current?.click();
                        }
                    }}
                >
                    {state === 1 ? ( <Autorenew/> ): ( <Upload/> )}
                </Button>

                <TextField
                    {...props}
                    inputRef={inputRef}
                    required
                    type={'text'}
                    fullWidth
                    variant="filled"
                    inputProps={{
                        'data-id': props.id,
                        readOnly: true,
                    }}
                    InputProps={{
                        autoComplete: 'off',
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton
                                    sx={{p: '2px'}}
                                    onClick={() => {
                                        setShowImage(inputRef.current.value)
                                        setIsShowImage(true)
                                    }}
                                >
                                    <Avatar
                                        alt={'Url image'}
                                        src={props.value}
                                        sx={{ width: 20, height: 20 }}
                                    />
                                </IconButton>
                            </InputAdornment>
                            ),
                    }}
                />
            </Stack>
        </>

    );
}

TextFieldFile.propTypes = {
    dataId: PropTypes.string,
};
