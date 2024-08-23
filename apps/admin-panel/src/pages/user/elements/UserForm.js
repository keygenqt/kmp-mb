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

const localeUserFields = [
    {
        name: 'fname',
        required: true,
        multiline: false,
        label: 'First name',
        validate: Yup.string()
            .min(3, 'Size must be between 3 and 250.')
            .max(250, 'Size must be between 3 and 250.')
            .required('Must not be null and not blank.'),
    },
    {
        name: 'lname',
        required: true,
        multiline: false,
        label: 'Last name',
        validate: Yup.string()
            .min(3, 'Size must be between 3 and 250.')
            .max(250, 'Size must be between 3 and 250.')
            .required('Must not be null and not blank.'),
    },
    {
        name: 'short',
        required: false,
        multiline: false,
        label: 'Short',
        validate: Yup.string()
            .min(3, 'Size must be between 3 and 250.')
            .max(250, 'Size must be between 3 and 250.')
            .nullable()
    },
    {
        name: 'about',
        required: false,
        multiline: true,
        label: 'About',
        validate: Yup.string()
            .min(3, 'Size must be between 3 and 1000.')
            .max(1000, 'Size must be between 3 and 1000.')
            .nullable()
    },
    {
        name: 'quote',
        required: false,
        multiline: true,
        label: 'Quote',
        validate: Yup.string()
            .min(3, 'Size must be between 3 and 1000.')
            .max(1000, 'Size must be between 3 and 1000.')
            .nullable()
    },
]

export function UserForm(props) {
    const {route, routes} = React.useContext(RouteContext)
    const [isFormChange, setIsFormChange] = React.useState(false)
    const [isFormRemove, setIsFormRemove] = React.useState(false)
    const [tabLocale, setTabLocale] = React.useState('undefined')
    const roles = CacheStorage.get(CacheKeys.userRoles)
    const isAdmin = roles?.includes('ADMIN')

    // Array locales
    const [localeFields] = React.useState([localeUserFields].concat(
        Shared.locales.map((locale) => localeUserFields.map((item) => ({
            ...item,
            type: locale,
            fname: `${item.name}-${locale.name}`,
        })))
    ))

    // Array contacts
    const [contactFields] = React.useState(Shared.contactTypes.map((item) => ({
        type: item,
        name: item.name,
        fname: `contact-${item.name}`,
        label: `${item.name.charAt(0).toUpperCase()}${item.name.slice(1).toLowerCase()}`,
        validate: Yup.string()
            .min(3, 'Size must be between 3 and 250.')
            .max(250, 'Size must be between 3 and 250.')
            .required('Must not be null and not blank.'),
    })))

    // Array media
    const [mediaFields] = React.useState(Shared.userMediaTypes.map((item) => ({
        type: item,
        name: item.name,
        fname: `media-${item.name}`,
        label: `${item.name.charAt(0).toUpperCase()}${item.name.slice(1).toLowerCase()}`,
        validate: Yup.string()
            .min(3, 'Size must be between 3 and 250.')
            .max(250, 'Size must be between 3 and 250.')
            .required('Must not be null and not blank.'),
    })))

    return (
        <Formik
            initialValues={{
                roles: props.model?.roles?.map((item) => item.name) ?? [],
                directions: props.model?.directions?.map((item) => item.id) ?? [],
                image: props.model?.image ?? '',
                isRemove: false,
                submit: null,

                // Array locales
                ...localeFields.map((fields) => Object.fromEntries(fields.map((field) => [
                    field['fname'] ?? field['name'],
                    field.type === undefined ? props.model[field.name] : props.model
                        ?.locales
                        ?.filter((item) => item.locale === field.type)
                        ?.[0]
                        ?.[field.name]
                ]))).reduce((prev, curr) => ({...prev, ...curr}) , {}),
                // Array contacts
                ...Object.fromEntries(contactFields.map((field) => [
                    field.fname,
                    props.model
                        ?.contacts
                        ?.filter((item) => item.type === field.type)
                        ?.[0]
                        ?.['link']
                ])),
                // Array media
                ...Object.fromEntries(mediaFields.map((field) => [
                    field.fname,
                    props.model
                        ?.media
                        ?.filter((item) => item.type === field.type)
                        ?.[0]
                        ?.['link']
                ])),

                // Redirect from create page
                isRedirect: CacheStorage.get(CacheKeys.redirectCreateUser),
            }}
            validationSchema={Yup.object().shape({
                image: Yup.string()
                    .min(3, 'Size must be between 3 and 250.')
                    .max(250, 'Size must be between 3 and 250.')
                    .required('Must not be null and not blank.'),

                // Array locales
                ...localeFields.map((fields) => Object.fromEntries(fields.map((field) => [
                    field['fname'] ?? field['name'],
                    field.validate
                ]))).reduce((prev, curr) => ({...prev, ...curr}) , {}),
                // Array contacts
                ...Object.fromEntries(contactFields.map((field) => [
                    field.fname,
                    field.validate
                ])),
                // Array media
                ...Object.fromEntries(mediaFields.map((field) => [
                    field.fname,
                    field.validate
                ])),
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
                    // Array locale default prepare
                    const userLocaleDefault = localeFields.map((fields) => fields[0].type === undefined
                        ? Object.fromEntries(fields.map((field) => [
                            field.name,
                            values[field['name']],
                        ])) : null)[0]

                    // Array locales prepare
                    const userLocaleRequests = localeFields.map((fields) => fields[0].type === undefined ? null : ({
                        type: fields[0].type,
                        ...Object.fromEntries(fields.map((field) => [
                            field.name,
                            values[field['fname']],
                        ]))
                    }))
                        .filter((item) => item !== null)
                        .map((valueFields) => new Shared.requests.UserLocaleRequest(
                            props.model?.locales?.filter((item) => item.locale === valueFields.type)?.[0]?.id,
                            valueFields.fname,
                            valueFields.lname,
                            valueFields.short,
                            valueFields.about,
                            valueFields.quote,
                            valueFields.type,
                        ))

                    // Array contacts prepare
                    const userContactRequest = contactFields.map((field) => new Shared.requests.UserContactRequest(
                        props.model?.contacts?.filter((item) => item.type === field.type)?.[0]?.id,
                        values[field.fname],
                        field.type,
                    ))

                    // Array media prepare
                    const userMediaRequest = mediaFields.map((field) => new Shared.requests.UserMediaRequest(
                        props.model?.media?.filter((item) => item.type === field.type)?.[0]?.id,
                        values[field.fname],
                        field.type,
                    ))

                    console.log(userLocaleDefault)
                    console.log(userLocaleRequests)
                    console.log(userContactRequest)
                    console.log(userMediaRequest)

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
                                // // Array locales error field
                                // ...Object.fromEntries(Object.keys(localeFields).map((fieldName, index) => [
                                //     fieldName,
                                //     Helper.findError(`locales[${index}].text`, error)
                                // ]))
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
                                    <Tabs value={tabLocale} onChange={(event, newValue) => setTabLocale(newValue)}>
                                        {localeFields.map((fields) => (
                                            <Tab
                                                key={`locale-tab-${fields[0].type}`}
                                                id={`tab-${fields[0].type?.name}`}
                                                label={`Locale ${fields[0].type?.name ?? 'RU'}`}

                                                aria-controls={`tabpanel-${fields[0].type?.name}`}
                                                value={`${fields[0].type?.name}`}
                                            />
                                        ))}
                                    </Tabs>
                                </Box>

                                <Stack spacing={1}>
                                    <Typography variant='caption' color={'text.primary'}>
                                        The main language is Russian, but all other fields are mandatory; it is not good if the user does not find a translation on the site.
                                    </Typography>
                                </Stack>

                                {/* Array locales */}
                                {localeFields.map((fields) => {
                                    const type = fields[0].type
                                    let color = '#ff552563'
                                    if (type === Shared.locale.EN) {
                                        color = '#259cff63'
                                    }
                                    if (type === Shared.locale.BY) {
                                        color = '#13894163'
                                    }
                                    return (
                                        <div
                                            style={{border: `1px solid ${color}`, padding: 15, borderRadius: 15}}
                                            key={`tabpanel-${type?.name}`}
                                            id={`tabpanel-${type?.name}`}
                                            hidden={tabLocale !== `${type?.name}`}
                                        >
                                            <Stack spacing={2}>
                                                {fields.map((field) => {
                                                    const fieldName = `${field['fname'] ?? field['name']}`
                                                    return (
                                                        <TextField
                                                            key={`locale-filed-${fieldName}`}
                                                            disabled={isSubmitting || (!isAdmin && props.id === undefined)}
                                                            required={field.required}
                                                            type={'text'}
                                                            name={fieldName}
                                                            value={values[fieldName] ?? ''}
                                                            helperText={touched[fieldName] && errors[fieldName] ? errors[fieldName] : ''}
                                                            error={Boolean(touched[fieldName] && errors[fieldName])}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            fullWidth
                                                            label={`${field.label}`}
                                                            variant="filled"
                                                            inputProps={{ autoComplete: 'off' }}
                                                            multiline={field.multiline}
                                                            minRows={4}
                                                            maxRows={15}
                                                        />
                                                    )
                                                })}
                                            </Stack>
                                        </div>
                                    )
                                })}

                                <Stack spacing={1}>
                                    <Typography variant='h6' color={'text.primary'}>
                                        Contacts
                                    </Typography>
                                    <Typography variant='caption' color={'text.primary'}>
                                        User contacts that will be displayed on the website.
                                    </Typography>
                                </Stack>

                                {/* Array contacts */}
                                {contactFields.map((field) => (
                                    <TextField
                                        key={`fieldName-${field.fname}`}
                                        disabled={isSubmitting || (!isAdmin && props.id === undefined)}
                                        type={'url'}
                                        name={field.fname}
                                        value={values[field.fname] ?? ''}
                                        helperText={touched[field.fname] && errors[field.fname] ? errors[field.fname] : ''}
                                        error={Boolean(touched[field.fname] && errors[field.fname])}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        label={field.label}
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
                                {mediaFields.map((field) => (
                                        <TextField
                                        key={`fieldName-${field.fname}`}
                                        disabled={isSubmitting || (!isAdmin && props.id === undefined)}
                                        type={'url'}
                                        name={field.fname}
                                        value={values[field.fname] ?? ''}
                                        helperText={touched[field.fname] && errors[field.fname] ? errors[field.fname] : ''}
                                        error={Boolean(touched[field.fname] && errors[field.fname])}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        label={field.label}
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
