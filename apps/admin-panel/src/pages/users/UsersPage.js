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
import { Tooltip, Avatar, Chip } from '@mui/material';
import { EditOutlined, BrokenImageOutlined } from '@mui/icons-material';
import { GridLayout } from '../../layouts';
import {
    useHttpQuery,
    RouteContext,
    Shared,
    CacheKeys,
} from '../../base';


export function UsersPage(props) {
    const {route, routes} = React.useContext(RouteContext)
    const rows = useHttpQuery(Shared.queries.users)

    return (
        <GridLayout
            title='Users'
            rows={rows?.toArray()}
            onClickAdd={() => {
                route.toLocation(routes.userAdd)
            }}
            redirect={CacheKeys.redirectRemoveUser}
            columns={[
                {
                    field: 'image',
                    headerName: 'Image',
                    minWidth: 70,
                    disableColumnMenu: true,
                    sortable: false,
                    renderCell: (data) => <Avatar
                        alt={'Icon'}
                        src={data.row.image}
                        sx={{width: 24, height: 24, marginLeft: '5px'}}
                    >
                        <BrokenImageOutlined sx={{width: 18, height: 18}}/>
                    </Avatar>
                },
                {
                    minWidth: 120,
                    field: 'name',
                    headerName: 'Name',
                    flex: 1,
                    renderCell: (data) => `${data.row.fname} ${data.row.lname}`
                },
                {
                    field: 'roles',
                    headerName: 'Roles',
                    width: 190,
                    renderCell: (data) => {
                        const roles = data.row.roles.join(', ')
                        if (roles.includes('ADMIN')) {
                            return (
                                <Chip label={roles} variant="outlined" color="error" />
                            )
                        }
                        if (roles.includes('EXPERT')) {
                            return (
                                <Chip label={roles} variant="outlined" color="success" />
                            )
                        }
                        if (roles.includes('ORGANIZER')) {
                            return (
                                <Chip label={roles} variant="outlined" color="info" />
                            )
                        }
                        return (
                            <Chip label={roles} variant="outlined" />
                        )
                    }
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
                                route.toLocation(routes.userEdit, params.row.id)
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
    )
}

UsersPage.propTypes = {};
