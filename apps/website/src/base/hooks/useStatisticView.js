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


export function useStatisticView(pageKey, id = null) {
    const wasCalled = React.useRef(false)
    React.useEffect(() => {
        if(wasCalled.current) return;
        wasCalled.current = true;
        try {
            Shared.httpClient.post.sendStatisticView(new Shared.requests.StatisticViewRequest(
                CacheStorage.getUniqueId(),
                pageKey,
                id,
            )).catch(async (e) => {
                console.error(e)
            });
        } catch (e) {
            console.error(e)
        }
    }, [id, pageKey])
}
