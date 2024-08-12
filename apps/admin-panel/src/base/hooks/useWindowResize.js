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

import React from 'react';

/**
 * Get windows size
 *
 * @returns {{width: number, height: number}}
 */
export function useWindowResize() {

    const [size, setSize] = React.useState({
        width: window.innerWidth,
        height: window.innerHeight,
        scrollable: false
    });

    React.useLayoutEffect(() => {

        const handleWindowResize = () => {
            const el = document.getElementById("root")
            const result = {
                width: window.innerWidth,
                height: window.innerHeight,
                scrollable: el.scrollHeight > el.clientHeight
            }
            setSize(result);
        };

        window.addEventListener('resize', handleWindowResize);

        setTimeout(function () {
            handleWindowResize()
        }, 50);
        setTimeout(function () {
            handleWindowResize()
        }, 150);
        setTimeout(function () {
            handleWindowResize()
        }, 300);
        setTimeout(function () {
            handleWindowResize()
        }, 600);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return size;
}
