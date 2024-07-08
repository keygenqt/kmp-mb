import {createTheme} from '@mui/material/styles';
import {palette} from "./elements/dark/palette";
import {typography} from "./elements/common/typography";
import {components} from "./elements/common/components";


export const ThemeDark = createTheme({
    palette: palette,
    typography: typography,
    components: components,
});
