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
import {CacheStorage} from '../cache/CacheStorage';
import {useCacheStorage} from './useCacheStorage';


export function useHttpQuery(method, ...arg) {

    const cacheKey = `${method}${arg.length ? arg : ''}`
    const cacheData = useCacheStorage(cacheKey)

    const [value, setValue] = React.useState(cacheData)
    const wasCalled = React.useRef(false)

    React.useEffect(() => {
        setValue(cacheData)
    }, [cacheData])

    React.useEffect(() => {
        if(wasCalled.current) return;
        wasCalled.current = true;
        let funcDelay = async function(startTime) {
            var endTime = performance.now();
            var delay = 1500 - (endTime - startTime)
            if (delay > 0) {
                await new Promise(r => setTimeout(r, delay))
            }
        }
        try {
            // Loading 1.5 second for animation loader
            var startTime = performance.now();
            Shared.httpClient.get[method](arg)
                .then(async (value) => {
                    if (!cacheData) {
                        await funcDelay(startTime)
                    }
                    let mapValue = undefined
                    // Map http query variant
                    switch(method) {
                        case Shared.queries.expert:
                            mapValue = value.mapToUser()
                            break;
                        case Shared.queries.experts:
                            mapValue = value.toArray().mapToUsers()
                            break;
                        case Shared.queries.directions:
                            mapValue = value.toArray().mapToUserDirections()
                            break;
                        case Shared.queries.city:
                            mapValue = value.mapToCity()
                            break;
                        case Shared.queries.cities:
                            mapValue = value.toArray().mapToCities()
                            break;
                        case Shared.queries.countries:
                            mapValue = value.toArray().mapToCountries()
                            break;
                        default:
                            if (typeof value['toArray'] == 'function') {
                                mapValue = value.toArray()
                            } else {
                                mapValue = value
                            }
                    }
                    // Save to cache
                    CacheStorage.set(cacheKey, mapValue)
                })
                .catch(async (e) => {
                    await funcDelay(startTime)
                    CacheStorage.clearByKey(cacheKey, true)
                    setValue(null)
                    console.error(e)
                });
        } catch (e) {
            CacheStorage.clearByKey(cacheKey, true)
            setValue(null)
            console.error(e)
        }
    }, [arg, cacheData, cacheKey, method])

    return value
}
