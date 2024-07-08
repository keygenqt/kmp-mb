import * as React from 'react';
import {ThemeLight} from './theme/ThemeLight';
import {ThemeDark} from './theme/ThemeDark';
import {ThemeProvider, Box} from '@mui/material';
import {useCacheStorage, CacheKeys, CacheTypes} from './base';

import {BaseLayout} from './layouts/BaseLayout';
import {HomePage} from './pages/home/HomePage';


function App() {
    const darkMode = useCacheStorage(CacheKeys.darkMode, CacheTypes.bool);
    return (
        <ThemeProvider theme={darkMode ? ThemeDark : ThemeLight}>
            <Box className={'Table ' + (darkMode ? 'ThemeDark' : 'ThemeLight')} sx={{ backgroundColor: 'background.default' }}>
                <BaseLayout>
                    <HomePage/>
                </BaseLayout>
            </Box>
        </ThemeProvider>
    );
}

export default App;
