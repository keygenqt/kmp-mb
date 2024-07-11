/**
 * API that enables the use of breakpoints in a wide variety of contexts.
 * @link https://mui.com/material-ui/customization/theme-components/
 */
export const components = {
    MuiCard: {
        styleOverrides: {
            root: ({ theme }) =>
                theme.unstable_sx({
                    borderRadius: 5,
                    boxShadow: 'none !important',
                    background: theme.palette.mode === 'dark' ? '#1e1e1e' : '#F9F9F9',
                    border: '1px solid',
                    borderColor: theme.palette.mode === 'dark' ? '#cb8ff747' : '#802aea2b',
                    '& .MuiCardHoverShow': {
                        opacity: '0',
                        transitionDuration: '200ms'
                    },
                    '&:hover .MuiCardHoverShow': {
                        opacity: '1'
                    },
                }),
        }
    },
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
