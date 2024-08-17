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
import * as Yup from 'yup';
import {
    Box,
    Button,
    CircularProgress,
    FormGroup,
    Stack,
    TextField,
} from "@mui/material";
import {
    AlertError,
    AlertSuccess,
    Helper,
    Shared,
    RouteContext,
    CacheStorage,
    CacheKeys,
} from '../../../base';
import {
    DoneOutlined,
} from "@mui/icons-material";


export function FormCountry(props) {
    const {route, routes} = React.useContext(RouteContext)
    const [isFormChange, setIsFormChange] = React.useState(false)

    return (
        <Formik
            initialValues={{
                name: props.model?.name ?? '',
                submit: null,
                isRedirect: CacheStorage.get(CacheKeys.redirectCreateCountry)
            }}
            validationSchema={Yup.object().shape({
                name: Yup
                    .string()
                    .min(3, 'Size must be between 3 and 250.')
                    .max(250, 'Size must be between 3 and 250.')
                    .required('Must not be null and not blank.'),
            })}
            validate={() => {
                setIsFormChange(true)
            }}
            onSubmit={async (values, {setErrors, setStatus, setFieldValue}) => {
                setFieldValue('isRedirect', false)
                setStatus({success: null});
                setErrors({submit: null});

                // Loading for animation
                await new Promise(r => setTimeout(r, 500));

                try {
                    const response = Boolean(props.id) ? (
                        await Shared.httpClient.put.editCountry(props.id, new Shared.requests.CountryRequest(
                            values.name,
                            []
                        ))
                    ) : (
                        await Shared.httpClient.post.addCountry(new Shared.requests.CountryRequest(
                            values.name,
                            []
                        ))
                    )
                    if (!Boolean(props.id)) {
                        CacheStorage.set(CacheKeys.redirectCreateCountry, true, true, true)
                        route.toLocationReplace(routes.countryEdit, response.id)
                    } else {
                        setFieldValue('name', response.name)
                        setStatus({success: true});
                    }
                } catch (error) {
                    if (error.code === 422 && error.validates !== null) {
                        setErrors({
                            name: Helper.findError('name', error),
                        });
                    } else {
                        setErrors({
                            submit: 'Server error, please try again later.'
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
                                    <AlertError onClose={() => setErrors({submit: null})}>
                                        {errors.submit}
                                    </AlertError>
                                )}

                                {values.isRedirect && (
                                    <AlertSuccess onClear={() => {
                                        CacheStorage.set(CacheKeys.redirectCreateCountry, false, true, true)
                                    }}>
                                        Create country successfully.
                                    </AlertSuccess>
                                )}

                                {status && status.success && (
                                    <AlertSuccess onClose={() => setStatus({success: false})}>
                                        Update country successfully.
                                    </AlertSuccess>
                                )}

                                <TextField
                                    disabled={isSubmitting}
                                    required
                                    type={'text'}
                                    name={'name'}
                                    value={values.name}
                                    helperText={touched.name && errors.name ? errors.name : ''}
                                    error={Boolean(touched.name && errors.name)}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    fullWidth
                                    label={'Last name'}
                                    variant="filled"
                                />

                                <Stack direction={'row'}>
                                    <Box sx={{ flexGrow: 1 }}/>
                                    <Box>
                                        <Button
                                            fullWidth
                                            type={'submit'}
                                            variant={'contained'}
                                            size={'large'}
                                            disabled={
                                                Boolean(isSubmitting
                                                    || (props.id === undefined && !isFormChange)
                                                    || Object.keys(errors).length !== 0)
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
                                    </Box>
                                </Stack>
                            </Stack>
                        </Box>
                    </FormGroup>
                </form>
            )}
        </Formik>
    );
}

FormCountry.propTypes = {
    id: PropTypes.string,
    model: PropTypes.object,
};
