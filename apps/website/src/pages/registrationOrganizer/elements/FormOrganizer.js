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
    FormControlLabel,
    Checkbox,
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


export function FormOrganizer(props) {
    const theme = useTheme()
    const isMD = useMediaQuery(theme.breakpoints.down('md'));
    const isSM = useMediaQuery(theme.breakpoints.down('sm'));
    const {t} = React.useContext(LocalizationContext)

    return (
        <Formik
            initialValues={{
                fname: '',
                lname: '',
                why: '',
                experience: '',
                activity: '',
                email: '',
                emailNotion: '',
                telegram: '',
                city: '',
                country: '',
                expectations: '',
                agreement: false,
                submit: null
            }}
            validationSchema={Yup.object().shape({
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
                why: Yup
                    .string()
                    .min(3, t('Size must be between 3 and 1000.'))
                    .max(1000, t('Size must be between 3 and 1000.'))
                    .required(t('Must not be null and not blank.')),
                experience: Yup
                    .string()
                    .min(3, t('Size must be between 3 and 1000.'))
                    .max(1000, t('Size must be between 3 and 1000.'))
                    .required(t('Must not be null and not blank.')),
                activity: Yup
                    .string()
                    .min(3, t('Size must be between 3 and 1000.'))
                    .max(1000, t('Size must be between 3 and 1000.'))
                    .required(t('Must not be null and not blank.')),
                email: Yup
                    .string()
                    .min(3, t('Size must be between 3 and 250.'))
                    .max(250, t('Size must be between 3 and 250.'))
                    .required(t('Must not be null and not blank.'))
                    .email(t('Must be a well-formed email address.')),
                emailNotion: Yup
                    .string()
                    .min(3, t('Size must be between 3 and 250.'))
                    .max(250, t('Size must be between 3 and 250.'))
                    .required(t('Must not be null and not blank.'))
                    .email(t('Must be a well-formed email address.')),
                telegram: Yup
                    .string()
                    .min(3, t('Size must be between 3 and 250.'))
                    .max(250, t('Size must be between 3 and 250.'))
                    .required(t('Must not be null and not blank.'))
                    .url(t('Must be a valid URL.')),
                city: Yup
                    .string()
                    .min(3, t('Size must be between 3 and 250.'))
                    .max(250, t('Size must be between 3 and 250.'))
                    .required(t('Must not be null and not blank.')),
                country: Yup
                    .string()
                    .min(3, t('Size must be between 3 and 250.'))
                    .max(250, t('Size must be between 3 and 250.'))
                    .required(t('Must not be null and not blank.')),
                expectations: Yup
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

                try {
                    await Shared.httpClient.post.registrationOrganizer(new Shared.requests.RegOrganizerRequest(
                        values.fname,
                        values.lname,
                        values.why,
                        values.experience,
                        values.activity,
                        values.email,
                        values.emailNotion,
                        values.telegram,
                        values.city,
                        values.country,
                        values.expectations,
                    ))
                    resetForm();
                    setStatus({success: true});
                } catch (error) {
                    if (error.code === 422 && error.validates !== null) {
                        setErrors({
                            fname: Helper.findError(t, 'fname', error),
                            lname: Helper.findError(t, 'lname', error),
                            why: Helper.findError(t, 'why', error),
                            experience: Helper.findError(t, 'experience', error),
                            activity: Helper.findError(t, 'activity', error),
                            email: Helper.findError(t, 'email', error),
                            emailNotion: Helper.findError(t, 'emailNotion', error),
                            telegram: Helper.findError(t, 'telegram', error),
                            city: Helper.findError(t, 'city', error),
                            country: Helper.findError(t, 'country', error),
                            expectations: Helper.findError(t, 'expectations', error),
                            submit: t('pages.registrationOrganizer.t_error_form')
                        });
                    } else {
                        setErrors({
                            submit: error.message
                        });
                    }
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
                  setFieldValue,
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
                                            {t('pages.registrationOrganizer.t_success_reg')}
                                        </AlertSuccess>
                                    )}

                                    <Stack spacing={2}>
                                        <Typography variant='h5' color={'text.primary'}>
                                            {t('pages.registrationOrganizer.t_block1_title')}
                                        </Typography>

                                        <Typography variant='body2' color={'text.primary'}>
                                            {t('pages.registrationOrganizer.t_block1_subtitle')}
                                        </Typography>
                                    </Stack>

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
                                            label={t('pages.registrationOrganizer.t_field_fname')}
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
                                            label={t('pages.registrationOrganizer.t_field_lname')}
                                        />
                                    </Stack>

                                    <TextField
                                        disabled={isSubmitting}
                                        required
                                        type={'text'}
                                        name={'telegram'}
                                        value={values.telegram}
                                        helperText={touched.telegram && errors.telegram ? errors.telegram : ''}
                                        error={Boolean(touched.telegram && errors.telegram)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        label={t('pages.registrationOrganizer.t_field_telegram')}
                                    />

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
                                        label={t('pages.registrationOrganizer.t_field_email')}
                                    />

                                    <TextField
                                        disabled={isSubmitting}
                                        required
                                        type={'text'}
                                        name={'emailNotion'}
                                        value={values.emailNotion}
                                        helperText={touched.emailNotion && errors.emailNotion ? errors.emailNotion : t('pages.registrationOrganizer.t_field_emailNotion_help')}
                                        error={Boolean(touched.emailNotion && errors.emailNotion)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        label={t('pages.registrationOrganizer.t_field_emailNotion')}
                                    />

                                    <Stack spacing={2}>
                                        <Typography variant='h5' color={'text.primary'}>
                                            {t('pages.registrationOrganizer.t_block2_title')}
                                        </Typography>

                                        <Typography variant='body2' color={'text.primary'}>
                                            {t('pages.registrationOrganizer.t_block2_subtitle')}
                                        </Typography>
                                    </Stack>

                                    <TextField
                                        disabled={isSubmitting}
                                        required
                                        type={'text'}
                                        name={'city'}
                                        value={values.city}
                                        helperText={touched.city && errors.city ? errors.city : ''}
                                        error={Boolean(touched.city && errors.city)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        label={t('pages.registrationOrganizer.t_field_city')}
                                    />

                                    <TextField
                                        disabled={isSubmitting}
                                        required
                                        type={'text'}
                                        name={'country'}
                                        value={values.country}
                                        helperText={touched.country && errors.country ? errors.country : ''}
                                        error={Boolean(touched.country && errors.country)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        label={t('pages.registrationOrganizer.t_field_country')}
                                    />

                                    <Stack spacing={2}>
                                        <Typography variant='h5' color={'text.primary'}>
                                            {t('pages.registrationOrganizer.t_block3_title')}
                                        </Typography>

                                        <Typography variant='body2' color={'text.primary'}>
                                            {t('pages.registrationOrganizer.t_block3_subtitle')}
                                        </Typography>
                                    </Stack>

                                    <TextField
                                        disabled={isSubmitting}
                                        required
                                        type={'text'}
                                        name={'activity'}
                                        value={values.activity}
                                        helperText={touched.activity && errors.activity ? errors.activity : t('pages.registrationOrganizer.t_field_activity_help')}
                                        error={Boolean(touched.activity && errors.activity)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        multiline
                                        minRows={3}
                                        maxRows={15}
                                        label={t('pages.registrationOrganizer.t_field_activity')}
                                    />

                                    <TextField
                                        disabled={isSubmitting}
                                        required
                                        type={'text'}
                                        name={'experience'}
                                        value={values.experience}
                                        helperText={touched.experience && errors.experience ? errors.experience : t('pages.registrationOrganizer.t_field_experience_help')}
                                        error={Boolean(touched.experience && errors.experience)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        multiline
                                        minRows={3}
                                        maxRows={15}
                                        label={t('pages.registrationOrganizer.t_field_experience')}
                                    />

                                    <TextField
                                        disabled={isSubmitting}
                                        required
                                        type={'text'}
                                        name={'why'}
                                        value={values.why}
                                        helperText={touched.why && errors.why ? errors.why : t('pages.registrationOrganizer.t_field_why_help')}
                                        error={Boolean(touched.why && errors.why)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        multiline
                                        minRows={3}
                                        maxRows={15}
                                        label={t('pages.registrationOrganizer.t_field_why')}
                                    />

                                    <TextField
                                        disabled={isSubmitting}
                                        required
                                        type={'text'}
                                        name={'expectations'}
                                        value={values.expectations}
                                        helperText={touched.expectations && errors.expectations ? errors.expectations : t('pages.registrationOrganizer.t_field_expectations_help')}
                                        error={Boolean(touched.expectations && errors.expectations)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        multiline
                                        minRows={3}
                                        maxRows={15}
                                        label={t('pages.registrationOrganizer.t_field_expectations')}
                                    />

                                    <Box sx={{
                                        '& .MuiTypography-root': {
                                            userSelect: 'none'
                                        }
                                    }}>
                                        <FormControlLabel
                                            disabled={isSubmitting}
                                            required
                                            control={<Checkbox />}
                                            checked={values.agreement}
                                            onChange={(event, checked) => setFieldValue('agreement', checked)}
                                            label={t('pages.registrationOrganizer.t_field_checkbox')}
                                        />
                                    </Box>

                                    <Typography variant='body2' color={'text.primary'}>
                                        {t('pages.registrationOrganizer.t_checkbox_info')}
                                        <a target='_blank' rel="noreferrer" href='https://androidbroadcast.notion.site/40badb571b2246afa6a52f063ec712d2'>{t('pages.registrationOrganizer.t_checkbox_info_link')}</a>
                                        .
                                    </Typography>

                                    <Box sx={{textAlign: 'right'}}>
                                        <Button
                                            type={'submit'}
                                            disableElevation
                                            variant={'contained'}
                                            size={'large'}
                                            color={'secondary'}
                                            disabled={Boolean(isSubmitting || Object.keys(errors).length !== 0 || Object.keys(touched).length === 0 || values.agreement === false)}
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
                                            {t('pages.registrationOrganizer.t_button_submit')}
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

FormOrganizer.propTypes = {};
