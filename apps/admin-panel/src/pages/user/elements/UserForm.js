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
    Typography,
    Tabs,
    Tab,
    MenuItem,
    Chip,
    Avatar,
    InputAdornment,
} from '@mui/material';
import {
    AlertInfo,
    AlertError,
    AlertSuccess,
    Helper,
    Shared,
    RouteContext,
    CacheStorage,
    CacheKeys,
    DialogRemove,
} from '../../../base';
import {
    Delete,
    DoneOutlined,
} from '@mui/icons-material';


export function UserForm(props) {
    const {route, routes} = React.useContext(RouteContext)
    const [isFormChange, setIsFormChange] = React.useState(false)
    const [isFormRemove, setIsFormRemove] = React.useState(false)
    const [tabLocale, setTabLocale] = React.useState('RU')
    const roles = CacheStorage.get(CacheKeys.userRoles)
    const isAdmin = roles?.includes('ADMIN')

    const mediaFields = {}
    const contactFields = {}
    const localeFields = {}

    // Array fields user media
    Shared.userMediaTypes.forEach((type) => {
        mediaFields[`media-${type.name}`] = {
            type: type,
            label: `Url (${type.name})`,
            validate: Yup.string()
                .min(3, 'Size must be between 3 and 250.')
                .max(250, 'Size must be between 3 and 250.')
                .required('Must not be null and not blank.'),
        }
    });

    // Array fields user contacts
    Shared.contactTypes.forEach((type) => {
        if (type === Shared.contactType.EMAIL) {
            contactFields[`contact-${type.name}`] = {
                type: type,
                label: `Email`,
                validate: Yup.string()
                    .min(3, 'Size must be between 3 and 250.')
                    .max(250, 'Size must be between 3 and 250.')
                    .required('Must not be null and not blank.')
                    .email(),
            }
        } else {
            contactFields[`contact-${type.name}`] = {
                type: type,
                label: `Url (${type.name})`,
                validate: Yup.string()
                    .min(3, 'Size must be between 3 and 250.')
                    .max(250, 'Size must be between 3 and 250.')
                    .required('Must not be null and not blank.')
            }
        }
    });

    // Array locales base data
    Shared.locales.forEach((locale) => {
        localeFields[`fname-${locale.name}`] = {
            name: 'fname',
            locale: locale,
            multiline: false,
            label: 'First name',
            required: true,
            validate: Yup.string()
                .min(3, 'Size must be between 3 and 250.')
                .max(250, 'Size must be between 3 and 250.')
                .required('Must not be null and not blank.'),
        }
        localeFields[`lname-${locale.name}`] = {
            name: 'lname',
            locale: locale,
            multiline: false,
            label: 'Last name',
            required: true,
            validate: Yup.string()
                .min(3, 'Size must be between 3 and 250.')
                .max(250, 'Size must be between 3 and 250.')
                .required('Must not be null and not blank.'),
        }
        localeFields[`short-${locale.name}`] = {
            name: 'short',
            locale: locale,
            multiline: false,
            label: 'Short description',
            required: false,
            validate: Yup.string()
                .min(3, 'Size must be between 3 and 250.')
                .max(250, 'Size must be between 3 and 250.'),
        }
        localeFields[`about-${locale.name}`] = {
            name: 'about',
            locale: locale,
            multiline: true,
            label: 'About',
            required: false,
            validate: Yup.string()
                .min(3, 'Size must be between 3 and 1000.')
                .max(250, 'Size must be between 3 and 1000.')
        }
        localeFields[`quote-${locale.name}`] = {
            name: 'quote',
            locale: locale,
            multiline: true,
            label: 'Quote expert',
            required: false,
            validate: Yup.string()
                .min(3, 'Size must be between 3 and 1000.')
                .max(250, 'Size must be between 3 and 1000.')
        }
    });

    return (
        <Formik
            initialValues={{
                roles: props.model?.roles?.map((item) => item.name) ?? [],
                directions: props.model?.directions?.map((item) => item.id) ?? [],
                image: props.model?.image ?? '',
                fname: props.model?.fname ?? '',
                lname: props.model?.lname ?? '',
                short: props.model?.short ?? '',
                about: props.model?.about ?? '',
                quote: props.model?.quote ?? '',
                isRemove: false,
                submit: null,
                // Redirect from create page
                isRedirect: CacheStorage.get(CacheKeys.redirectCreateUser),
                // Array media fields
                ...Object.fromEntries(Object.keys(mediaFields).map((fieldName) => [
                    fieldName,
                    props.model
                        ?.media
                        ?.filter((item) => item.type === mediaFields[fieldName].type)
                        [0]?.link ?? ''
                ])),
                // Array contacts fields
                ...Object.fromEntries(Object.keys(contactFields).map((fieldName) => [
                    fieldName,
                    props.model
                        ?.contacts
                        ?.filter((item) => item.type === contactFields[fieldName].type)
                        [0]?.link ?? ''
                ])),
                // Array locales fields
                ...Object.fromEntries(Object.keys(localeFields).map((fieldName) => [
                    fieldName,
                    props.model
                        ?.locales
                        ?.filter((item) => item.locale === localeFields[fieldName].locale)
                        [0][localeFields[fieldName].name] ?? ''
                ]))
            }}
            validationSchema={Yup.object().shape({
                fname: Yup.string()
                    .min(3, 'Size must be between 3 and 250.')
                    .max(250, 'Size must be between 3 and 250.')
                    .required('Must not be null and not blank.'),
                lname: Yup.string()
                    .min(3, 'Size must be between 3 and 250.')
                    .max(250, 'Size must be between 3 and 250.')
                    .required('Must not be null and not blank.'),
                short: Yup.string()
                    .min(3, 'Size must be between 3 and 1000.')
                    .max(250, 'Size must be between 3 and 1000.'),
                about: Yup.string()
                    .min(3, 'Size must be between 3 and 1000.')
                    .max(250, 'Size must be between 3 and 1000.'),
                quote: Yup.string()
                    .min(3, 'Size must be between 3 and 1000.')
                    .max(250, 'Size must be between 3 and 1000.'),
                // Array media validate
                ...Object.fromEntries(Object.keys(mediaFields).map((fieldName) => [
                    fieldName,
                    mediaFields[fieldName].validate
                ])),
                // Array contacts validate
                ...Object.fromEntries(Object.keys(contactFields).map((fieldName) => [
                    fieldName,
                    contactFields[fieldName].validate
                ])),
                // Array locales validate
                ...Object.fromEntries(Object.keys(localeFields).map((fieldName) => [
                    fieldName,
                    localeFields[fieldName].validate
                ]))
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

                if (values.isRemove) {
                    setFieldValue('isRemove', false)
                    console.log('isRemove')
                    try {
                        await Shared.httpClient.delete.deleteUser(props.id)
                        // Success remove
                        CacheStorage.set(CacheKeys.redirectRemoveUser, true, true, true)
                        route.toLocationReplace(routes.users)
                    } catch (error) {
                        setErrors({
                            submit: error.message
                        });
                    }
                } else {
                    // Array locales prepare
                    const localesRequest = Shared.locales.map((locale) => {
                        const localRequest = new Shared.requests.ColumnLocaleRequest()
                        localRequest['id'] = props.model?.locales?.filter((item) => item.locale === locale)[0]['id']
                        localRequest['locale'] = locale
                        Object.keys(localeFields).filter((e) => localeFields[e].locale === locale).forEach((fieldName) => {
                            localRequest[localeFields[fieldName].name] = values[fieldName]
                        })
                        return localRequest
                    })
                    try {

                        // const response = Boolean(props.id) ? (
                        //     await Shared.httpClient.put.editUser(props.id, new Shared.requests.UserRequest(
                        //         values.image,
                        //         values.fname,
                        //         values.lname,
                        //         values.short,
                        //         values.about,
                        //         values.quote,
                        //         localesRequest
                        //     ))
                        // ) : (
                        //     await Shared.httpClient.post.addUser(new Shared.requests.UserRequest(
                        //         values.image,
                        //         values.fname,
                        //         values.lname,
                        //         values.short,
                        //         values.about,
                        //         values.quote,
                        //         localesRequest
                        //     ))
                        // )
                        // if (!Boolean(props.id)) {
                        //     CacheStorage.set(CacheKeys.redirectCreateUser, true, true, true)
                        //     route.toLocationReplace(routes.userEdit, response.id)
                        // } else {
                        //     setFieldValue('name', response.name)
                        //     setStatus({success: true});
                        // }
                    } catch (error) {
                        if (error.code === 403) {
                            setErrors({
                                submit: `For a user with "${roles?.join(', ')}" roles this action is prohibited.`
                            });
                        } else if (error.code === 422 && error.validates !== null) {
                            setErrors({
                                name: Helper.findError('name', error),
                                // Array locales common
                                submit: Helper.findError('locales', error),
                                // Array locales error field
                                ...Object.fromEntries(Object.keys(localeFields).map((fieldName, index) => [
                                    fieldName,
                                    Helper.findError(`locales[${index}].text`, error)
                                ]))
                            });
                        } else {
                            setErrors({
                                submit: error.message
                            });
                        }
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
                setFieldValue,
                submitForm,
            }) => (
                <form style={{width: '100%'}} noValidate onSubmit={handleSubmit}>
                    <FormGroup>
                        <Box id={'FormId'}>
                            <Stack spacing={2} >

                                <DialogRemove
                                    isOpen={isFormRemove}
                                    onClickAgree={() => {
                                        setFieldValue('isRemove', true)
                                        setIsFormRemove(false)
                                        submitForm()
                                    }}
                                    onClickDisagree={() => {
                                        setIsFormRemove(false)
                                    }}
                                />

                                {errors.submit && (
                                    <AlertError onClose={() => setErrors({})}>
                                        {errors.submit}
                                    </AlertError>
                                )}

                                {props.id === undefined && !errors.submit && !isAdmin && (
                                    <AlertInfo>
                                        You are not allowed to create a new user.
                                    </AlertInfo>
                                )}

                                {values.isRedirect && (
                                    <AlertSuccess onClear={() => {
                                        CacheStorage.set(CacheKeys.redirectCreateUser, false, true, true)
                                    }}>
                                        Create user successfully.
                                    </AlertSuccess>
                                )}

                                {status && status.success && (
                                    <AlertSuccess onClose={() => setStatus({success: false})}>
                                        Update user successfully.
                                    </AlertSuccess>
                                )}

                                <TextField
                                    disabled={isSubmitting || (!isAdmin && props.id === undefined)}
                                    required
                                    type={'text'}
                                    name={'image'}
                                    value={values.image}
                                    helperText={touched.image && errors.image ? errors.image : ''}
                                    error={Boolean(touched.image && errors.image)}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    fullWidth
                                    label={'Image'}
                                    variant="filled"
                                    InputProps={{
                                        autoComplete: 'off',
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <Avatar
                                                alt={`${props.model?.fname} ${props.model?.lname}`}
                                                src={props.model?.image}
                                                sx={{ width: 20, height: 20 }}
                                            />
                                          </InputAdornment>
                                        ),
                                    }}
                                />

                                <TextField
                                    disabled={isSubmitting || (!isAdmin && props.id === undefined)}
                                    required
                                    type={'text'}
                                    name={'directions'}
                                    value={values.directions}
                                    helperText={touched.directions && errors.directions ? errors.directions : ''}
                                    error={Boolean(touched.directions && errors.directions)}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    fullWidth
                                    label={'Directions'}
                                    variant="filled"
                                    select
                                    SelectProps={{
                                        multiple: true,
                                        renderValue: (selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip
                                                        key={`directions-${value}`}
                                                        label={props.directions.filter((e) => e.id === value)[0]['name'] ?? value}
                                                    />
                                                ))}
                                            </Box>
                                        )
                                    }}
                                >
                                    {props.directions?.map((item) => (
                                        <MenuItem key={`directions-menu-${item.id}`} value={item.id}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    disabled={isSubmitting || (!isAdmin && props.id === undefined)}
                                    required
                                    type={'text'}
                                    name={'roles'}
                                    value={values.roles}
                                    helperText={touched.roles && errors.roles ? errors.roles : ''}
                                    error={Boolean(touched.roles && errors.roles)}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    fullWidth
                                    label={'Roles'}
                                    variant="filled"
                                    select
                                    SelectProps={{
                                        multiple: true,
                                        renderValue: (selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip
                                                        key={`roles-${value}`}
                                                        label={props.roles.filter((e) => e.id === value)[0] ?? value}
                                                    />
                                                ))}
                                            </Box>
                                        )
                                    }}
                                >
                                    {props.roles?.map((item) => (
                                        <MenuItem key={`roles-menu-${item.name}`} value={item.name}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={tabLocale} onChange={(event, newValue) => { setTabLocale(newValue) }} aria-label="basic tabs example">
                                        <Tab
                                            key={'locale-tab-RU'}
                                            label={'Locale RU'}
                                            id={'tab-RU'}
                                            aria-controls={'tabpanel-RU'}
                                            value={'RU'}
                                        />
                                        {Shared.locales.map((locale) => (
                                            <Tab
                                                key={`locale-tab-${locale.name}`}
                                                label={`Locale ${locale.name}`}
                                                id={`tab-${locale.name}`}
                                                aria-controls={`tabpanel-${locale.name}`}
                                                value={locale.name}
                                            />
                                        ))}
                                    </Tabs>
                                </Box>

                                <Stack spacing={1}>
                                    <Typography variant='caption' color={'text.primary'}>
                                        The main language is Russian, but all other fields are mandatory; it is not good if the user does not find a translation on the site.
                                    </Typography>
                                </Stack>

                                <div
                                    key={`locale-tabpanel-RU`}
                                    role={'tabpanel'}
                                    hidden={tabLocale !== 'RU'}
                                    id={`tabpanel-RU`}
                                    aria-labelledby={`tab-RU`}
                                >
                                    <Stack spacing={2}>

                                        <TextField
                                            disabled={isSubmitting || (!isAdmin && props.id === undefined)}
                                            required
                                            type={'text'}
                                            name={'fname'}
                                            value={values.fname}
                                            helperText={touched.fname && errors.fname ? errors.fname : ''}
                                            error={Boolean(touched.fname && errors.fname)}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            fullWidth
                                            label={'First name'}
                                            variant="filled"
                                            inputProps={{ autoComplete: 'off' }}
                                        />

                                        <TextField
                                            disabled={isSubmitting || (!isAdmin && props.id === undefined)}
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
                                            inputProps={{ autoComplete: 'off' }}
                                        />

                                        <TextField
                                            disabled={isSubmitting || (!isAdmin && props.id === undefined)}
                                            type={'text'}
                                            name={'short'}
                                            value={values.short}
                                            helperText={touched.short && errors.short ? errors.short : ''}
                                            error={Boolean(touched.short && errors.short)}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            fullWidth
                                            label={'Short description'}
                                            variant="filled"
                                            inputProps={{ autoComplete: 'off' }}
                                        />

                                        <TextField
                                            disabled={isSubmitting || (!isAdmin && props.id === undefined)}
                                            type={'text'}
                                            name={'about'}
                                            value={values.about}
                                            helperText={touched.about && errors.about ? errors.about : ''}
                                            error={Boolean(touched.about && errors.about)}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            fullWidth
                                            label={'About'}
                                            variant="filled"
                                            inputProps={{ autoComplete: 'off' }}
                                            multiline
                                            minRows={4}
                                            maxRows={15}
                                        />

                                        <TextField
                                            disabled={isSubmitting || (!isAdmin && props.id === undefined)}
                                            type={'text'}
                                            name={'quote'}
                                            value={values.quote}
                                            helperText={touched.quote && errors.quote ? errors.quote : ''}
                                            error={Boolean(touched.quote && errors.quote)}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            fullWidth
                                            label={'Quote'}
                                            variant="filled"
                                            inputProps={{ autoComplete: 'off' }}
                                            multiline
                                            minRows={4}
                                            maxRows={15}
                                        />
                                    </Stack>
                                </div>

                                {Shared.locales.map((locale) => (
                                    <div
                                        key={`locale-tabpanel-${locale.name}`}
                                        role={'tabpanel'}
                                        hidden={tabLocale !== locale.name}
                                        id={`tabpanel-${locale.name}`}
                                        aria-labelledby={`tab-${locale.name}`}
                                    >
                                        <Stack spacing={2}>
                                            {Object.keys(localeFields).filter((e) => localeFields[e].locale === locale).map((fieldName) => (
                                                <TextField
                                                    key={`locale-filed-${locale.name}-${fieldName}`}
                                                    disabled={isSubmitting || (!isAdmin && props.id === undefined)}
                                                    required={localeFields[fieldName].required}
                                                    type={'text'}
                                                    name={`${fieldName}`}
                                                    value={values[fieldName]}
                                                    helperText={touched[fieldName] && errors[fieldName] ? errors[fieldName] : ''}
                                                    error={Boolean(touched[fieldName] && errors[fieldName])}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    label={`${localeFields[fieldName].label}`}
                                                    variant="filled"
                                                    inputProps={{ autoComplete: 'off' }}
                                                    multiline={localeFields[fieldName].multiline}
                                                    minRows={4}
                                                    maxRows={15}
                                                />
                                            ))}
                                        </Stack>
                                    </div>
                                ))}

                                <Stack spacing={1}>
                                    <Typography variant='h6' color={'text.primary'}>
                                        Contacts
                                    </Typography>
                                    <Typography variant='caption' color={'text.primary'}>
                                        User contacts that will be displayed on the website.
                                    </Typography>
                                </Stack>

                                {/* Array media fields */}
                                {Object.keys(contactFields).map((fieldName) => (
                                    <TextField
                                        key={`fieldName-${fieldName}`}
                                        disabled={isSubmitting || (!isAdmin && props.id === undefined)}
                                        type={'url'}
                                        name={fieldName}
                                        value={values[fieldName]}
                                        helperText={touched[fieldName] && errors[fieldName] ? errors[fieldName] : ''}
                                        error={Boolean(touched[fieldName] && errors[fieldName])}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        label={contactFields[fieldName].label}
                                        variant="filled"
                                        inputProps={{ autoComplete: 'off' }}
                                    />
                                ))}

                                <Stack spacing={1}>
                                    <Typography variant='h6' color={'text.primary'}>
                                        Media
                                    </Typography>
                                    <Typography variant='caption' color={'text.primary'}>
                                        Links to the user's media resources.
                                    </Typography>
                                </Stack>

                                {/* Array media fields */}
                                {Object.keys(mediaFields).map((fieldName) => (
                                    <TextField
                                        key={`fieldName-${fieldName}`}
                                        disabled={isSubmitting || (!isAdmin && props.id === undefined)}
                                        type={'url'}
                                        name={fieldName}
                                        value={values[fieldName]}
                                        helperText={touched[fieldName] && errors[fieldName] ? errors[fieldName] : ''}
                                        error={Boolean(touched[fieldName] && errors[fieldName])}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        label={mediaFields[fieldName].label}
                                        variant="filled"
                                        inputProps={{ autoComplete: 'off' }}
                                    />
                                ))}

                                <Stack direction={'row'} spacing={2}>
                                    <Box sx={{ flexGrow: 1 }}/>
                                    {props.id && isAdmin && (
                                        <Button
                                            variant={'outlined'}
                                            size={'large'}
                                            disabled={Boolean(isSubmitting
                                                || Object.keys(errors).length !== 0)
                                            }
                                            color={'inherit'}
                                            startIcon={<Delete color={'default'} sx={{height: 18}}/>}
                                            onClick={() => setIsFormRemove(true)}
                                        >
                                            Remove
                                        </Button>
                                    )}

                                    <Button
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
                                </Stack>
                            </Stack>
                        </Box>
                    </FormGroup>
                </form>
            )}
        </Formik>
    );
}

UserForm.propTypes = {
    id: PropTypes.string,
    model: PropTypes.object,
    roles: PropTypes.array.isRequired,
    directions: PropTypes.array.isRequired,
};
