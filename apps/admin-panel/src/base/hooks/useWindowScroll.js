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
 * @returns {{x: number, y: number}}
 */
export function useWindowScroll(effect = undefined) {

    const [position, setPosition] = React.useState({
        x: window.scrollX,
        y: window.scrollY,
        scrollable: false
    });

    React.useLayoutEffect(() => {
        const el = document.getElementById("root")
        const handleWindowScroll = () => {
            const result = {
                x: el.scrollLeft,
                y: el.scrollTop,
            }
            setPosition(result);
            if (effect !== undefined) {
                effect(result)
            }
        };
        el.addEventListener('scroll', handleWindowScroll);
        return () => {
            el.removeEventListener('scroll', handleWindowScroll);
        };
    });

    return position;
}
