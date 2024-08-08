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
import {
    Stack,
    Divider,
    MenuList,
    MenuItem,
    ListItemText,
    ListItemIcon,
    Typography,
} from '@mui/material';
import {
    PieChart,
    PeopleAlt,
    Public,
    Mediation,
    Apartment,
    AppRegistration,
} from '@mui/icons-material';
import {
    RouteContext,
} from '../../base';


export function Menu(props) {
    const {route, routes} = React.useContext(RouteContext)

    return (
        <Stack
            spacing={2}
            sx={{
                '& .MuiDivider-root': {
                    marginTop: '16px !important',
                    marginBottom: '16px !important',
                },
                '& .GroupInfo .MuiTypography-caption': {
                    marginBottom: '10px'
                },
                '& .MuiButtonBase-root': {
                    borderRadius: 2,
                    paddingTop: 1,
                    paddingBottom: 1
                }
            }}
        >
            <MenuList>

                <MenuItem selected={route.isPage(routes.dashboard)}>
                    <ListItemIcon>
                        <PieChart fontSize="small" />
                    </ListItemIcon>
                    <Typography noWrap variant="inherit" color={'text.primary'}>
                        Dashboard
                    </Typography>
                </MenuItem>

                <Divider />

                <Stack spacing={1} className='GroupInfo'>
                    <Typography noWrap variant="h6" color={'text.primary'}>
                        Community
                    </Typography>
                    <Typography variant="caption" color={'text.primary'}>
                        Manage your community in this section.
                    </Typography>
                </Stack>

                <MenuItem>
                    <ListItemIcon>
                        <Public fontSize="small" />
                    </ListItemIcon>
                    <Typography noWrap variant="inherit" color={'text.primary'}>
                        Countries
                    </Typography>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Apartment fontSize="small" />
                    </ListItemIcon>
                    <Typography noWrap variant="inherit" color={'text.primary'}>
                        Cities
                    </Typography>
                </MenuItem>

                <Divider />

                <Stack spacing={1} className='GroupInfo'>
                    <Typography noWrap variant="h6" color={'text.primary'}>
                        Users
                    </Typography>
                    <Typography variant="caption" color={'text.primary'}>
                        Manage users, their rights and roles.
                    </Typography>
                </Stack>

                <MenuItem>
                    <ListItemIcon>
                        <Mediation fontSize="small" />
                    </ListItemIcon>
                    <Typography noWrap variant="inherit" color={'text.primary'}>
                        Directions
                    </Typography>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <PeopleAlt fontSize="small" />
                    </ListItemIcon>
                    <Typography noWrap variant="inherit" color={'text.primary'}>
                        Users
                    </Typography>
                </MenuItem>

                <Divider />

                <Stack spacing={1} className='GroupInfo'>
                    <Typography noWrap variant="h6" color={'text.primary'}>
                        Registrations
                    </Typography>
                    <Typography variant="caption" color={'text.primary'}>
                    Process applications received from the site.
                    </Typography>
                </Stack>

                <MenuItem>
                    <ListItemIcon>
                        <AppRegistration fontSize="small" />
                    </ListItemIcon>
                    <Typography noWrap variant="inherit" color={'text.primary'}>
                        Experts
                    </Typography>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <AppRegistration fontSize="small" />
                    </ListItemIcon>
                    <Typography noWrap variant="inherit" color={'text.primary'}>
                        Organizers
                    </Typography>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <AppRegistration fontSize="small" />
                    </ListItemIcon>
                    <Typography noWrap variant="inherit" color={'text.primary'}>
                        Partners
                    </Typography>
                </MenuItem>

                <Divider />

                <MenuItem>
                    <ListItemText>
                        <Typography noWrap variant="inherit" color={'text.primary'}>
                        To Website
                        </Typography>
                    </ListItemText>
                </MenuItem>
            </MenuList>
        </Stack>
    );
}

Menu.propTypes = {};
