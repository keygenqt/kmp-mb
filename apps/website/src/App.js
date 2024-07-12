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
import {ThemeLight} from './theme/ThemeLight';
import {ThemeDark} from './theme/ThemeDark';
import {ThemeProvider, Box} from '@mui/material';
import {useCacheStorage, CacheKeys, CacheTypes, RouteContext} from './base';

function App() {
    const {route} = React.useContext(RouteContext)
    const darkMode = useCacheStorage(CacheKeys.darkMode, CacheTypes.bool);
    return (
        <ThemeProvider theme={darkMode ? ThemeDark : ThemeLight}>
            <Box className={'Table ' + (darkMode ? 'ThemeDark' : 'ThemeLight')} sx={{ backgroundColor: 'background.default' }}>
                {route.render()}
            </Box>
        </ThemeProvider>
    );
}

export default App;
