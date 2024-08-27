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
import {Formik} from 'formik';
import {
    Box,
    Button,
    CircularProgress,
    FormGroup,
    Stack,
    TextField,
    MenuItem,
} from "@mui/material";
import {
    AlertError,
    AlertSuccess,
    Helper,
    Shared,
    CacheStorage,
    CacheKeys,
} from '../../../base';
import {
    DoneOutlined,
} from "@mui/icons-material";


export function RegPartnerForm(props) {
    const roles = CacheStorage.get(CacheKeys.userRoles)
    const isAdmin = roles?.includes('ADMIN')

    // Update model ids relations from db
    const [model, setModel] = React.useState(props.model)

    return (
        <Formik
            initialValues={{
                note: model?.note ?? '',
                state: model?.state.name ?? '',
                submit: null,
            }}
            onSubmit={async (values, {setErrors, setStatus, setFieldValue}) => {
                setStatus({success: null});
                setErrors({submit: null});

                // Loading for animation
                await new Promise(r => setTimeout(r, 500));

                try {
                    const response = await Shared.httpClient.put.editRegPartner(props.id, new Shared.requests.RegPartnerEditRequest(
                        values.note,
                        Shared.RegPartnerState.valueOf(values.state),
                    ))
                    setModel(response)
                    setStatus({success: true});
                } catch (error) {
                    if (error.code === 422 && error.validates !== null) {
                        setErrors({
                            note: Helper.findError('note', error),
                            state: Helper.findError('state', error),
                        });
                    } else {
                        setErrors({
                            submit: error.message ?? 'Error with empty message'
                        });
                    }
                }
            }}
        >
            {({
                status,
                errors,
                touched,
                values,
                isSubmitting,
                setStatus,
                setErrors,
                handleBlur,
                handleChange,
                handleSubmit,
            }) => (
                <form style={{width: '100%'}} noValidate onSubmit={handleSubmit}>
                    <FormGroup>
                        <Box id={'FormId'}>
                            <Stack spacing={2} >

                                {errors.submit && (
                                    <AlertError onClose={() => setErrors({})}>
                                        {errors.submit}
                                    </AlertError>
                                )}

                                {status && status.success && (
                                    <AlertSuccess onClose={() => setStatus({success: false})}>
                                        Update registration successfully.
                                    </AlertSuccess>
                                )}

                                <TextField
                                    disabled={isSubmitting || (!isAdmin && props.id === undefined)}
                                    required
                                    type={'text'}
                                    name={'note'}
                                    value={values.note}
                                    helperText={touched.note && errors.note ? errors.note : ''}
                                    error={Boolean(touched.note && errors.note)}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    fullWidth
                                    label={'Note'}
                                    variant="filled"
                                    inputProps={{ autoComplete: 'off' }}
                                    multiline
                                    minRows={4}
                                    maxRows={15}
                                />

                                <TextField
                                    disabled={isSubmitting || (!isAdmin && props.id === undefined)}
                                    required
                                    type={'text'}
                                    name={'state'}
                                    value={values.state}
                                    helperText={touched.note && errors.note ? errors.note : ''}
                                    error={Boolean(touched.state && errors.state)}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    fullWidth
                                    label={'State'}
                                    variant="filled"
                                    select
                                >
                                    {Shared.RegPartnerStates?.map((item) => (
                                        <MenuItem key={`state-${item.name}`} value={item.name}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <Stack direction={'row'} spacing={2}>
                                    <Box sx={{ flexGrow: 1 }}/>

                                    <Button
                                        type={'submit'}
                                        variant={'contained'}
                                        size={'large'}
                                        disabled={
                                            Boolean(isSubmitting || Object.keys(errors).length !== 0)
                                        }
                                        startIcon={isSubmitting && !errors.submit ? (
                                            <CircularProgress sx={{
                                                mr: 0.5,
                                                height: '18px !important',
                                                width: '18px !important'
                                            }}/>
                                        ) : (
                                            <DoneOutlined color={'text.primary'} sx={{height: 18}}/>
                                        )}
                                    >
                                        Submit
                                    </Button>
                                </Stack>
                            </Stack>
                        </Box>
                    </FormGroup>
                </form>
            )}
        </Formik>
    );
}

RegPartnerForm.propTypes = {
    id: PropTypes.string,
    model: PropTypes.object,
};
