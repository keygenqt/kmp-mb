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

import {Route} from 'react-router-dom';
import {BaseLayout} from '../../layouts/BaseLayout';
import {EmptyLayout} from '../../layouts/EmptyLayout';
import {
    CitiesPage,
    CountriesPage,
    DashboardPage,
    DirectionsPage,
    ErrorPage,
    LoginPage,
    RegExpertsPage,
    RegOrganizersPage,
    RegPartnersPage,
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
                        <BaseLayout isCenter={true} className={'CitiesPage'}>
                            <CitiesPage/>
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
                        <BaseLayout isCenter={true} className={'CountriesPage'}>
                            <CountriesPage/>
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
                        <BaseLayout isCenter={true} className={'DashboardPage'}>
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
                        <BaseLayout isCenter={true} className={'DirectionsPage'}>
                            <DirectionsPage/>
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
        regExperts: {
            path: '/reg-experts',
            render: function (key, path) {
                return <Route
                    key={key}
                    exact
                    path={path}
                    element={
                        <BaseLayout isCenter={true} className={'RegExpertsPage'}>
                            <RegExpertsPage/>
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
                        <BaseLayout isCenter={true} className={'RegOrganizersPage'}>
                            <RegOrganizersPage/>
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
                        <BaseLayout isCenter={true} className={'RegPartnersPage'}>
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
                        <BaseLayout isCenter={true} className={'UsersPage'}>
                            <UsersPage/>
                        </BaseLayout>
                    }
                />
            }
        },
    },
}
