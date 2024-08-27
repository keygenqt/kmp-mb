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
    Autocomplete,
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
    const theme = useTheme()
    const isSM = useMediaQuery(theme.breakpoints.down('sm'))

    const {route, routes} = React.useContext(RouteContext)
    const [isFormRemove, setIsFormRemove] = React.useState(false)
    const roles = CacheStorage.get(CacheKeys.userRoles)
    const isAdmin = roles?.includes('ADMIN')

    // Update model ids relations from db
    const [model, setModel] = React.useState(props.model)

    // Array locales
    const [localeFields] = React.useState(Shared.locales.map((item) => ({
        locale: item,
        fname: `name-${item.name}`,
        label: `Name (${item.name})`,
        validate: Yup.string()
            .min(3, 'Size must be between 3 and 1000.')
            .max(1000, 'Size must be between 3 and 1000.')
            .required('Must not be null and not blank.')
    })))

    // Autocomplete data
    const [organizersData] = React.useState(props.organizers.map((item) => ({
        id: item.id,
        name: `${item.fname} ${item.lname} (${item.id})`
    })))

    return (
        <Formik
            initialValues={{
                countryID: model?.country?.id ?? '',
                organizers: model?.organizers?.map((item) => ({
                    id: item.id,
                    name: `${item.fname} ${item.lname} (${item.id})`
                })) ?? [],
                image: model?.image ?? '',
                link: model?.link ?? '',
                name: model?.name ?? '',
                isRemove: false,
                submit: null,
                // Redirect from create page
                isRedirect: CacheStorage.get(CacheKeys.redirectCreateCity),
                // Array locales
                ...Object.fromEntries(localeFields?.map((field) => [
                    field.fname,
                    model?.locales
                        ?.filter((item) => item.locale === field.locale)
                        ?.[0]
                        ?.['text']
                ])),
            }}
            validationSchema={Yup.object().shape({
                image: Yup.string()
                    .min(3, 'Size must be between 3 and 250.')
                    .max(250, 'Size must be between 3 and 250.')
                    .required('Must not be null and not blank.'),
                countryID: Yup.number()
                    .required('Must not be null and not blank.'),
                link: Yup.string()
                    .min(3, 'Size must be between 3 and 250.')
                    .max(250, 'Size must be between 3 and 250.')
                    .required('Must not be null and not blank.'),
                name: Yup.string()
                        .min(3, 'Size must be between 3 and 250.')
                        .max(250, 'Size must be between 3 and 250.')
                        .required('Must not be null and not blank.'),
                // Array locales
                ...Object.fromEntries(localeFields?.map((field) => [
                    field.fname,
                    field.validate
                ])),
            })}
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
                    const localeRequests = localeFields.map((field) => values[field.fname] ? new Shared.requests.ColumnLocaleRequest(
                        model?.locales?.filter((item) => item.locale === field.locale)?.[0]?.id,
                        values[field.fname],
                        field.locale,
                    ) : null).filter((item) => item !== null)
                    try {
                        const response = Boolean(props.id) ? (
                            await Shared.httpClient.put.editCity(props.id, new Shared.requests.CityRequest(
                                values.countryID,
                                values.image,
                                values.link,
                                values.name,
                                localeRequests,
                                values.organizers.map((item) => item.id),
                                [] // @todo uploads
                            ))
                        ) : (
                            await Shared.httpClient.post.addCity(new Shared.requests.CityRequest(
                                values.countryID,
                                values.image,
                                values.link,
                                values.name,
                                localeRequests,
                                values.organizers.map((item) => item.id),
                                [] // @todo uploads
                            ))
                        )
                        if (!Boolean(props.id)) {
                            CacheStorage.set(CacheKeys.redirectCreateCity, true, true, true)
                            route.toLocationReplace(routes.cityEdit, response.id)
                        } else {
                            setModel(response)
                            setStatus({success: true});
                        }
                    } catch (error) {
                        if (error.code === 403) {
                            setErrors({
                                submit: `For a user with "${roles?.join(', ')}" roles this action is prohibited.`
                            });
                        } else if (error.code === 422 && error.validates !== null) {
                            setErrors({
                                countryID: Helper.findError('countryID', error),
                                organizers: Helper.findError('organizers', error),
                                image: Helper.findError('image', error),
                                link: Helper.findError('link', error),
                                name: Helper.findError('name', error),
                                // Array locales common
                                submit: Helper.findError('locales', error),
                                // Array locales error field
                                ...Object.fromEntries(localeFields.map((field, index) => [
                                    field.fname,
                                    Helper.findError(`locales[${index}].text`, error)
                                ])),
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
                                                alt={`${model?.fname} ${model?.lname}`}
                                                src={model?.image}
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
                                    name={'countryID'}
                                    value={values.countryID}
                                    helperText={touched.countryID && errors.countryID ? errors.countryID : ''}
                                    error={Boolean(touched.countryID && errors.countryID)}
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

                                <Autocomplete
                                    multiple
                                    id="tags-standard"
                                    options={organizersData}
                                    getOptionLabel={(item) => item.name}
                                    value={values.organizers}
                                    onChange={(_, value) => {
                                        setFieldValue('organizers', value)
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            disabled={isSubmitting || (!isAdmin && props.id === undefined)}
                                            type={'text'}
                                            name={'organizers'}
                                            value={values.organizers}
                                            helperText={touched.organizers && errors.organizers ? errors.organizers : ''}
                                            error={Boolean(touched.organizers && errors.organizers)}
                                            fullWidth
                                            label={'Organizers'}
                                            variant="filled"
                                        />
                                    )}
                                />

                                {/* <TextField
                                    disabled={isSubmitting || (!isAdmin && props.id === undefined)}
                                    required
                                    type={'text'}
                                    name={'organizers'}
                                    value={values.organizers}
                                    helperText={touched.organizers && errors.organizers ? errors.organizers : ''}
                                    error={Boolean(touched.organizers && errors.organizers)}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    fullWidth
                                    label={'Organizers'}
                                    variant="filled"
                                    select
                                    SelectProps={{
                                        multiple: true,
                                        renderValue: (selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip
                                                        key={`organizers-${value}`}
                                                        label={props.organizers.filter((e) => e.id === value)[0]['name'] ?? value}
                                                    />
                                                ))}
                                            </Box>
                                        )
                                    }}
                                >
                                    {props.organizers?.map((item) => (
                                        <MenuItem key={`organizers-menu-${item.id}`} value={item.id}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </TextField> */}

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
                                    label={'Name'}
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

                                {/* Array contacts */}
                                {localeFields.map((field) => (
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
                                        disabled={ Boolean(isSubmitting) }
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
    organizers: PropTypes.array.isRequired,
};
