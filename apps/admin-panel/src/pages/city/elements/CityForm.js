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
import { v4 as uuidv4 } from 'uuid';
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
} from "@mui/material";
import {
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
    Add,
} from "@mui/icons-material";

function createUploadPath(fileName) {
    if (fileName && !fileName.includes('http')) {
        return `/api/uploads/${fileName}`
    }
    return fileName
}


export function CityForm(props) {
    const theme = useTheme()
    const isSM = useMediaQuery(theme.breakpoints.down('sm'))

    const {route, routes} = React.useContext(RouteContext)
    const [isFormRemove, setIsFormRemove] = React.useState(false)
    const roles = CacheStorage.get(CacheKeys.userRoles)
    const isAdmin = roles?.includes('ADMIN')

    // Update model ids relations from db
    const [model, setModel] = React.useState(props.model)
    // Save state values before refresh by roles
    const [formStateValues, setFormStateValues] = React.useState({})
    // Set success from, state from not working with enableReinitialize
    const [isFormSuccess, setIsFormSuccess] = React.useState(false)
    // Refresh page after create model
    const [isFormRedirect, setIsFormRedirect] = React.useState(CacheStorage.get(CacheKeys.redirectCreateCity))

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

    // Array uploads
    const uploadFieldsGen = React.useCallback(
        () => {
            return model?.uploads?.map((item) => ({
                id: item.id,
                fname: `upload-${item.id}`,
                label: 'Image',
                validate: Yup.string()
                    .min(3, 'Size must be between 3 and 250.')
                    .max(250, 'Size must be between 3 and 250.')
                    .required('Must not be null and not blank.'),
            })) ?? []
        }, [model]);

    const [uploadFields, setUploadFields] = React.useState(uploadFieldsGen())

    // Change state from after change uploads
    React.useEffect(() => {
        setUploadFields(uploadFieldsGen())
    }, [uploadFieldsGen])

    // Autocomplete data
    const [organizersData] = React.useState(props.organizers.map((item) => ({
        id: item.id,
        name: `${item.lname} (${item.id})`
    })))

    // Save data model before refresh form
    const saveStateValues = React.useCallback(
        (values) => {
            setFormStateValues({
                countryID: values?.countryID,
                organizers: values?.organizers,
                image: values?.image,
                link: values?.link,
                name: values?.name,
                // Array locales
                ...Object.fromEntries(localeFields?.map((field) => [
                    field.fname,
                    values[field.fname]
                ])),
                // Array uploads
                ...Object.fromEntries(uploadFields?.map((field) => [
                    field.fname,
                    values[field.fname]
                ])),
            })
        }, [localeFields, uploadFields]);

    return (
        <Formik
            enableReinitialize
            initialValues={{
                countryID: formStateValues.countryID ?? model?.country?.id ?? '',
                organizers: formStateValues.organizers ?? model?.organizers?.map((item) => ({
                    id: item.id,
                    name: `${item.lname} (${item.id})`
                })) ?? [],
                image: formStateValues.image ?? model?.image ?? '',
                link: formStateValues.link ?? model?.link ?? '',
                name: formStateValues.name ?? model?.name ?? '',
                isRemove: false,
                submit: null,
                // Array locales
                ...Object.fromEntries(localeFields?.map((field) => [
                    field.fname,
                    formStateValues[field.fname] ?? model?.locales
                        ?.filter((item) => item.locale === field.locale)
                        ?.[0]
                        ?.['text'] ?? ''
                ])),
                // Array uploads
                ...Object.fromEntries(uploadFields?.map((field) => [
                    field.fname,
                    formStateValues[field.fname] ?? createUploadPath(model?.uploads
                        ?.filter((item) => item.id === field.id)
                        ?.[0]
                        ?.['fileName'])
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
                // Array uploads
                ...Object.fromEntries(uploadFields?.map((field) => [
                    field.fname,
                    field.validate
                ])),
            })}
            onSubmit={async (values, {setErrors, setStatus, setFieldValue}) => {
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
                        await Shared.httpClient.delete.deleteCity(props.id)
                        // Success remove
                        CacheStorage.set(CacheKeys.redirectRemoveCity, true, true, true)
                        route.toLocationReplace(routes.cities)
                    } catch (error) {
                        setErrors({
                            submit: error.message
                        })
                        scrollToTop()
                    }
                } else {
                    // Array locales prepare
                    const localeRequests = localeFields.map((field) => values[field.fname] ? new Shared.requests.ColumnLocaleRequest(
                        model?.locales?.filter((item) => item.locale === field.locale)?.[0]?.id,
                        values[field.fname],
                        field.locale,
                    ) : null).filter((item) => item !== null)

                    // Array contacts prepare
                    const userUploadsIds = uploadFields
                        .map((field) => document.querySelectorAll(`[name="${field.fname}"]`)?.[0]?.dataset?.id ?? null)
                        .filter((item) => item !== null)
                        .filter((item) => !item.includes('new'))

                    try {
                        const response = Boolean(props.id) ? (
                            await Shared.httpClient.put.editCity(props.id, new Shared.requests.CityRequest(
                                values.countryID,
                                values.image,
                                values.link,
                                values.name,
                                localeRequests,
                                values.organizers.map((item) => item.id),
                                userUploadsIds.map((id) => parseInt(id))
                            ))
                        ) : (
                            await Shared.httpClient.post.addCity(new Shared.requests.CityRequest(
                                values.countryID,
                                values.image,
                                values.link,
                                values.name,
                                localeRequests,
                                values.organizers.map((item) => item.id),
                                userUploadsIds.map((id) => parseInt(id))
                            ))
                        )
                        if (!Boolean(props.id)) {
                            CacheStorage.set(CacheKeys.redirectCreateCity, true, true, true)
                            route.toLocationReplace(routes.cityEdit, response.id)
                        } else {
                            setIsFormSuccess(true)
                            setModel(response)
                            scrollToTop()
                        }
                    } catch (error) {
                        if (error.code === 403) {
                            setErrors({
                                submit: `For a user with "${roles?.join(', ')}" roles this action is prohibited.`
                            })
                            scrollToTop()
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

                                {isFormRedirect && (
                                    <AlertSuccess onClear={() => {
                                        CacheStorage.set(CacheKeys.redirectCreateCity, false, true, true)
                                    }}>
                                        Create city successfully.
                                    </AlertSuccess>
                                )}

                                {isFormSuccess && (
                                    <AlertSuccess onClose={() => setIsFormSuccess(false)}>
                                        Update city successfully.
                                    </AlertSuccess>
                                )}

                                <TextFieldFile
                                    disabled={isSubmitting || (props.id === undefined)}
                                    label={'Image'}
                                    name={'image'}
                                    value={values.image}
                                    helperText={touched.image && errors.image ? errors.image : ''}
                                    error={Boolean(touched.image && errors.image)}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />

                                <TextField
                                    disabled={isSubmitting || (props.id === undefined)}
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
                                    isOptionEqualToValue={(options, value) => options.id === value.id}
                                    onChange={(_, value) => {
                                        setFieldValue('organizers', value)
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            disabled={isSubmitting || (props.id === undefined)}
                                            type={'text'}
                                            name={'organizers'}
                                            // value={values.organizers}
                                            helperText={touched.organizers && errors.organizers ? errors.organizers : ''}
                                            error={Boolean(touched.organizers && errors.organizers)}
                                            fullWidth
                                            label={'Organizers'}
                                            variant="filled"
                                        />
                                    )}
                                />

                                <TextField
                                    disabled={isSubmitting || (props.id === undefined)}
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
                                    disabled={isSubmitting || (props.id === undefined)}
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

                                {/* Array locales */}
                                {localeFields.map((field) => (
                                    <TextField
                                        key={`fieldName-${field.fname}`}
                                        disabled={isSubmitting || (props.id === undefined)}
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
                                        Uploads
                                    </Typography>
                                    <Typography variant='caption' color={'text.primary'}>
                                        Upload images of community meetings to be displayed on the site in a carousel.
                                    </Typography>
                                </Stack>

                                <Stack spacing={2} >
                                    {/* Array locales */}
                                    {uploadFields.map((field) => (
                                        <Stack
                                            key={`fieldName-${field.fname}`}
                                            spacing={2}
                                            direction={isSM ? 'column' : 'row'}
                                        >
                                            <Box sx={{width: 1}}>
                                                <TextFieldFile
                                                    id={`${field.id}`}
                                                    disabled={isSubmitting || (props.id === undefined)}
                                                    label={field.label}
                                                    name={field.fname}
                                                    value={values[field.fname] ?? ''}
                                                    helperText={touched[field.fname] && errors[field.fname] ? errors[field.fname] : ''}
                                                    error={Boolean(touched[field.fname] && errors[field.fname])}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                />
                                            </Box>
                                            <Button
                                                sx={{maxHeight: 57}}
                                                variant="outlined"
                                                color={'error'}
                                                onClick={() => {
                                                    var clone = Object.assign({}, model);
                                                    clone.uploads = model.uploads.filter((item) => item.id !== field.id)
                                                    saveStateValues(values)
                                                    setModel(clone)
                                                }}
                                            >
                                                <Delete/>
                                            </Button>
                                        </Stack>
                                    ))}

                                    <Box
                                        sx={{width: isSM ? 1 : 'inherit'}}
                                    >
                                        <Button
                                            sx={{height: isSM ? 'inherit' : 57, width: isSM ? 1 : 'inherit'}}
                                            variant="outlined"
                                            color={'success'}
                                            onClick={() => {
                                                var clone = Object.assign({}, model);
                                                if (!clone.uploads) {
                                                    clone.uploads = []
                                                }
                                                clone.uploads.push({
                                                    id: `new-${uuidv4()}`,
                                                    fileName: null
                                                })
                                                saveStateValues(values)
                                                setModel(clone)
                                            }}
                                        >
                                            <Add/>
                                        </Button>
                                    </Box>
                                </Stack>

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
