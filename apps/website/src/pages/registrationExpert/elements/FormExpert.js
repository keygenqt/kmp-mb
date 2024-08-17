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
    MenuItem,
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


export function FormExpert(props) {
    const theme = useTheme()
    const isMD = useMediaQuery(theme.breakpoints.down('md'));
    const isSM = useMediaQuery(theme.breakpoints.down('sm'));
    const {t, language} = React.useContext(LocalizationContext)

    return (
        <Formik
            initialValues={{
                directionID: '',
                expertID: '',
                why: '',
                fname: '',
                lname: '',
                location: '',
                email: '',
                telegram: '',
                experience: '',
                cv: '',
                contribution: '',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                directionID: Yup
                    .number()
                    .positive(t('Must be greater than or equal to 1.'))
                    .required(t('Must be greater than or equal to 1.')),
                expertID: Yup
                    .number()
                    .positive(t('Must be greater than or equal to 1.'))
                    .required(t('Must be greater than or equal to 1.')),
                why: Yup
                    .string()
                    .min(3, t('Size must be between 3 and 1000.'))
                    .max(1000, t('Size must be between 3 and 1000.'))
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
                    .required(t('Must not be null and not blank.'))
                    .url(t('Must be a valid URL.')),
                cv: Yup
                    .string()
                    .min(3, t('Size must be between 3 and 250.'))
                    .max(250, t('Size must be between 3 and 250.'))
                    .required(t('Must not be null and not blank.'))
                    .url(t('Must be a valid URL.')),
                location: Yup
                    .string()
                    .min(3, t('Size must be between 3 and 250.'))
                    .max(250, t('Size must be between 3 and 250.'))
                    .required(t('Must not be null and not blank.')),
                experience: Yup
                    .string()
                    .min(3, t('Size must be between 3 and 1000.'))
                    .max(1000, t('Size must be between 3 and 1000.'))
                    .required(t('Must not be null and not blank.')),
                contribution: Yup
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
                    await Shared.httpClient.post.registrationExpert(new Shared.requests.RegExpertRequest(
                        values.directionID,
                        values.expertID,
                        values.why,
                        values.fname,
                        values.lname,
                        values.email,
                        values.telegram,
                        values.cv,
                        values.location,
                        values.experience,
                        values.contribution,
                    ))
                    resetForm();
                    setStatus({success: true});
                } catch (error) {
                    if (error.code === 422 && error.validates !== null) {
                        setErrors({
                            directionID: Helper.findError(t, 'directionID', error),
                            expertID: Helper.findError(t, 'expertID', error),
                            why: Helper.findError(t, 'why', error),
                            fname: Helper.findError(t, 'fname', error),
                            lname: Helper.findError(t, 'lname', error),
                            email: Helper.findError(t, 'email', error),
                            telegram: Helper.findError(t, 'telegram', error),
                            cv: Helper.findError(t, 'cv', error),
                            location: Helper.findError(t, 'location', error),
                            experience: Helper.findError(t, 'experience', error),
                            contribution: Helper.findError(t, 'contribution', error),
                            submit: t('pages.registrationExpert.t_error_form')
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
                                            {t('pages.registrationExpert.t_success_reg')}
                                        </AlertSuccess>
                                    )}

                                    <Stack spacing={2}>
                                        <Typography variant='h5' color={'text.primary'}>
                                            {t('pages.registrationExpert.t_block1_title')}
                                        </Typography>

                                        <Typography variant='body2' color={'text.primary'}>
                                            {t('pages.registrationExpert.t_block1_subtitle')}
                                            {' '}
                                            <a target='_blank' rel="noreferrer" href='https://androidbroadcast.notion.site/e1b8387ec122428dba6ecfbb8cdff76d'>{t('pages.registrationExpert.t_block1_subtitle_link1')}</a>
                                            {', '}
                                            <a target='_blank' rel="noreferrer" href='https://www.notion.so/androidbroadcast/73574a646d304384be3eb189b16e0c81?pvs=4'>{t('pages.registrationExpert.t_block1_subtitle_link2')}</a>
                                            .
                                        </Typography>
                                    </Stack>

                                    <TextField
                                        disabled={isSubmitting}
                                        required
                                        type={'text'}
                                        name={'directionID'}
                                        value={values.directionID}
                                        helperText={touched.directionID && errors.directionID ? errors.directionID : t('pages.registrationExpert.t_field_directionID_help')}
                                        error={Boolean(touched.directionID && errors.directionID)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        select
                                        fullWidth
                                        label={t('pages.registrationExpert.t_field_directionID')}
                                    >
                                        {props.directions?.map((direction) => (
                                            <MenuItem key={`direction-${direction.id}`} value={direction.id}>
                                                {direction.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    <TextField
                                        disabled={isSubmitting}
                                        required
                                        type={'text'}
                                        name={'expertID'}
                                        value={values.expertID}
                                        helperText={touched.expertID && errors.expertID ? errors.expertID : t('pages.registrationExpert.t_field_expertID_help')}
                                        error={Boolean(touched.expertID && errors.expertID)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        select
                                        fullWidth
                                        label={t('pages.registrationExpert.t_field_expertID')}
                                    >
                                        {props.experts?.map((expert) => (
                                            <MenuItem key={`expert-${expert.id}`} value={expert.id}>
                                                {`${Helper.locate(expert, 'fname', language)} ${Helper.locate(expert, 'lname', language)}`}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    <TextField
                                        disabled={isSubmitting}
                                        required
                                        type={'text'}
                                        name={'why'}
                                        value={values.why}
                                        helperText={touched.why && errors.why ? errors.why : t('pages.registrationExpert.t_field_why_help')}
                                        error={Boolean(touched.why && errors.why)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        multiline
                                        minRows={3}
                                        maxRows={15}
                                        label={t('pages.registrationExpert.t_field_why')}
                                    />

                                    <Stack spacing={2}>
                                        <Typography variant='h5' color={'text.primary'}>
                                            {t('pages.registrationExpert.t_block2_title')}
                                        </Typography>

                                        <Typography variant='body2' color={'text.primary'}>
                                            {t('pages.registrationExpert.t_block2_subtitle')}
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
                                            label={t('pages.registrationExpert.t_field_fname')}
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
                                            label={t('pages.registrationExpert.t_field_lname')}
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
                                        label={t('pages.registrationExpert.t_field_email')}
                                    />

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
                                        label={t('pages.registrationExpert.t_field_telegram')}
                                    />

                                    <TextField
                                        disabled={isSubmitting}
                                        required
                                        type={'text'}
                                        name={'cv'}
                                        value={values.cv}
                                        helperText={touched.cv && errors.cv ? errors.cv : ''}
                                        error={Boolean(touched.cv && errors.cv)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        label={t('pages.registrationExpert.t_field_cv')}
                                    />

                                    <TextField
                                        disabled={isSubmitting}
                                        required
                                        type={'text'}
                                        name={'location'}
                                        value={values.location}
                                        helperText={touched.location && errors.location ? errors.location : t('pages.registrationExpert.t_field_location_help')}
                                        error={Boolean(touched.location && errors.location)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        label={t('pages.registrationExpert.t_field_location')}
                                    />

                                    <Stack spacing={2}>
                                        <Typography variant='h5' color={'text.primary'}>
                                            {t('pages.registrationExpert.t_block3_title')}
                                        </Typography>

                                        <Typography variant='body2' color={'text.primary'}>
                                            {t('pages.registrationExpert.t_block3_subtitle')}
                                        </Typography>
                                    </Stack>

                                    <TextField
                                        disabled={isSubmitting}
                                        required
                                        type={'text'}
                                        name={'experience'}
                                        value={values.experience}
                                        helperText={touched.experience && errors.experience ? errors.experience : t('pages.registrationExpert.t_field_experience_help')}
                                        error={Boolean(touched.experience && errors.experience)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        multiline
                                        minRows={3}
                                        maxRows={15}
                                        label={t('pages.registrationExpert.t_field_experience')}
                                    />

                                    <Stack spacing={2}>
                                        <Typography variant='h5' color={'text.primary'}>
                                            {t('pages.registrationExpert.t_block4_title')}
                                        </Typography>

                                        <Typography variant='body2' color={'text.primary'}>
                                            {t('pages.registrationExpert.t_block4_subtitle')}
                                        </Typography>
                                    </Stack>

                                    <TextField
                                        disabled={isSubmitting}
                                        required
                                        type={'text'}
                                        name={'contribution'}
                                        value={values.contribution}
                                        helperText={touched.contribution && errors.contribution ? errors.contribution : t('pages.registrationExpert.t_field_contribution_help')}
                                        error={Boolean(touched.contribution && errors.contribution)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        multiline
                                        minRows={3}
                                        maxRows={15}
                                        label={t('pages.registrationExpert.t_field_contribution')}
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

FormExpert.propTypes = {
    experts: PropTypes.array.isRequired,
    directions: PropTypes.array.isRequired,
};
