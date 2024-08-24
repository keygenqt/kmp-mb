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

// @todo Large form, on debug slow. How release?
export function UserForm(props) {
    const theme = useTheme()
    const isSM = useMediaQuery(theme.breakpoints.down('sm'))
    const {route, routes} = React.useContext(RouteContext)

    const roles = CacheStorage.get(CacheKeys.userRoles)
    const isAdmin = roles?.includes('ADMIN')

    const [model, setModel] = React.useState(props.model)
    const [isFormChange, setIsFormChange] = React.useState(false)
    const [isFormRemove, setIsFormRemove] = React.useState(false)
    const [tabLocale, setTabLocale] = React.useState('undefined')

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
            .concat(item === Shared.contactType.EMAIL ? Yup.string().email('Must be a valid Email.') : Yup.string().url('Must be a valid URL.'))
            .min(3, 'Size must be between 3 and 250.')
            .max(250, 'Size must be between 3 and 250.')
            .nullable()
    })))

    // Array media
    const [mediaFields] = React.useState(Shared.userMediaTypes.map((item) => ({
        type: item,
        name: item.name,
        fname: `media-${item.name}`,
        label: `${item.name.charAt(0).toUpperCase()}${item.name.slice(1).toLowerCase()}`,
        validate: Yup.string()
            .url('Must be a valid URL.')
            .min(3, 'Size must be between 3 and 250.')
            .max(250, 'Size must be between 3 and 250.')
            .nullable()
    })))

    return (
        <Formik
            initialValues={{
                roles: model?.roles?.map((item) => item.name) ?? [],
                directions: model?.directions?.map((item) => item.id) ?? [],
                image: model?.image ?? '',
                isRemove: false,
                submit: null,

                // Redirect from create page
                isRedirect: CacheStorage.get(CacheKeys.redirectCreateUser),

                // Array locales
                ...localeFields.map((fields) => Object.fromEntries(fields.map((field) => [
                    field['fname'] ?? field['name'],
                    field.type === undefined ? model?.[field.name] : model
                        ?.locales
                        ?.filter((item) => item.locale === field.type)
                        ?.[0]
                        ?.[field.name] ?? ''
                ]))).reduce((prev, curr) => ({...prev, ...curr}) , {}),
                // Array contacts
                ...Object.fromEntries(contactFields.map((field) => [
                    field.fname,
                    model?.contacts
                        ?.filter((item) => item.type === field.type)
                        ?.[0]
                        ?.['link']
                ])),
                // Array media
                ...Object.fromEntries(mediaFields.map((field) => [
                    field.fname,
                    model?.media
                        ?.filter((item) => item.type === field.type)
                        ?.[0]
                        ?.['link']
                ])),
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
                                values.image,
                                userLocaleDefault.fname,
                                userLocaleDefault.lname,
                                userLocaleDefault.short,
                                userLocaleDefault.about,
                                userLocaleDefault.quote,
                                userContactRequests,
                                userLocaleRequests,
                                userMediaRequests,
                                values.directions,
                                values.roles.map((name) => Shared.role.valueOf(name)),
                            ))
                        ) : (
                            await Shared.httpClient.post.addUser(new Shared.requests.UserRequest(
                                values.image,
                                userLocaleDefault.fname,
                                userLocaleDefault.lname,
                                userLocaleDefault.short,
                                userLocaleDefault.about,
                                userLocaleDefault.quote,
                                userContactRequests,
                                userLocaleRequests,
                                userMediaRequests,
                                values.directions,
                                values.roles.map((name) => Shared.role.valueOf(name)),
                            ))
                        )
                        if (!Boolean(props.id)) {
                            CacheStorage.set(CacheKeys.redirectCreateUser, true, true, true)
                            route.toLocationReplace(routes.userEdit, response.id)
                        } else {
                            setStatus({success: true});
                            setModel(response)
                        }
                    } catch (error) {
                        if (error.code === 403) {
                            setErrors({
                                submit: `For a user with "${roles?.join(', ')}" roles this action is prohibited.`
                            });
                        } else if (error.code === 422 && error.validates !== null) {
                            setErrors({
                                name: Helper.findError('name', error),
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
                            });
                        } else {
                            setErrors({
                                submit: error.message
                            });
                        }
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
                                                alt={`${model?.fname} ${model?.lname}`}
                                                src={values.image}
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
                                        {localeFields.map((fields) => {
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
                                {localeFields.map((fields) => {
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

                                <Stack direction={isSM ? 'column' : 'row'} spacing={2}>
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
