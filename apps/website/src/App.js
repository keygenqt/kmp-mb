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
