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
                direction: '',
                expert: '',
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
                direction: Yup.number().required('Field is required'),
                expert: Yup.number().required('Field is required'),
                why: Yup.string().required('Field is required.'),
                fname: Yup.string().required('Field is required.'),
                lname: Yup.string().required('Field is required.'),
                location: Yup.string().required('Field is required.'),
                email: Yup.string().required('Field is required.').email('Email must be valid.'),
                telegram: Yup.string().required('Field is required.').url('The link must be valid.'),
                cv: Yup.string().required('Field is required.').url('The link must be valid.'),
                experience: Yup.string().required('Field is required.'),
                contribution: Yup.string().required('Field is required.'),
            })}
            onSubmit={async (values, {setErrors, setStatus, resetForm}) => {
                setStatus({success: null});
                setErrors({submit: null});

                // Demo loading
                await new Promise(r => setTimeout(r, 2000));

                resetForm();
                setStatus({success: true});

                // Scroll to success
                const root = document.getElementById("root")
                const element = document.getElementById("FormId")
                root.scrollTo({top: element.offsetTop - 20, behavior: 'smooth'});
            }}
        >
            {({
                  status,
                  setStatus,
                  errors,
                  setErrors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  touched,
                  values
              }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <FormGroup>
                        <Box id={'FormId'}>
                            <Card>
                                <Stack
                                    spacing={isMD ? 2 : 3}
                                    sx={{ p: isMD ? 2 : 3}}
                                >
                                    {errors.submit && (
                                        <AlertError onClose={() => setErrors({submit: null})}>
                                            {errors.submit}
                                        </AlertError>
                                    )}

                                    {status && status.success && (
                                        <AlertSuccess onClose={() => setStatus({success: false})}>
                                            Заявка отправлена. Спасибо!
                                        </AlertSuccess>
                                    )}

                                    <Stack spacing={2}>
                                        <Typography variant='h5' color={'text.primary'}>
                                            Направление
                                        </Typography>

                                        <Typography variant='body2' color={'text.primary'}>
                                            Ссылки для ознакомления: <a target='_blank' rel="noreferrer" href='https://androidbroadcast.notion.site/e1b8387ec122428dba6ecfbb8cdff76d'>кто может стать экспертом</a>, <a target='_blank' rel="noreferrer" href='https://www.notion.so/androidbroadcast/73574a646d304384be3eb189b16e0c81?pvs=4'>что должен делать эксперт</a>.
                                        </Typography>
                                    </Stack>

                                    <TextField
                                        type={'text'}
                                        name={'direction'}
                                        value={values.direction}
                                        helperText={touched.direction && errors.direction ? errors.direction : 'Если вы хотите подать заявки по другим направлениям то это можно будет сделать после рассмотрения первой заявки в частном порядке.'}
                                        error={Boolean(touched.direction && errors.direction)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        select
                                        fullWidth
                                        label='Направление'
                                    >
                                        {props.directions?.map((direction) => (
                                            <MenuItem key={`direction-${direction.id}`} value={direction.id}>
                                                {direction.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    <TextField
                                        type={'text'}
                                        name={'expert'}
                                        value={values.expert}
                                        helperText={touched.expert && errors.expert ? errors.expert : 'Чтобы подать заявку на присвоение статуса MBE кто-то из существующих экспертов по любой технологии должен будет поддержать вашу заявку.'}
                                        error={Boolean(touched.expert && errors.expert)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        select
                                        fullWidth
                                        label='Эксперт'
                                    >
                                        {props.experts?.map((expert) => (
                                            <MenuItem key={`expert-${expert.id}`} value={expert.id}>
                                                {`${Helper.locate(expert, 'fname', language)} ${Helper.locate(expert, 'lname', language)}`}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    <TextField
                                        disabled={isSubmitting}
                                        type={'text'}
                                        name={'why'}
                                        value={values.why}
                                        helperText={touched.why && errors.why ? errors.why : 'Расскажите про вашу мотивацию стать MBE.'}
                                        error={Boolean(touched.why && errors.why)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        multiline
                                        minRows={3}
                                        maxRows={15}
                                        label="Мотивация"
                                    />

                                    <Stack spacing={2}>
                                        <Typography variant='h5' color={'text.primary'}>
                                            О себе
                                        </Typography>

                                        <Typography variant='body2' color={'text.primary'}>
                                            Представьтесь и оставьте свои контакты.
                                        </Typography>
                                    </Stack>

                                    <Stack spacing={isMD ? 2 : 3} direction={isSM ? 'column' : 'row'}>

                                        <TextField
                                            disabled={isSubmitting}
                                            type={'text'}
                                            name={'fname'}
                                            value={values.fname}
                                            helperText={touched.fname && errors.fname ? errors.fname : ''}
                                            error={Boolean(touched.fname && errors.fname)}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            fullWidth
                                            label="Имя"
                                        />

                                        <TextField
                                            disabled={isSubmitting}
                                            type={'text'}
                                            name={'lname'}
                                            value={values.lname}
                                            helperText={touched.lname && errors.lname ? errors.lname : ''}
                                            error={Boolean(touched.lname && errors.lname)}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            fullWidth
                                            label="Фамилия"
                                        />
                                    </Stack>

                                    <TextField
                                        disabled={isSubmitting}
                                        type={'text'}
                                        name={'email'}
                                        value={values.email}
                                        helperText={touched.email && errors.email ? errors.email : ''}
                                        error={Boolean(touched.email && errors.email)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        label="E-Mail"
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
                                        label="Telegram"
                                    />

                                    <TextField
                                        disabled={isSubmitting}
                                        type={'text'}
                                        name={'cv'}
                                        value={values.cv}
                                        helperText={touched.cv && errors.cv ? errors.cv : ''}
                                        error={Boolean(touched.cv && errors.cv)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        label="CV"
                                    />

                                    <TextField
                                        disabled={isSubmitting}
                                        type={'text'}
                                        name={'location'}
                                        value={values.location}
                                        helperText={touched.location && errors.location ? errors.location : 'Город, Страна, Координаты...'}
                                        error={Boolean(touched.location && errors.location)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        label="Где вы находитесь?"
                                    />

                                    <Stack spacing={2}>
                                        <Typography variant='h5' color={'text.primary'}>
                                            Экспертность
                                        </Typography>

                                        <Typography variant='body2' color={'text.primary'}>
                                            В рамках этой секции вы должны подтвердить свой опыт в технологи и что вы разрабатывали сложные проекты с её применением. Тут будет полезно рассказать про проекты и что вы в них делали, а также ссылки на Open Source проекты в которые вы контрибьютили.
                                        </Typography>
                                    </Stack>

                                    <TextField
                                        disabled={isSubmitting}
                                        type={'text'}
                                        name={'experience'}
                                        value={values.experience}
                                        helperText={touched.experience && errors.experience ? errors.experience : 'Расскажите почему вы выдающийся специалист в указанной технологии.'}
                                        error={Boolean(touched.experience && errors.experience)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        multiline
                                        minRows={3}
                                        maxRows={15}
                                        label="Опыт в технологии"
                                    />

                                    <Stack spacing={2}>
                                        <Typography variant='h5' color={'text.primary'}>
                                            Вклад в сообщество
                                        </Typography>

                                        <Typography variant='body2' color={'text.primary'}>
                                            Расскажите о своих публичных активностях минимум за прошедший год с момента подачи заявки, указывая ссылки и охваты (сколько было зрителей, просмотров или прочее). На основе этой информации мы будем оценивать ваш вклад в развитие сообщества по технологии.
                                        </Typography>
                                    </Stack>

                                    <TextField
                                        disabled={isSubmitting}
                                        type={'text'}
                                        name={'contribution'}
                                        value={values.contribution}
                                        helperText={touched.contribution && errors.contribution ? errors.contribution : 'Расскажите о своих публичных активностях минимум за прошедший год с момента подачи заявки, указывая ссылки и охваты (сколько было зрителей, просмотров или прочее). На основе этой информации мы будем оценивать ваш вклад в развитие сообщества по технологии.'}
                                        error={Boolean(touched.contribution && errors.contribution)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        multiline
                                        minRows={3}
                                        maxRows={15}
                                        label="Деятельность"
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
                                            {'Отправить'}
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
