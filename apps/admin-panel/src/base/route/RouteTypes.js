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

export const RouteTypes = {

    string: 'string',
    number: 'number',
    integer: 'integer',
    float: 'float',
    bool: 'boolean',

    validate: (type, value) => {
        switch (type) {
            case RouteTypes.string:
                return RouteTypes.validateString(value)
            case RouteTypes.number:
                return RouteTypes.validateNumber(value)
            case RouteTypes.integer:
                return RouteTypes.validateInteger(value)
            case RouteTypes.float:
                return RouteTypes.validateFloat(value)
            case RouteTypes.bool:
                return RouteTypes.validateBool(value)
            default:
                return true
        }
    },

    validateString: (value) => {
        return true
    },

    validateNumber: (value) => {
        return RouteTypes.validateInteger(value) || RouteTypes.validateFloat(value)
    },

    validateInteger: (value) => {
        const regexPath = /\d+/ig;
        return value.replace(regexPath, '').length === 0
    },

    validateFloat: (value) => {
        const regexPath = /\d+.\d+/ig;
        return value.replace(regexPath, '').length === 0
    },

    validateBool: (value) => {
        return value === 'true' || value === 'false'
    }
}
