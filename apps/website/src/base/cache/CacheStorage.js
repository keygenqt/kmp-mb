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
