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
    useMediaQuery,
    useTheme,
    Box,
    Button,
    CircularProgress,
    FormGroup,
    Stack,
    TextField,
    Card,
    Typography,
} from "@mui/material";
import {
    AlertError,
    AlertSuccess,
    LocalizationContext,
    Helper,
    Shared,
    YupLocalization
} from '../../../base';
import {
    DoneOutlined,
} from "@mui/icons-material";


export function FormPartner(props) {
    const theme = useTheme()
    const isMD = useMediaQuery(theme.breakpoints.down('md'));
    const isSM = useMediaQuery(theme.breakpoints.down('sm'));
    const {t} = React.useContext(LocalizationContext)

    return (
        <Formik
            initialValues={{
                company: '',
                fname: '',
                lname: '',
                email: '',
                telegram: '',
                phone: '',
                format: '',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                company: Yup
                    .string()
                    .min(3, t('Size must be between 3 and 250.'))
                    .max(250, t('Size must be between 3 and 250.'))
                    .required(t('Must not be null and not blank.')),
                fname: Yup
                    .string()
                    .min(3, t('Size must be between 3 and 250.'))
                    .max(250, t('Size must be between 3 and 250.'))
                    .required(t('Must not be null and not blank.')),
                lname: Yup
                    .string()
                    .min(3, t('Size must be between 3 and 250.'))
                    .max(250, t('Size must be between 3 and 250.'))
                    .required(t('Must not be null and not blank.')),
                email: Yup
                    .string()
                    .min(3, t('Size must be between 3 and 250.'))
                    .max(250, t('Size must be between 3 and 250.'))
                    .required(t('Must not be null and not blank.'))
                    .email(t('Must be a well-formed email address.')),
                telegram: Yup
                    .string()
                    .min(3, t('Size must be between 3 and 250.'))
                    .max(250, t('Size must be between 3 and 250.'))
                    .url(t('Must be a valid URL.')),
                phone: Yup
                    .string()
                    .min(3, t('Size must be between 3 and 250.'))
                    .max(250, t('Size must be between 3 and 250.'))
                    .required(t('Must not be null and not blank.')),
                format: Yup
                    .string()
                    .min(3, t('Size must be between 3 and 1000.'))
                    .max(1000, t('Size must be between 3 and 1000.'))
                    .required(t('Must not be null and not blank.')),
            })}
            onSubmit={async (values, {setErrors, setStatus, resetForm}) => {
                setStatus({success: null});
                setErrors({submit: null});

                // Loading for animation
                await new Promise(r => setTimeout(r, 500));

                const response = await Shared.httpClient.post.registrationPartner(new Shared.requests.RegPartnerRequest(
                    values.company,
                    values.fname,
                    values.lname,
                    values.email,
                    values.telegram,
                    values.phone,
                    values.format,
                ))

                if (response.code === 200) {
                    resetForm();
                    setStatus({success: true});
                } else if (response.code === 422 && response.validates !== null) {
                    setErrors({
                        company: Helper.findError(t, 'company', response),
                        fname: Helper.findError(t, 'fname', response),
                        lname: Helper.findError(t, 'lname', response),
                        email: Helper.findError(t, 'email', response),
                        telegram: Helper.findError(t, 'telegram', response),
                        phone: Helper.findError(t, 'phone', response),
                        format: Helper.findError(t, 'format', response),
                        submit: t('pages.registrationPartner.t_error_form')
                    });
                } else {
                    setErrors({
                        submit: response.message
                    });
                }

                // Scroll to top
                const root = document.getElementById("root")
                const element = document.getElementById("FormId")
                root.scrollTo({top: element.offsetTop - 20, behavior: 'smooth'});
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
                <form noValidate onSubmit={handleSubmit}>
                    <FormGroup>
                        <Box id={'FormId'}>
                            <Card>
                                <Stack
                                    spacing={isMD ? 2 : 3}
                                    sx={{ p: isMD ? 2 : 3}}
                                >
                                    <YupLocalization/>

                                    {errors.submit && (
                                        <AlertError onClose={() => setErrors({submit: null})}>
                                            {errors.submit}
                                        </AlertError>
                                    )}

                                    {status && status.success && (
                                        <AlertSuccess onClose={() => setStatus({success: false})}>
                                            {t('pages.registrationPartner.t_success_reg')}
                                        </AlertSuccess>
                                    )}

                                    <Stack spacing={2}>
                                        <Typography variant='h5' color={'text.primary'}>
                                            {t('pages.registrationPartner.t_form_title')}
                                        </Typography>

                                        <Typography variant='body2' color={'text.primary'}>
                                            {t('pages.registrationPartner.t_form_subtitle')}
                                        </Typography>
                                    </Stack>

                                    <TextField
                                        disabled={isSubmitting}
                                        required
                                        type={'text'}
                                        name={'company'}
                                        value={values.company}
                                        helperText={touched.company && errors.company ? errors.company : ''}
                                        error={Boolean(touched.company && errors.company)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        label={t('pages.registrationPartner.t_field_company')}
                                    />

                                    <Stack spacing={isMD ? 2 : 3} direction={isSM ? 'column' : 'row'}>
                                        <TextField
                                            disabled={isSubmitting}
                                            required
                                            type={'text'}
                                            name={'fname'}
                                            value={values.fname}
                                            helperText={touched.fname && errors.fname ? errors.fname : ''}
                                            error={Boolean(touched.fname && errors.fname)}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            fullWidth
                                            label={t('pages.registrationPartner.t_field_fname')}
                                        />

                                        <TextField
                                            disabled={isSubmitting}
                                            required
                                            type={'text'}
                                            name={'lname'}
                                            value={values.lname}
                                            helperText={touched.lname && errors.lname ? errors.lname : ''}
                                            error={Boolean(touched.lname && errors.lname)}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            fullWidth
                                            label={t('pages.registrationPartner.t_field_lname')}
                                        />
                                    </Stack>

                                    <TextField
                                        disabled={isSubmitting}
                                        required
                                        type={'text'}
                                        name={'email'}
                                        value={values.email}
                                        helperText={touched.email && errors.email ? errors.email : ''}
                                        error={Boolean(touched.email && errors.email)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        label={t('pages.registrationPartner.t_field_email')}
                                    />

                                    <TextField
                                        disabled={isSubmitting}
                                        type={'text'}
                                        name={'telegram'}
                                        value={values.telegram}
                                        helperText={touched.telegram && errors.telegram ? errors.telegram : ''}
                                        error={Boolean(touched.telegram && errors.telegram)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        label={t('pages.registrationPartner.t_field_telegram')}
                                    />

                                    <TextField
                                        disabled={isSubmitting}
                                        required
                                        type={'phone'}
                                        name={'phone'}
                                        value={values.phone}
                                        helperText={touched.phone && errors.phone ? errors.phone : ''}
                                        error={Boolean(touched.phone && errors.phone)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        label={t('pages.registrationPartner.t_field_phone')}
                                    />

                                    <Stack spacing={2}>
                                        <Typography variant='h5' color={'text.primary'}>
                                            {t('pages.registrationPartner.t_form_format_title')}
                                        </Typography>
                                    </Stack>

                                    <TextField
                                        disabled={isSubmitting}
                                        required
                                        type={'text'}
                                        name={'format'}
                                        value={values.format}
                                        helperText={touched.format && errors.format ? errors.format : ''}
                                        error={Boolean(touched.format && errors.format)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        multiline
                                        minRows={5}
                                        maxRows={15}
                                    />

                                    <Box sx={{textAlign: 'right'}}>
                                        <Button
                                            type={'submit'}
                                            disableElevation
                                            variant={'contained'}
                                            size={'large'}
                                            color={'secondary'}
                                            disabled={Boolean(isSubmitting || Object.keys(errors).length !== 0 || Object.keys(touched).length === 0)}
                                            startIcon={isSubmitting ? (
                                                <CircularProgress sx={{
                                                    mr: 0.5,
                                                    height: '18px !important',
                                                    width: '18px !important'
                                                }}/>
                                            ) : (
                                                <DoneOutlined sx={{height: 18}}/>
                                            )}
                                        >
                                            {t('pages.registrationExpert.t_button_submit')}
                                        </Button>
                                    </Box>
                                </Stack>
                            </Card>
                        </Box>
                    </FormGroup>
                </form>
            )}
        </Formik>
    );
}

FormPartner.propTypes = {};
