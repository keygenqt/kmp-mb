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

import React from 'react';
import {useLocation, useNavigate, useNavigationType} from 'react-router-dom';
import RouteCore from '../route/RouteCore';
import {RouteConf} from '../route/RouteConf';

export const RouteContext = React.createContext({})

export function RouteProvider(props) {

    const location = useLocation()
    const navigate = useNavigate()
    const type = useNavigationType()

    const conf = RouteConf
    const [route] = React.useState(new RouteCore(conf, location, navigate, type));

    route.update(location, navigate, type)

    return (
        <RouteContext.Provider
            value={{
                route,
                routes: conf.routes
            }}>
            {props.children}
        </RouteContext.Provider>
    )
}
