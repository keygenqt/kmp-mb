import * as React from 'react';
import {ThemeLight} from "./theme/ThemeLight";
import {ThemeDark} from "./theme/ThemeDark";
import {
    ConstantImages,
    LanguageContext
} from "./base";
import {
    useTheme,
    useMediaQuery,
    Container,
    ThemeProvider,
    AppBar,
    Toolbar,
    IconButton,
    Button,
    Box,
    Stack,
    Avatar,
    Grid,
    Typography,
    Divider,
    ButtonGroup
} from "@mui/material";

import {
    Brightness5Outlined,
    Brightness4Outlined
} from '@mui/icons-material';



function App() {

    const theme = useTheme()
    const isLG = useMediaQuery(theme.breakpoints.down('lg'));

    const [darkMode, setDarkMode] = React.useState(false);
    const {t, i18n, isLocEn} = React.useContext(LanguageContext)

    return (
        <ThemeProvider theme={darkMode ? ThemeDark : ThemeLight}>
        <Box className={"Table " + (darkMode ? 'ThemeDark' : 'ThemeLight')} sx={{ backgroundColor: 'background.default' }}>
            <Box className={"Table-Row"}>
                <Box className={"Table-Cell Header"} sx={{height: 0}}>
                    <AppBar position="relative" color={'transparent'} elevation={0}>
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2, padding: 0, marginLeft: '-4px', marginRight: 0}}
                            >
                                <Avatar
                                    alt={'Logo'}
                                    src={ConstantImages.common.logo}
                                    sx={{
                                        width: isLG ? 50 : 60,
                                        height: isLG ? 50 : 60,
                                        '& .MuiAvatar-img': {
                                            width: isLG ? 36 : 46,
                                            height: isLG ? 36 : 46,
                                            objectFit: 'contain',
                                            padding: '4px',
                                            paddingBottom: '8px'
                                        },
                                    }}
                                />
                            </IconButton>

                            <Box sx={{ flexGrow: 1 }}/>

                            <Stack
                                direction="row"
                                spacing={isLG ? 0.5 : 2}
                            >

                                <Button color="primary">
                                    {t('layouts.header.t_community')}
                                </Button>

                                <Button color="primary">
                                    {t('layouts.header.t_experts')}
                                </Button>

                                <Divider orientation="vertical" flexItem />

                                <ButtonGroup
                                    color={'primary'}
                                    size="small"
                                    variant="text"
                                    aria-label="Mode"
                                >
                                    <Button
                                        onClick={() => {
                                            setDarkMode(!darkMode)
                                        }}
                                    >
                                        {darkMode ? (
                                            <Brightness4Outlined/>
                                        ) : (
                                            <Brightness5Outlined/>
                                        )}
                                    </Button>
                                </ButtonGroup>

                            </Stack>
                        </Toolbar>
                    </AppBar>
                </Box>
            </Box>
            <Box className={"Table-Row"}>
                <Box className={"Table-Cell"} sx={{paddingTop: 6, paddingBottom: 6}}>
                    <Container maxWidth="lg">
                        <Box sx={{ textAlign: isLG ? 'center' : 'inherit', overflow: 'hidden' }} >
                            <Grid
                                container
                                spacing={{lg: 5}}
                                rowSpacing={8}
                            >
                                <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                                    <Stack spacing={2}>
                                        <Typography variant="h2" color={'text.primary'}>
                                            {t('pages.home.t_block_1_title')}
                                        </Typography>

                                        <Typography variant="text1" color={'text.primary'}>
                                            {t('pages.home.t_block_1_text')}
                                        </Typography>

                                        <Box>
                                            <Button variant="contained">
                                                {t('pages.home.t_block_1_button')}
                                            </Button>
                                        </Box>
                                    </Stack>
                                </Grid>
                                <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                                    <Box sx={{width: '100%', textAlign: 'center'}}>
                                        <img style={{width: '100%', maxWidth: '600px'}} src={ConstantImages.home.map} alt="Map" />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                </Box>
            </Box>
            <Box className={"Table-Row"} sx={{height: 0}}>
                <Box className={"Table-Cell"}>
                    <Box className={"Footer"}>
                        <Stack spacing={4} alignItems="center">
                            <img src={ConstantImages.common.logo} alt="Logo" />

                            <Box>
                                {t('layouts.footer.t_copyright')}
                            </Box>

                            <ButtonGroup
                                color={'white'}
                                size="small"
                                sx={{
                                    '& .Mui-disabled': {
                                        color: '#ffffff73 !important',
                                        border: '1px solid #ffffff73 !important',
                                    }
                                }}
                            >
                                <Button
                                    disabled={isLocEn}
                                    onClick={() => {
                                        i18n.changeLanguage('en')
                                    }}
                                >
                                    <Typography>en</Typography>
                                </Button>

                                <Button
                                    disabled={!isLocEn}
                                    onClick={() => {
                                        i18n.changeLanguage('ru')
                                    }}
                                >
                                    <Typography>ru</Typography>
                                </Button>
                            </ButtonGroup>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Box>
        </ThemeProvider>
    );
}

export default App;
