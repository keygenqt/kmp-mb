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
import {CacheStorage} from '../cache/CacheStorage';

export function useCacheStorage(key, defaultValue = undefined) {

    // Clear old cache
    const wasCalled = React.useRef(false)
    React.useEffect(() => {
        if(wasCalled.current) return;
        wasCalled.current = true;
        CacheStorage.clearByVersion()
    }, [])

    const getValueType = React.useCallback(
        () => {
            const value = CacheStorage.get(key)
            if (value !== null && value !== undefined) {
                return value;
            }
            return defaultValue
        }, [defaultValue, key]);

    const [value, setValue] = React.useState(getValueType());

    React.useLayoutEffect(() => {
        const element = document.querySelector('#root');
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.type === "attributes") {
                    setValue(getValueType());
                }
            });
        });
        observer.observe(element, {
            attributes: true
        });
        return () => {
            observer.disconnect()
        };
    }, [getValueType, key]);

    return value;
}
