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
import shared from "shared";
import {AppConf} from "../../../conf/AppConf";

const HttpClient = new shared.com.keygenqt.mb.shared.service.ServiceRequestJS(AppConf.apiPath)

export function useHttpQuery(method, ...arg) {
    const [value, setValue] = React.useState(undefined);
    const wasCalled = React.useRef(false);
    React.useEffect(() => {
        if(wasCalled.current) return;
        wasCalled.current = true;

        let funcDelay = async function(startTime) {
            var endTime = performance.now();
            var delay = 1500 - (endTime - startTime)
            if (delay > 0) {
                await new Promise(r => setTimeout(r, delay));
            }
        }

        try {
            // Loading 1.5 second for animation loader
            var startTime = performance.now();
            HttpClient.get[method](arg)
                .then(async (value) => {
                    await funcDelay(startTime)
                    if (typeof value['toArray'] == 'function') {
                        setValue(value.toArray())
                    } else {
                        setValue(value);
                    }
                })
                .catch(async (e) => {
                    await funcDelay(startTime)
                    setValue(null)
                    console.error(e)
                });
        } catch (e) {
            setValue(null)
            console.error(e)
        }
    }, [arg, method]);
    return value;
}
