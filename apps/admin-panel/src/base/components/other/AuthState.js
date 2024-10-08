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
import {Box} from '@mui/material';
import {
    useAuthSession,
    useCacheStorage,
    CacheKeys,
    RouteContext,
    DataImages
} from '../../../base';

export function AuthState(props) {
    const {route, routes} = React.useContext(RouteContext)

    const userRoles = useAuthSession()
    const darkMode = useCacheStorage(CacheKeys.darkMode, false, false)

    React.useEffect(() => {
        if (userRoles && userRoles[0] === 'GUEST' && !route.isPage(routes.login)) {
            route.toLocationReplace(routes.login)
        }
        else if (userRoles && userRoles[0] !== 'GUEST' && route.isPage(routes.login)) {
            route.toLocationReplace(routes.home)
        }
    }, [route, routes, userRoles])

    return (
        !userRoles
        || (userRoles[0] === 'GUEST' && !route.isPage(routes.login))
        || (userRoles[0] !== 'GUEST' && route.isPage(routes.login)) ? (
            <Box sx={{
                backgroundColor: darkMode ? '#343038' : '#FAF6FE',
                position: 'absolute',
                right: 0,
                left: 0,
                top: 0,
                bottom: 0,
                zIndex: 99
            }}>
                <img style={{
                    position: 'absolute',
                    right: 0,
                    left: 0,
                    top: 0,
                    bottom: 0,
                    margin: 'auto',
                    width: 135
                }} src={DataImages.logo} alt="logo"/>
            </Box>
        ) : null
    );
}

AuthState.propTypes = {};
