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

import {MD5} from 'crypto-js';

export const CacheStorage = {
    intGet: function (key, defaultValue = 0) {
        return parseInt(localStorage.getItem(key)) ?? defaultValue
    },
    intSet: function (key, value) {
        CacheStorage._setItem(key, value)
    },

    stringGet: function (key, defaultValue = '') {
        return localStorage.getItem(key) ?? defaultValue
    },
    stringSet: function (key, value) {
        CacheStorage._setItem(key, value)
    },

    booleanGet: function (key, defaultValue = false) {
        return localStorage.getItem(key) === null ? defaultValue : localStorage.getItem(key) === 'true'
    },
    booleanSet: function (key, value) {
        CacheStorage._setItem(key, value)
    },

    clearByKey: function (key) {
        localStorage.removeItem(key)
    },
    clearAll: function () {
        localStorage.clear()
    },

    _setItem: function (key, value) {
        localStorage.setItem(key, `${value}`)
        const el = document.querySelector('#root');
        const hash = MD5(CacheStorage._allStorage().toString())
        if (el.dataset.cache !== hash) {
            el.dataset.cache = hash
        }
    },
    _allStorage: function () {
        let values = [],
            keys = Object.keys(localStorage),
            i = keys.length;

        while (i--) {
            values.push(localStorage.getItem(keys[i]));
        }

        return values;
    }
};
