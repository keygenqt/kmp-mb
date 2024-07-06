import {createTheme} from '@mui/material/styles';
import {palette} from "./impl/dark/palette";
import {typography} from "./impl/common/typography";
import {components} from "./impl/common/components";


export const ThemeDark = createTheme({
    palette: palette,
    typography: typography,
    components: components,
});
