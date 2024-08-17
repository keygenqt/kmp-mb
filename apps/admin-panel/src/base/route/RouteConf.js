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

import {RouteTypes} from './RouteTypes';
import {Route} from 'react-router-dom';
import {BaseLayout} from '../../layouts/BaseLayout';
import {EmptyLayout} from '../../layouts/EmptyLayout';
import {
    CitiesPage,
    CityPage,
    CountriesPage,
    CountryAddPage,
    CountryEditPage,
    DashboardPage,
    DirectionPage,
    DirectionsPage,
    ErrorPage,
    LoginPage,
    RegExpertPage,
    RegExpertsPage,
    RegOrganizerPage,
    RegOrganizersPage,
    RegPartnerPage,
    RegPartnersPage,
    UserPage,
    UsersPage,
} from "../../pages";

export const RouteConf = {
    delay: 200,
    routes: {
        cities: {
            path: '/cities',
            render: function (key, path) {
                return <Route
                    key={key}
                    exact
                    path={path}
                    element={
                        <BaseLayout isCenter={false} className={'CitiesPage'}>
                            <CitiesPage/>
                        </BaseLayout>
                    }
                />
            }
        },
        cityAdd: {
            path: '/cities/add',
            render: function (key, path) {
                return <Route
                    key={key}
                    exact
                    path={path}
                    element={
                        <BaseLayout isCenter={true} className={'CityPage'}>
                            <CityPage/>
                        </BaseLayout>
                    }
                />
            }
        },
        cityEdit: {
            path: '/cities/:id',
            match: {
                id: RouteTypes.integer,
            },
            render: function (key, path) {
                return <Route
                    key={key}
                    exact
                    path={path}
                    element={
                        <BaseLayout isCenter={true} className={'CityPage'}>
                            <CityPage/>
                        </BaseLayout>
                    }
                />
            }
        },
        countries: {
            path: '/countries',
            render: function (key, path) {
                return <Route
                    key={key}
                    exact
                    path={path}
                    element={
                        <BaseLayout isCenter={false} className={'CountriesPage'}>
                            <CountriesPage/>
                        </BaseLayout>
                    }
                />
            }
        },
        countryAdd: {
            path: '/countries/add',
            render: function (key, path) {
                return <Route
                    key={key}
                    exact
                    path={path}
                    element={
                        <BaseLayout isCenter={false} className={'CountryPage'}>
                            <CountryAddPage/>
                        </BaseLayout>
                    }
                />
            }
        },
        countryEdit: {
            path: '/countries/:id',
            match: {
                id: RouteTypes.integer,
            },
            render: function (key, path) {
                return <Route
                    key={key}
                    exact
                    path={path}
                    element={
                        <BaseLayout isCenter={false} className={'CountryPage'}>
                            <CountryEditPage/>
                        </BaseLayout>
                    }
                />
            }
        },
        dashboard: {
            path: '/',
            render: function (key, path) {
                return <Route
                    key={key}
                    exact
                    path={path}
                    element={
                        <BaseLayout isCenter={false} className={'DashboardPage'}>
                            <DashboardPage/>
                        </BaseLayout>
                    }
                />
            }
        },
        directions: {
            path: '/directions',
            render: function (key, path) {
                return <Route
                    key={key}
                    exact
                    path={path}
                    element={
                        <BaseLayout isCenter={false} className={'DirectionsPage'}>
                            <DirectionsPage/>
                        </BaseLayout>
                    }
                />
            }
        },
        directionAdd: {
            path: '/directions/add',
            render: function (key, path) {
                return <Route
                    key={key}
                    exact
                    path={path}
                    element={
                        <BaseLayout isCenter={true} className={'DirectionPage'}>
                            <DirectionPage/>
                        </BaseLayout>
                    }
                />
            }
        },
        directionEdit: {
            path: '/directions/:id',
            match: {
                id: RouteTypes.integer,
            },
            render: function (key, path) {
                return <Route
                    key={key}
                    exact
                    path={path}
                    element={
                        <BaseLayout isCenter={true} className={'DirectionPage'}>
                            <DirectionPage/>
                        </BaseLayout>
                    }
                />
            }
        },
        404: {
            path: '*',
            render: function (key, path) {
                return <Route
                    key={key}
                    exact
                    path={path}
                    element={
                        <BaseLayout isCenter={true} className={'ErrorPage'}>
                            <ErrorPage/>
                        </BaseLayout>
                    }
                />
            }
        },
        login: {
            path: '/login',
            render: function (key, path) {
                return <Route
                    key={key}
                    exact
                    path={path}
                    element={
                        <EmptyLayout isCenter={true} className={'LoginPage'}>
                            <LoginPage/>
                        </EmptyLayout>
                    }
                />
            }
        },
        regExpert: {
            path: '/reg-expert/:id',
            match: {
                id: RouteTypes.integer,
            },
            render: function (key, path) {
                return <Route
                    key={key}
                    exact
                    path={path}
                    element={
                        <BaseLayout isCenter={true} className={'RegExpertPage'}>
                            <RegExpertPage/>
                        </BaseLayout>
                    }
                />
            }
        },
        regExperts: {
            path: '/reg-experts',
            render: function (key, path) {
                return <Route
                    key={key}
                    exact
                    path={path}
                    element={
                        <BaseLayout isCenter={false} className={'RegExpertsPage'}>
                            <RegExpertsPage/>
                        </BaseLayout>
                    }
                />
            }
        },
        regOrganizer: {
            path: '/reg-organizer/:id',
            match: {
                id: RouteTypes.integer,
            },
            render: function (key, path) {
                return <Route
                    key={key}
                    exact
                    path={path}
                    element={
                        <BaseLayout isCenter={true} className={'RegOrganizerPage'}>
                            <RegOrganizerPage/>
                        </BaseLayout>
                    }
                />
            }
        },
        regOrganizers: {
            path: '/reg-organizers',
            render: function (key, path) {
                return <Route
                    key={key}
                    exact
                    path={path}
                    element={
                        <BaseLayout isCenter={false} className={'RegOrganizersPage'}>
                            <RegOrganizersPage/>
                        </BaseLayout>
                    }
                />
            }
        },
        regPartner: {
            path: '/reg-partner/:id',
            match: {
                id: RouteTypes.integer,
            },
            render: function (key, path) {
                return <Route
                    key={key}
                    exact
                    path={path}
                    element={
                        <BaseLayout isCenter={true} className={'RegPartnerPage'}>
                            <RegPartnerPage/>
                        </BaseLayout>
                    }
                />
            }
        },
        regPartners: {
            path: '/reg-partners',
            render: function (key, path) {
                return <Route
                    key={key}
                    exact
                    path={path}
                    element={
                        <BaseLayout isCenter={false} className={'RegPartnersPage'}>
                            <RegPartnersPage/>
                        </BaseLayout>
                    }
                />
            }
        },
        users: {
            path: '/users',
            render: function (key, path) {
                return <Route
                    key={key}
                    exact
                    path={path}
                    element={
                        <BaseLayout isCenter={false} className={'UsersPage'}>
                            <UsersPage/>
                        </BaseLayout>
                    }
                />
            }
        },
        userAdd: {
            path: '/users/add',
            render: function (key, path) {
                return <Route
                    key={key}
                    exact
                    path={path}
                    element={
                        <BaseLayout isCenter={true} className={'UserPage'}>
                            <UserPage/>
                        </BaseLayout>
                    }
                />
            }
        },
        userEdit: {
            path: '/users/:id',
            match: {
                id: RouteTypes.integer,
            },
            render: function (key, path) {
                return <Route
                    key={key}
                    exact
                    path={path}
                    element={
                        <BaseLayout isCenter={true} className={'UserPage'}>
                            <UserPage/>
                        </BaseLayout>
                    }
                />
            }
        },
    },
}
