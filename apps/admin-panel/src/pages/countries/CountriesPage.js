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
import { GridActionsCellItem } from "@mui/x-data-grid";
import {
    Box,
    Stack,
    Button,
    Typography,
    Tooltip,
    CircularProgress,
} from '@mui/material';
import {
    Add,
    EditOutlined
} from '@mui/icons-material';
import {
    useHttpQuery,
    RouteContext,
    Shared,
    CustomDataGrid,
} from '../../base';


export function CountriesPage(props) {
    const {route, routes} = React.useContext(RouteContext)
    const countries = useHttpQuery(Shared.queries.countries)

    return (
        <Stack
            spacing={2}
            sx={{width: 1, height: 1}}
            alignItems='center'
            justifyContent={countries === undefined ? 'space-between' : 'flex-start'}
        >
            <Stack spacing={2} direction="row" sx={{width: 1}}>
                <Typography variant="h4" color={'text.primary'}>
                    Countries
                </Typography>
                <Box sx={{ flexGrow: 1 }}/>
                <Button
                    variant="contained"
                    color='white'
                    endIcon={<Add color='text.primary' />}
                    onClick={() => {
                        route.toLocation(routes.country)
                    }}
                >
                    Add
                </Button>
            </Stack>
            {countries === undefined ? (
                <>
                    <CircularProgress size='2.2rem' />
                    <Box/>
                </>
            ) : (
                <CustomDataGrid
                    rows={countries.toArray()}
                    columns={[
                        {
                            minWidth: 120,
                            field: 'name',
                            headerName: 'Name',
                            flex: 1
                        },
                        {
                            field: 'createAt',
                            headerName: 'Created',
                            width: 130,
                            valueGetter: (createAt) => new Intl
                                .DateTimeFormat('en-US', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                })
                                .format(Date.parse(createAt))
                        },
                        {
                            minWidth: 50,
                            field: 'actions',
                            type: 'actions',
                            getActions: (params) => [
                                (
                                    <GridActionsCellItem color="secondary" onClick={() => {
                                        route.toLocation(routes.country, params.row.id)
                                    }} icon={(
                                        <Tooltip placement="top" arrow title="Edit">
                                            <EditOutlined/>
                                        </Tooltip>
                                    )} label="Edit"/>
                                ),
                            ]
                        },
                    ]}
                />
            )}
        </Stack>
    );
}

CountriesPage.propTypes = {};
