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
import LZString from "lz-string"
import { v4 as uuidv4 } from 'uuid';


export const CacheStorage = {
    // Version up for clear old cache
    version: 7,

    set: function (key, value, isCrypto = true, quiet = false) {
        key = `${key}-${CacheStorage.version}`
        if (typeof value == 'object') {
            CacheStorage._setItem(key, JSON.stringify(value), isCrypto, quiet)
        } else {
            CacheStorage._setItem(key, `${value}`, isCrypto, quiet)
        }
    },

    get: function(key, isCrypto = true) {
        key = `${key}-${CacheStorage.version}`
        // Check version cache
        CacheStorage.clearByVersion()
        // Get value
        const data = CacheStorage._getItem(key, isCrypto)
        // Is empty
        if (data === null || data === undefined) {
            return undefined
        }
        // Array & Object
        if (data[0] === '[' || data[0] === '{') {
            return JSON.parse(data)
        }
        // Bool
        else if (data === 'true' || data === 'false') {
            return data === 'true'
        }
        // Int
        else if (/^-?\d+$/.test(data)) {
            return parseInt(data)
        }
        // String
        return data
    },

    clearByKey: function (key, quiet = false) {
        const hashKey = MD5(`${key}-${CacheStorage.version}`)
        localStorage.removeItem(hashKey)
        if (!quiet) {
            CacheStorage._updateHash()
        }
    },

    clearAll: function (quiet = false) {
        localStorage.clear()
        if (!quiet) {
            CacheStorage._updateHash()
        }
    },

    getUniqueId: function () {
        const data = CacheStorage._getItem("uniqueId", true)
        if (data === null || data === undefined) {
            const genUniqueId = uuidv4()
            CacheStorage._setItem("uniqueId", genUniqueId, true, true)
            return genUniqueId;
        }
        return data;
    },

    clearByVersion: function () {
        const uniqueId = CacheStorage.getUniqueId()
        const data = CacheStorage._getItem("version", true)
        if (data !== `${CacheStorage.version}`) {
            localStorage.clear()
            CacheStorage._setItem("uniqueId", `${uniqueId}`, true, true)
            CacheStorage._setItem("version", `${CacheStorage.version}`, true, true)
        }
    },

    // Private
    _getItem: function (key, isCrypto) {
        const val = localStorage.getItem(MD5(key))
        if (isCrypto) {
            return val ? LZString.decompress(val) : undefined
        } else {
            return val
        }
    },

    _setItem: function (key, value, isCrypto, quiet) {
        const valueKey = MD5(key)
        if (isCrypto) {
            localStorage.setItem(valueKey, LZString.compress(value))
        } else {
            localStorage.setItem(valueKey, value)
        }
        if (!quiet) {
            CacheStorage._updateHash()
        }
    },

    _updateHash: function() {
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
            values.push(LZString.decompress(localStorage.getItem(keys[i])));
        }

        return values;
    }
};
