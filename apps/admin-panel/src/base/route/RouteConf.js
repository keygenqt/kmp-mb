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
import {RouteTypes} from './RouteTypes'
import {
    ErrorPage,
    DashboardPage,
} from "../../pages";

export const RouteConf = {
    delay: 200,
    routes: {
        dashboard: {
            path: '/',
            match: {
                id: RouteTypes.integer,
            },
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
    },
}
