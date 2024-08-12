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
import {Formik} from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    CircularProgress,
    FormGroup,
    Stack,
    TextField,
    Card,
    Typography,
    InputAdornment,
    IconButton,
    FilledInput,
    FormControl,
    InputLabel,
    FormHelperText,
} from "@mui/material";
import {
    AlertError,
    AlertSuccess,
    Helper,
    Shared,
    DataImages,
    CacheKeys,
    CacheStorage,
} from '../../../base';
import {
    DoneOutlined,
    VisibilityOff,
    Visibility,
} from "@mui/icons-material";


export function FormLogin(props) {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <Formik
            initialValues={{
                lname: '',
                password: '',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                lname: Yup
                    .string()
                    .min(3, 'Size must be between 3 and 250.')
                    .max(250, 'Size must be between 3 and 250.')
                    .required('Must not be null and not blank.'),
                password: Yup
                    .string()
                    .min(8, 'Size must be between 8 and 12.')
                    .max(12, 'Size must be between 8 and 12.')
                    .required('Must not be null and not blank.'),
            })}
            onSubmit={async (values, {setErrors, setStatus, resetForm}) => {
                setStatus({success: null});
                setErrors({submit: null});

                // Loading for animation
                await new Promise(r => setTimeout(r, 500));

                try {
                    const response = await Shared.httpClient.post.authJwt(new Shared.requests.AuthJwtRequest(
                        values.lname,
                        values.password,
                    ))

                    if (response.code === 200) {
                        resetForm();
                        setStatus({success: true});
                    } else if (response.code === 422 && response.validates !== null) {
                        setErrors({
                            lname: Helper.findError('lname', response),
                            password: Helper.findError('password', response),
                        });
                    } else {
                        setErrors({
                            submit: 'Incorrect login or password.'
                        });
                    }

                    // Loading for animation
                    await new Promise(r => setTimeout(r, 1000));

                    // Save session roles
                    if (response.code === 200) {
                        const response = await Shared.httpClient.get.authRoles()
                        CacheStorage.set(CacheKeys.userRoles, response.roles?.mapToUserRoles())
                    }
                } catch (e) {
                    setErrors({
                        submit: 'Server error, please try again later.'
                    });
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
                    <FormGroup
                        sx={{
                            width: 1,
                            maxWidth: 480,
                            m: '0 auto',
                            '& .Logo': {
                                width: 100,
                                m: '0 auto',
                            }
                        }}
                    >
                        <Box id={'FormId'}>
                            <Card>
                                <Stack
                                    spacing={3}
                                    sx={{ p: 4}}
                                >

                                    <img className='Logo' src={DataImages.logo} alt='logo'/>

                                    <Stack spacing={1} sx={{textAlign: 'center'}}>
                                        <Typography variant="h3" color={'text.primary'}>
                                            Welcome!
                                        </Typography>
                                        <Typography variant="caption" color={'text.primary'}>
                                            To log in, please enter your last name (ru) and the password you received from the administrator.
                                        </Typography>
                                    </Stack>

                                    {errors.submit && (
                                        <AlertError onClose={() => setErrors({submit: null})}>
                                            {errors.submit}
                                        </AlertError>
                                    )}

                                    {status && status.success && (
                                        <AlertSuccess onClose={() => setStatus({success: false})}>
                                            Authorization was successful
                                        </AlertSuccess>
                                    )}

                                    <TextField
                                        disabled={isSubmitting || (status && status.success)}
                                        required
                                        type={'text'}
                                        name={'lname'}
                                        value={values.lname}
                                        helperText={touched.lname && errors.lname ? errors.lname : ''}
                                        error={Boolean(touched.lname && errors.lname)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        label={'Last name'}
                                        variant="filled"
                                    />

                                    <FormControl
                                        disabled={isSubmitting || (status && status.success)}
                                        error={Boolean(touched.password && errors.password)}
                                        fullWidth
                                        variant="filled">

                                        <InputLabel required>Password</InputLabel>

                                        <FilledInput
                                            required
                                            type={showPassword ? 'text' : 'password'}
                                            name={'password'}
                                            value={values.password}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            fullWidth
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="Password visibility"
                                                        onClick={() => {
                                                            setShowPassword(!showPassword)
                                                        }}
                                                        onMouseDown={() => {
                                                            setShowPassword(false)
                                                        }}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff/> :  <Visibility/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />

                                        {touched.password && errors.password && (
                                            <FormHelperText error>
                                                {errors.password}
                                            </FormHelperText>
                                        )}
                                    </FormControl>

                                    <Button
                                        fullWidth
                                        type={'submit'}
                                        variant={'contained'}
                                        size={'large'}
                                        disabled={Boolean(isSubmitting || (status && status.success) || Object.keys(errors).length !== 0 || Object.keys(touched).length === 0)}
                                        startIcon={isSubmitting ? (
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
                            </Card>
                        </Box>
                    </FormGroup>
                </form>
            )}
        </Formik>
    );
}

FormLogin.propTypes = {};
