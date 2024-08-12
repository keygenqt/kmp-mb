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
import {useCacheStorage, CacheStorage, CacheKeys, Shared} from '../../base';


export function useAuthSession() {

    const cacheUserRoles = useCacheStorage(CacheKeys.userRoles)

    const [value, setValue] = React.useState(cacheUserRoles)

    React.useEffect(() => {
        let updateRoles = async function(roles = ["GUEST"]) {
            CacheStorage.set(CacheKeys.userRoles, roles)
            setValue(roles)
        }
        if (cacheUserRoles === null || cacheUserRoles === undefined) {
            try {
                Shared.httpClient.get.authRoles()
                    .then(async (value) => {
                        updateRoles(value.roles?.mapToUserRoles())
                    })
                    .catch(async (e) => {
                        updateRoles()
                        console.error(e)
                    });
            } catch (e) {
                updateRoles()
                console.error(e)
            }
        } else {
            setValue(cacheUserRoles)
        }
    }, [cacheUserRoles, value])

    return value
}
