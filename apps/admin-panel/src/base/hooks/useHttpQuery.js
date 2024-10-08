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
import {Shared} from '../shared/Shared';
import {CacheStorage, CacheKeys} from '../../base';

export function useHttpQuery(method, ...arg) {

    const wasCalled = React.useRef(false)
    const [value, setValue] = React.useState(undefined)

    React.useEffect(() => {
        if(wasCalled.current) return;
        wasCalled.current = true;
        try {
            Shared.httpClient.get[method](arg)
                .then(async (value) => {
                    setValue(value)
                })
                .catch(async (e) => {
                    if (e.code === 401) {
                        CacheStorage.clearByKey(CacheKeys.userRoles)
                    } else {
                        setValue(null)
                        console.error('Error catch response')
                    }
                });
        } catch (e) {
            setValue(null)
            console.error('Error catch query')
        }
    }, [arg, method])

    return value
}
