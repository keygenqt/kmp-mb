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

                <MenuItem
                    selected={route.isPage(routes.dashboard)}
                    onClick={() => {
                        if (route.isPage(routes.dashboard)) {
                            route.refreshPage()
                        } else {
                            route.toLocation(routes.dashboard)
                        }
                    }}
                >
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

                <MenuItem
                    selected={route.isPage(routes.countries) || route.isPage(routes.country)}
                    onClick={() => {
                        if (route.isPage(routes.countries)) {
                            route.refreshPage()
                        } else if (route.isPage(routes.country)) {
                            route.toBack()
                        } else {
                            route.toLocation(routes.countries)
                        }
                    }}
                >
                    <ListItemIcon>
                        <Public fontSize="small" />
                    </ListItemIcon>
                    <Typography noWrap variant="inherit" color={'text.primary'}>
                        Countries
                    </Typography>
                </MenuItem>
                <MenuItem
                    selected={route.isPage(routes.cities) || route.isPage(routes.city)}
                    onClick={() => {
                        if (route.isPage(routes.cities)) {
                            route.refreshPage()
                        } else if (route.isPage(routes.city)) {
                            route.toBack()
                        } else {
                            route.toLocation(routes.cities)
                        }
                    }}
                >
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

                <MenuItem
                    selected={route.isPage(routes.directions) || route.isPage(routes.direction)}
                    onClick={() => {
                        if (route.isPage(routes.directions)) {
                            route.refreshPage()
                        } else if (route.isPage(routes.direction)) {
                            route.toBack()
                        } else {
                            route.toLocation(routes.directions)
                        }
                    }}
                >
                    <ListItemIcon>
                        <Mediation fontSize="small" />
                    </ListItemIcon>
                    <Typography noWrap variant="inherit" color={'text.primary'}>
                        Directions
                    </Typography>
                </MenuItem>
                <MenuItem
                    selected={route.isPage(routes.users) || route.isPage(routes.user)}
                    onClick={() => {
                        if (route.isPage(routes.users)) {
                            route.refreshPage()
                        } else if (route.isPage(routes.user)) {
                            route.toBack()
                        } else {
                            route.toLocation(routes.users)
                        }
                    }}
                >
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

                <MenuItem
                    selected={route.isPage(routes.regExperts) || route.isPage(routes.regExpert)}
                    onClick={() => {
                        if (route.isPage(routes.regExperts)) {
                            route.refreshPage()
                        } else if (route.isPage(routes.regExpert)) {
                            route.toBack()
                        } else {
                            route.toLocation(routes.regExperts)
                        }
                    }}
                >
                    <ListItemIcon>
                        <AppRegistration fontSize="small" />
                    </ListItemIcon>
                    <Typography noWrap variant="inherit" color={'text.primary'}>
                        Experts
                    </Typography>
                </MenuItem>
                <MenuItem
                    selected={route.isPage(routes.regOrganizers) || route.isPage(routes.regOrganizer)}
                    onClick={() => {
                        if (route.isPage(routes.regOrganizers)) {
                            route.refreshPage()
                        } else if (route.isPage(routes.regOrganizer)) {
                            route.toBack()
                        } else {
                            route.toLocation(routes.regOrganizers)
                        }
                    }}
                >
                    <ListItemIcon>
                        <AppRegistration fontSize="small" />
                    </ListItemIcon>
                    <Typography noWrap variant="inherit" color={'text.primary'}>
                        Organizers
                    </Typography>
                </MenuItem>
                <MenuItem
                    selected={route.isPage(routes.regPartners) || route.isPage(routes.regPartner)}
                    onClick={() => {
                        if (route.isPage(routes.regPartners)) {
                            route.refreshPage()
                        } else if (route.isPage(routes.regPartner)) {
                            route.toBack()
                        } else {
                            route.toLocation(routes.regPartners)
                        }
                    }}
                >
                    <ListItemIcon>
                        <AppRegistration fontSize="small" />
                    </ListItemIcon>
                    <Typography noWrap variant="inherit" color={'text.primary'}>
                        Partners
                    </Typography>
                </MenuItem>

                <Divider />

                <MenuItem
                    onClick={() => {
                        route.openUrlNewTab("https://mb.keygenqt.com/")
                    }}
                >
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
