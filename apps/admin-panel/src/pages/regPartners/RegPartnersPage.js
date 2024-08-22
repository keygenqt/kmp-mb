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
import { Tooltip, Chip } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { GridLayout } from '../../layouts';
import {
    useHttpQuery,
    RouteContext,
    Shared,
} from '../../base';

export function RegPartnersPage(props) {
    const {route, routes} = React.useContext(RouteContext)
    const rows = useHttpQuery(Shared.queries.registrationPartners)

    return (
        <GridLayout
            title='Registration Partners'
            rows={rows?.toArray()}
            columns={[
                {
                    minWidth: 120,
                    field: 'name',
                    headerName: 'Name',
                    flex: 1,
                    renderCell: (data) => `${data.row.fname} ${data.row.lname} (${data.row.company})`
                },
                {
                    field: 'state',
                    headerName: 'State',
                    width: 140,
                    renderCell: (data) => {
                        if (data.row.state === Shared.RegPartnerState.WAITING) {
                            return (
                                <Chip
                                    label={data.row.state.name}
                                    variant="outlined"
                                    color="warning"
                                />
                            )
                        }
                        if (data.row.state === Shared.RegPartnerState.HOLD) {
                            return (
                                <Chip
                                    label={data.row.state.name}
                                    variant="outlined"
                                    color="info"
                                />
                            )
                        }
                        if (data.row.state === Shared.RegPartnerState.CLOSE) {
                            return (
                                <Chip
                                    label={data.row.state.name}
                                    variant="outlined"
                                    color="error"
                                />
                            )
                        }
                        if (data.row.state === Shared.RegPartnerState.DONE) {
                            return (
                                <Chip
                                    label={data.row.state.name}
                                    variant="outlined"
                                    color="success"
                                />
                            )
                        }
                        return (
                            <Chip label={data.row.state.name} variant="outlined" />
                        )
                    }
                },
                {
                    field: 'updateAt',
                    headerName: 'Update',
                    width: 130,
                    valueGetter: (updateAt) => new Intl
                        .DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                        })
                        .format(Date.parse(updateAt))
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
                                route.toLocation(routes.regPartner, params.row.id)
                            }} icon={(
                                <Tooltip placement="top" arrow title="Edit">
                                    <Visibility/>
                                </Tooltip>
                            )} label="Edit"/>
                        ),
                    ]
                },
            ]}
        />
    )
}

RegPartnersPage.propTypes = {};
