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
    MenuItem,
    InputAdornment,
    Avatar
} from "@mui/material";
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
} from "@mui/icons-material";


export function CityForm(props) {
    const {route, routes} = React.useContext(RouteContext)
    const [isFormChange, setIsFormChange] = React.useState(false)
    const [isFormRemove, setIsFormRemove] = React.useState(false)
    const locales = {}
    const roles = CacheStorage.get(CacheKeys.userRoles)
    const isAdmin = roles?.includes('ADMIN')

    // Array locales base data
    Shared.locales.forEach((locale) => {
        locales[`name-${locale}`] = locale
    });

    return (
        <Formik
            initialValues={{
                countryId: props.model?.country?.id ?? '',
                image: props.model?.image ?? '',
                link: props.model?.link ?? '',
                name: props.model?.name ?? '',
                isRemove: false,
                submit: null,
                // Redirect from create page
                isRedirect: CacheStorage.get(CacheKeys.redirectCreateCity),
                // Array locales fields
                ...Object.fromEntries(Object.keys(locales).map((fieldName) => [
                    fieldName,
                    props.model
                        ?.locales
                        ?.filter((item) => item.locale === locales[fieldName])[0]
                        ?.text ?? ''
                ]))
            }}
            validationSchema={Yup.object().shape({
                name: Yup.string()
                        .min(3, 'Size must be between 3 and 250.')
                        .max(250, 'Size must be between 3 and 250.')
                        .required('Must not be null and not blank.'),
                // Array locales validate
                ...Object.fromEntries(Object.keys(locales).map((fieldName) => [
                    fieldName,
                    Yup.string()
                        .min(3, 'Size must be between 3 and 1000.')
                        .max(250, 'Size must be between 3 and 1000.')
                        .required('Must not be null and not blank.')
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
                        await Shared.httpClient.delete.deleteCity(props.id)
                        // Success remove
                        CacheStorage.set(CacheKeys.redirectRemoveCity, true, true, true)
                        route.toLocationReplace(routes.cities)
                    } catch (error) {
                        setErrors({
                            submit: error.message
                        });
                    }
                } else {
                    // Array locales prepare
                    const localesRequest = Object.keys(locales).map((fieldName) => new Shared.requests.ColumnLocaleRequest(
                        props.model?.locales?.filter((item) => item.locale === locales[fieldName])[0]?.id,
                        values[fieldName],
                        locales[fieldName]
                    ));
                    try {
                        const response = Boolean(props.id) ? (
                            await Shared.httpClient.put.editCity(props.id, new Shared.requests.CityRequest(
                                values.countryId,
                                values.image,
                                values.link,
                                values.name,
                                localesRequest,
                                [],
                                []
                            ))
                        ) : (
                            await Shared.httpClient.post.addCity(new Shared.requests.CityRequest(
                                values.countryId,
                                values.image,
                                values.link,
                                values.name,
                                localesRequest,
                                [],
                                []
                            ))
                        )
                        if (!Boolean(props.id)) {
                            CacheStorage.set(CacheKeys.redirectCreateCity, true, true, true)
                            route.toLocationReplace(routes.cityEdit, response.id)
                        } else {
                            setStatus({success: true});
                        }
                    } catch (error) {
                        if (error.code === 403) {
                            setErrors({
                                submit: `For a user with "${roles?.join(', ')}" roles this action is prohibited.`
                            });
                        } else if (error.code === 422 && error.validates !== null) {
                            setErrors({
                                countryId: Helper.findError('countryId', error),
                                image: Helper.findError('image', error),
                                link: Helper.findError('link', error),
                                name: Helper.findError('name', error),
                                // Array locales common
                                submit: Helper.findError('locales', error),
                                // Array locales error field
                                ...Object.fromEntries(Object.keys(locales).map((fieldName, index) => [
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
                                        You are not allowed to create a new city.
                                    </AlertInfo>
                                )}

                                {values.isRedirect && (
                                    <AlertSuccess onClear={() => {
                                        CacheStorage.set(CacheKeys.redirectCreateCity, false, true, true)
                                    }}>
                                        Create city successfully.
                                    </AlertSuccess>
                                )}

                                {status && status.success && (
                                    <AlertSuccess onClose={() => setStatus({success: false})}>
                                        Update city successfully.
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
                                    name={'countryId'}
                                    value={values.countryId}
                                    helperText={touched.countryId && errors.countryId ? errors.countryId : ''}
                                    error={Boolean(touched.countryId && errors.countryId)}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    fullWidth
                                    label={'Country'}
                                    variant="filled"
                                    select
                                >
                                    {props.countries?.map((item) => (
                                        <MenuItem key={`state-${item.id}`} value={item.id}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    disabled={isSubmitting || (!isAdmin && props.id === undefined)}
                                    required
                                    type={'text'}
                                    name={'link'}
                                    value={values.link}
                                    helperText={touched.link && errors.link ? errors.link : ''}
                                    error={Boolean(touched.link && errors.link)}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    fullWidth
                                    label={'Link'}
                                    variant="filled"
                                    inputProps={{ autoComplete: 'off' }}
                                />

                                <TextField
                                    disabled={isSubmitting || (!isAdmin && props.id === undefined)}
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
                                    inputProps={{ autoComplete: 'off' }}
                                />

                                <Stack spacing={1}>
                                    <Typography variant='h6' color={'text.primary'}>
                                        Locales
                                    </Typography>
                                    <Typography variant='caption' color={'text.primary'}>
                                        The main language is Russian, but all other fields are mandatory; it is not good if the user does not find a translation on the site.
                                    </Typography>
                                </Stack>

                                {/* Array locales fields */}
                                {Object.keys(locales).map((fieldName) => (
                                    <TextField
                                        key={`fieldName-${fieldName}`}
                                        disabled={isSubmitting || (!isAdmin && props.id === undefined)}
                                        type={'text'}
                                        name={fieldName}
                                        value={values[fieldName]}
                                        helperText={touched[fieldName] && errors[fieldName] ? errors[fieldName] : ''}
                                        error={Boolean(touched[fieldName] && errors[fieldName])}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        label={`Last name (${locales[fieldName].name})`}
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

CityForm.propTypes = {
    id: PropTypes.string,
    model: PropTypes.object,
    countries: PropTypes.array.isRequired,
};
