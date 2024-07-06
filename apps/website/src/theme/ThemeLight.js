import {createTheme} from '@mui/material/styles';
import {palette} from "./impl/light/palette";
import {typography} from "./impl/common/typography";
import {components} from "./impl/common/components";


export const ThemeLight = createTheme({
    palette: palette,
    typography: typography,
    components: components,
});
