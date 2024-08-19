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
import { Tooltip } from '@mui/material';
import { EditOutlined } from '@mui/icons-material';
import { GridLayout } from '../../layouts';
import {
    useHttpQuery,
    RouteContext,
    Shared,
    CacheKeys,
} from '../../base';


export function DirectionsPage(props) {
    const {route, routes} = React.useContext(RouteContext)
    const rows = useHttpQuery(Shared.queries.directions)

    return (
        <GridLayout
            title='Directions'
            rows={rows?.toArray()}
            onClickAdd={() => {
                route.toLocation(routes.directionAdd)
            }}
            redirect={CacheKeys.redirectRemoveDirection}
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
                                route.toLocation(routes.directionEdit, params.row.id)
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

DirectionsPage.propTypes = {};
