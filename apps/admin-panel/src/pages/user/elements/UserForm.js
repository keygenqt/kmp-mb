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
    useTheme,
    useMediaQuery,
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
    Divider,
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
    TextFieldFile,
} from '../../../base';
import {
    Delete,
    DoneOutlined,
} from '@mui/icons-material';

const localeUserOrganizerFields = [
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
]

const localeUserExpertFields = [
    ...localeUserOrganizerFields,
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

// @todo Large form, on debug slow. How release?
export function UserForm(props) {
    const theme = useTheme()
    const isSM = useMediaQuery(theme.breakpoints.down('sm'))
    const {route, routes} = React.useContext(RouteContext)

    const roles = CacheStorage.get(CacheKeys.userRoles)
    const isAdmin = roles?.includes('ADMIN')

    // Update model ids relations from db
    const [model, setModel] = React.useState(props.model)
    // Refresh page after create model
    const [isFormRedirect, setIsFormRedirect] = React.useState(CacheStorage.get(CacheKeys.redirectCreateUser))
    // Set success from, state from not working with enableReinitialize
    const [isFormSuccess, setIsFormSuccess] = React.useState(false)
    // Dialog remove set state
    const [isFormRemove, setIsFormRemove] = React.useState(false)
    // Tabs index active
    const [tabLocale, setTabLocale] = React.useState('undefined')
    // Model roles with mode
    const [formUserRoles, setFormUserRoles] = React.useState(model?.roles.map((item) => item.name))
    // Save state values before refresh by roles
    const [formStateValues, setFormStateValues] = React.useState({})

    /// Check for form mode
    const checkFormRoles = React.useCallback(
        (...roles) => {
            if (formUserRoles === undefined) {
                return false;
            }
            for (let i = 0; i < roles.length; i++) {
                if (formUserRoles.includes(roles[i].name)) {
                    return true
                }
            }
            return false
        }, [formUserRoles]);

    // Array locales
    const localeFieldsGen = React.useCallback(
        () => {
            if (checkFormRoles(Shared.role.EXPERT)) {
                return [localeUserExpertFields].concat(
                    Shared.locales.map((locale) => localeUserExpertFields.map((item) => ({
                        ...item,
                        type: locale,
                        fname: `${item.name}-${locale.name}`,
                    })))
                )
            }
            if (checkFormRoles(Shared.role.ORGANIZER)) {
                return [localeUserOrganizerFields].concat(
                    Shared.locales.map((locale) => localeUserOrganizerFields.map((item) => ({
                        ...item,
                        type: locale,
                        fname: `${item.name}-${locale.name}`,
                    })))
                )
            }
            if (checkFormRoles(Shared.role.ADMIN, Shared.role.MANAGER)) {
                return [localeUserOrganizerFields]
            }
        }, [checkFormRoles]);

    // Array contacts
    const contactFieldsGen = React.useCallback(
        () => {
            if (checkFormRoles(Shared.role.EXPERT, Shared.role.ORGANIZER)) {
                return Shared.contactTypes.map((item) => ({
                    type: item,
                    name: item.name,
                    fname: `contact-${item.name}`,
                    label: `${item.name.charAt(0).toUpperCase()}${item.name.slice(1).toLowerCase()}`,
                    validate: Yup.string()
                        .concat(item === Shared.contactType.EMAIL ? Yup.string().email('Must be a valid Email.') : Yup.string().url('Must be a valid URL.'))
                        .min(3, 'Size must be between 3 and 250.')
                        .max(250, 'Size must be between 3 and 250.')
                        .nullable()
                }))
            }
            return []
        }, [checkFormRoles]);

    // Array media
    const mediaFieldsGen = React.useCallback(
        () => {
            if (checkFormRoles(Shared.role.EXPERT)) {
                return Shared.userMediaTypes.map((item) => ({
                    type: item,
                    name: item.name,
                    fname: `media-${item.name}`,
                    label: `${item.name.charAt(0).toUpperCase()}${item.name.slice(1).toLowerCase()}`,
                    validate: Yup.string()
                        .url('Must be a valid URL.')
                        .min(3, 'Size must be between 3 and 250.')
                        .max(250, 'Size must be between 3 and 250.')
                        .nullable()
                }))
            }
            return []
        }, [checkFormRoles]);

    // Fields
    const [localeFields, setLocaleFields] = React.useState(localeFieldsGen())
    const [contactFields, setContactFields] = React.useState(contactFieldsGen())
    const [mediaFields, setMediaFields] = React.useState(mediaFieldsGen())

    // Change state from after change role user
    React.useEffect(() => {
        setLocaleFields(localeFieldsGen())
        setContactFields(contactFieldsGen())
        setMediaFields(mediaFieldsGen())
    }, [
        localeFieldsGen,
        contactFieldsGen,
        mediaFieldsGen,
    ])

    return (
        <Formik
            enableReinitialize
            initialValues={{
                roles: formUserRoles ?? [],
                isRemove: false,
                submit: null,
                // Fields by role
                ...(checkFormRoles(Shared.role.EXPERT) ? {
                    directions: formStateValues.directions ?? model?.directions?.map((item) => item.id) ?? []
                } : {}),
                ...(checkFormRoles(...Shared.roles) ? {
                    image: formStateValues.image ?? model?.image ?? '',
                } : {}),
                ...(checkFormRoles(Shared.role.MANAGER, Shared.role.ADMIN) ? {
                    password: formStateValues.password ?? model?.password ?? '',
                } : {}),
                // Array locales
                ...localeFields?.map((fields) => Object.fromEntries(fields.map((field) => [
                    field['fname'] ?? field['name'],
                    formStateValues[field['fname'] ?? field['name']] ?? (field.type === undefined ? model?.[field.name] : model
                        ?.locales
                        ?.filter((item) => item.locale === field.type)
                        ?.[0]
                        ?.[field.name] ?? '')
                ]))).reduce((prev, curr) => ({...prev, ...curr}) , {}),
                // Array contacts
                ...Object.fromEntries(contactFields?.map((field) => [
                    field.fname,
                    formStateValues[field.fname] ?? model?.contacts
                        ?.filter((item) => item.type === field.type)
                        ?.[0]
                        ?.['link']
                ])),
                // Array media
                ...Object.fromEntries(mediaFields?.map((field) => [
                    field.fname,
                    formStateValues[field.fname] ?? model?.media
                        ?.filter((item) => item.type === field.type)
                        ?.[0]
                        ?.['link']
                ])),
            }}
            validationSchema={Yup.object().shape({
                ...(checkFormRoles(...Shared.roles) ? {
                    image: Yup.string()
                        .min(3, 'Size must be between 3 and 250.')
                        .max(250, 'Size must be between 3 and 250.')
                        .required('Must not be null and not blank.'),
                } : {}),
                ...(checkFormRoles(Shared.role.MANAGER, Shared.role.ADMIN) ? {
                    password: Yup.string()
                        .min(8, 'Size must be between 8 and 12.')
                        .max(12, 'Size must be between 8 and 12.')
                        .concat(Boolean(props.id) ? (
                            Yup.string().nullable()
                        ) : (
                            Yup.string().required('Must not be null and not blank.')
                        ))
                } : {}),
                ...(checkFormRoles(Shared.role.EXPERT) ? {
                    directions: Yup.array().min(1, 'Must not be null and not blank.')
                } : {}),
                // Array locales
                ...localeFields?.map((fields) => Object.fromEntries(fields.map((field) => [
                    field['fname'] ?? field['name'],
                    field.validate
                ]))).reduce((prev, curr) => ({...prev, ...curr}) , {}),
                // Array contacts
                ...Object.fromEntries(contactFields?.map((field) => [
                    field.fname,
                    field.validate
                ])),
                // Array media
                ...Object.fromEntries(mediaFields?.map((field) => [
                    field.fname,
                    field.validate
                ])),
            })}
            onSubmit={async (values, {setErrors, setFieldValue}) => {
                setIsFormRedirect(false)
                setIsFormSuccess(false)
                setErrors({submit: null})

                const scrollToTop = function() {
                    const root = document.getElementById("root")
                    const element = document.getElementById("FormId")
                    root.scrollTo({top: element.offsetTop - 20, behavior: 'smooth'});
                }

                // Loading for animation
                await new Promise(r => setTimeout(r, 500));

                if (values.isRemove) {
                    setFieldValue('isRemove', false)
                    try {
                        await Shared.httpClient.delete.deleteUser(props.id)
                        // Success remove
                        CacheStorage.set(CacheKeys.redirectRemoveUser, true, true, true)
                        route.toLocationReplace(routes.users)
                    } catch (error) {
                        setErrors({
                            submit: error.message
                        })
                        scrollToTop()
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
                            model?.locales?.filter((item) => item.locale === valueFields.type)?.[0]?.id,
                            valueFields.fname,
                            valueFields.lname,
                            valueFields.short,
                            valueFields.about,
                            valueFields.quote,
                            valueFields.type,
                        ))

                    // Array contacts prepare
                    const userContactRequests = contactFields.map((field) => values[field.fname] ? new Shared.requests.UserContactRequest(
                        model?.contacts?.filter((item) => item.type === field.type)?.[0]?.id,
                        values[field.fname],
                        field.type,
                    ) : null).filter((item) => item !== null)

                    // Array media prepare
                    const userMediaRequests = mediaFields.map((field) => values[field.fname] ? new Shared.requests.UserMediaRequest(
                        model?.media?.filter((item) => item.type === field.type)?.[0]?.id,
                        values[field.fname],
                        field.type,
                    ) : null).filter((item) => item !== null)

                    try {
                        const response = Boolean(props.id) ? (
                            await Shared.httpClient.put.editUser(props.id, new Shared.requests.UserRequest(
                                parseInt(props.id),
                                values.image,
                                userLocaleDefault.fname,
                                userLocaleDefault.lname,
                                userLocaleDefault.short && userLocaleDefault.short.length > 0 ? userLocaleDefault.short : null,
                                userLocaleDefault.about && userLocaleDefault.about.length > 0 ? userLocaleDefault.about : null,
                                userLocaleDefault.quote && userLocaleDefault.quote.length > 0 ? userLocaleDefault.quote : null,
                                userContactRequests,
                                userLocaleRequests,
                                userMediaRequests,
                                values.directions ?? [],
                                values.roles.map((name) => Shared.role.valueOf(name)),
                                values.password && values.password.length > 0 ? values.password : null,
                            ))
                        ) : (
                            await Shared.httpClient.post.addUser(new Shared.requests.UserRequest(
                                null,
                                values.image,
                                userLocaleDefault.fname,
                                userLocaleDefault.lname,
                                userLocaleDefault.short && userLocaleDefault.short.length > 0 ? userLocaleDefault.short : null,
                                userLocaleDefault.about && userLocaleDefault.about.length > 0 ? userLocaleDefault.about : null,
                                userLocaleDefault.quote && userLocaleDefault.quote.length > 0 ? userLocaleDefault.quote : null,
                                userContactRequests,
                                userLocaleRequests,
                                userMediaRequests,
                                values.directions ?? [],
                                values.roles.map((name) => Shared.role.valueOf(name)),
                                values.password && values.password.length > 0 ? values.password : null,
                            ))
                        )
                        if (!Boolean(props.id)) {
                            CacheStorage.set(CacheKeys.redirectCreateUser, true, true, true)
                            route.toLocationReplace(routes.userEdit, response.id)
                        } else {
                            setIsFormSuccess(true);
                            setModel(response)
                            scrollToTop()
                            // Clear user password after update for MANAGER/ADMIN
                            if (checkFormRoles(Shared.role.MANAGER, Shared.role.ADMIN)) {
                                setFieldValue('password', '')
                            }
                        }
                    } catch (error) {
                        if (error.code === 403) {
                            setErrors({
                                submit: `For a user with "${roles?.join(', ')}" roles this action is prohibited.`
                            })
                            scrollToTop()
                        } else if (error.code === 422 && error.validates !== null) {
                            setErrors({
                                image: Helper.findError('image', error),
                                password: Helper.findError('password', error),
                                directions: Helper.findError('directions', error),
                                submit: Helper.findError('locales', error),

                                // Array locales error field
                                ...localeFields.map((fields, index) => Object.fromEntries(fields.map((field) => [
                                    field['fname'] ?? field['name'],
                                    field['fname'] ? Helper.findError(`locales[${index-1}].${field.name}`, error) : Helper.findError(field.name, error),
                                ]))).reduce((prev, curr) => ({...prev, ...curr}) , {}),

                                // Array contacts error field
                                ...Object.fromEntries(contactFields.map((field, index) => [
                                    field.fname,
                                    Helper.findError(`contacts[${index}].link`, error)
                                ])),

                                // Array media error field
                                ...Object.fromEntries(mediaFields.map((field, index) => [
                                    field.fname,
                                    Helper.findError(`media[${index}].link`, error)
                                ]))
                            })
                        } else {
                            setErrors({
                                submit: error.message
                            })
                            scrollToTop()
                        }
                    }
                }
            }}
        >
            {({
                errors,
                touched,
                values,
                isSubmitting,
                setErrors,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                submitForm,
            }) => (
                <form style={{width: '100%'}} noValidate onSubmit={handleSubmit}>
                    <FormGroup>
                        <Box id={'FormId'} sx={{width: 1}}>
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

                                {isFormRedirect && (
                                    <AlertSuccess onClear={() => {
                                        CacheStorage.set(CacheKeys.redirectCreateUser, false, true, true)
                                    }}>
                                        Create user successfully.
                                    </AlertSuccess>
                                )}

                                {isFormSuccess && (
                                    <AlertSuccess onClose={() => setIsFormSuccess(false)}>
                                        Update user successfully.
                                    </AlertSuccess>
                                )}

                                <TextField
                                    disabled={isSubmitting || (!isAdmin && props.id === undefined)}
                                    required
                                    type={'text'}
                                    name={'roles'}
                                    value={values.roles}
                                    helperText={touched.roles && errors.roles ? errors.roles : ''}
                                    error={Boolean(touched.roles && errors.roles)}
                                    onBlur={handleBlur}
                                    onChange={(e) => {
                                        // ADMIN & MANAGER not needed together
                                        if (e.target.value.includes('ADMIN') && e.target.value.includes('MANAGER')) {
                                            if (e.target.value.findIndex((e) => e === 'ADMIN') > e.target.value.findIndex((e) => e === 'MANAGER')) {
                                                e.target.value = e.target.value.filter((e) => e !== 'MANAGER')
                                            } else {
                                                e.target.value = e.target.value.filter((e) => e !== 'ADMIN')
                                            }
                                        }
                                        // Save data model before refresh roles
                                        setFormStateValues({
                                            directions: values?.directions,
                                            image: values?.image,
                                            password: values?.password,
                                            ...localeFields?.map((fields) => Object.fromEntries(fields.map((field) => [
                                                field['fname'] ?? field['name'],
                                                values[field['fname'] ?? field['name']]
                                            ]))).reduce((prev, curr) => ({...prev, ...curr}) , {}),
                                            ...Object.fromEntries(contactFields?.map((field) => [
                                                field.fname,
                                                values[field.fname]
                                            ])),
                                            ...Object.fromEntries(mediaFields?.map((field) => [
                                                field.fname,
                                                values[field.fname]
                                            ]))
                                        })
                                        // Update state roles
                                        setFormUserRoles(e.target.value)
                                        // Save value form
                                        handleChange(e)
                                    }}
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

                                {values.image !== undefined && (
                                    <TextFieldFile
                                        disabled={isSubmitting || (!isAdmin && props.id === undefined)}
                                        label={'Image'}
                                        name={'image'}
                                        value={values.image}
                                        helperText={touched.image && errors.image ? errors.image : ''}
                                        error={Boolean(touched.image && errors.image)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                )}

                                {values.directions !== undefined && (
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
                                )}

                                {localeFields && localeFields.length > 1 ? (
                                    <>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: 1 }}>
                                            <Tabs
                                                variant="scrollable"
                                                allowScrollButtonsMobile
                                                value={tabLocale}
                                                onChange={(_, newValue) => setTabLocale(newValue)}
                                                sx={{
                                                    '& .TabError': {
                                                        color: 'error.main'
                                                    },
                                                    '& .TabError.Mui-selected': {
                                                        color: 'error.main'
                                                    },
                                                    '& .Mui-disabled.MuiTabs-scrollButtons': {
                                                        opacity: 0.3
                                                    }
                                                }}
                                            >
                                                {localeFields?.map((fields) => {
                                                    const isError = fields.map((field) => {
                                                        const fieldName = `${field['fname'] ?? field['name']}`
                                                        return Boolean(touched[fieldName] && errors[fieldName])
                                                    }).find((item) => item)
                                                    return (
                                                        <Tab
                                                            key={`locale-tab-${fields[0].type}`}
                                                            id={`tab-${fields[0].type?.name}`}
                                                            label={`Locale ${fields[0].type?.name ?? 'RU'}`}
                                                            aria-controls={`tabpanel-${fields[0].type?.name}`}
                                                            value={`${fields[0].type?.name}`}
                                                            className={isError ? 'TabError' : ''}
                                                        />
                                                    )
                                                })}
                                            </Tabs>
                                        </Box>

                                        <Stack spacing={1}>
                                            <Typography variant='caption' color={'text.primary'}>
                                                The main language is Russian, but all other fields are mandatory; it is not good if the user does not find a translation on the site.
                                            </Typography>
                                        </Stack>

                                        {/* Array locales */}
                                        {localeFields?.map((fields) => {
                                            const type = fields[0].type
                                            let color = '#ff25d263'
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
                                                            // @todo Bug MUI https://github.com/mui/base-ui/issues/167
                                                            const options = field.multiline ? {
                                                                multiline: true,
                                                                rows: isSM ? 8 : 5,
                                                            } : {}
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
                                                                    label={`${field.label}`}
                                                                    variant="filled"
                                                                    inputProps={{ autoComplete: 'off' }}
                                                                    {...options}
                                                                />
                                                            )
                                                        })}
                                                    </Stack>
                                                </div>
                                            )
                                        })}
                                    </>
                                ) : (
                                    <>
                                        {localeFields?.map((fields) => (fields.map((field) => {
                                            const fieldName = `${field['fname'] ?? field['name']}`
                                            // @todo Bug MUI https://github.com/mui/base-ui/issues/167
                                            const options = field.multiline ? {
                                                multiline: true,
                                                rows: isSM ? 8 : 5,
                                            } : {}
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
                                                    label={`${field.label}`}
                                                    variant="filled"
                                                    inputProps={{ autoComplete: 'off' }}
                                                    {...options}
                                                />
                                            )
                                        })))}
                                    </>
                                )}

                                {checkFormRoles(Shared.role.EXPERT, Shared.role.ORGANIZER) && (
                                    <>
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
                                    </>
                                )}

                                {checkFormRoles(Shared.role.EXPERT) && (
                                    <>
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
                                    </>
                                )}

                                {values.password !== undefined && (
                                    <>
                                        {props.id && (
                                            <Divider textAlign="left">
                                                Change user password
                                            </Divider>
                                        )}

                                        <TextField
                                            disabled={isSubmitting || (!isAdmin && props.id === undefined)}
                                            required
                                            type={'password'}
                                            name={'password'}
                                            value={values.password ?? ''}
                                            helperText={touched.password && errors.password ? errors.password : ''}
                                            error={Boolean(touched.password && errors.password)}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            fullWidth
                                            label={'Password'}
                                            variant="filled"
                                            inputProps={{ autoComplete: 'off' }}
                                        />
                                    </>
                                )}

                                <Stack direction={isSM ? 'column' : 'row'} spacing={2}>
                                    <Box sx={{ flexGrow: 1 }}/>
                                    {props.id && isAdmin && (
                                        <Button
                                            variant={'outlined'}
                                            size={'large'}
                                            disabled={Boolean(isSubmitting)}
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
                                        disabled={ Boolean(isSubmitting || formUserRoles === undefined) }
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
