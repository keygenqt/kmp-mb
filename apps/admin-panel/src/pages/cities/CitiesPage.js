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
import { Tooltip, Avatar } from '@mui/material';
import { EditOutlined, BrokenImageOutlined } from '@mui/icons-material';
import { GridLayout } from '../../layouts';
import {
    useHttpQuery,
    RouteContext,
    Shared,
} from '../../base';


export function CitiesPage(props) {
    const {route, routes} = React.useContext(RouteContext)
    const rows = useHttpQuery(Shared.queries.cities)

    return (
        <GridLayout
            title='Cities'
            rows={rows?.toArray()}
            onClickAdd={() => {
                route.toLocation(routes.cityAdd)
            }}
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
                                route.toLocation(routes.cityEdit, params.row.id)
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

CitiesPage.propTypes = {};
