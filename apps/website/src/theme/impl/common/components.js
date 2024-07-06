/**
 * API that enables the use of breakpoints in a wide variety of contexts.
 * @link https://mui.com/material-ui/customization/theme-components/
 */

// elevation={0} enableColorOnDark

export const components = {
    MuiButton: {
        styleOverrides: {
            root: {
                borderRadius: 50,
                boxShadow: 'none !important'
            }
        }
    },
    MuiToolbar: {
        styleOverrides: {
            root: {
                height: 80,
                minHeight: 80,
            }
        }
    }
}
