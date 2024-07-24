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

export const Helper = {
    locate: function (object, column, language) {
        for (const key in object['locales']) {
            if (language.split('-')[1] === object['locales'][key]['locale']) {
                if (object['locales'][key].hasOwnProperty('text')) {
                    return object['locales'][key]['text']
                } else if (object['locales'][key].hasOwnProperty(column)) {
                    return object['locales'][key][column]
                }
            }
        }
        return object[column]
    },
};
