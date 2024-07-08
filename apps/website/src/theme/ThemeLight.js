import {createTheme} from '@mui/material/styles';
import {palette} from "./elements/light/palette";
import {typography} from "./elements/common/typography";
import {components} from "./elements/common/components";


export const ThemeLight = createTheme({
    palette: palette,
    typography: typography,
    components: components,
});
