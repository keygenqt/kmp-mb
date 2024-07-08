import {useCallback, useLayoutEffect, useState} from "react";
import {CacheTypes} from "./CacheTypes";
import {CacheStorage} from "./CacheStorage";


export function useCacheStorage(key, valueType = CacheTypes.string, defaultValue = null) {
    const getValueType = useCallback(
        () => {
            switch (valueType) {
                case CacheTypes.bool:
                    return CacheStorage.booleanGet(key, defaultValue)
                case CacheTypes.integer:
                    return CacheStorage.intGet(key, defaultValue)
                default:
                    return CacheStorage.stringGet(key, defaultValue)
            }
        }, [defaultValue, key, valueType]);

    const [value, setValue] = useState(getValueType());

    useLayoutEffect(() => {
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
    }, [getValueType, key, valueType]);

    return value;
}
