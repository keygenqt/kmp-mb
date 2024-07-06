import * as React from 'react';
import {ThemeLight} from "./theme/ThemeLight";
import {ConstantImages} from "./base";
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
    Typography
} from "@mui/material";


function App() {

    const theme = useTheme()
    const isLG = useMediaQuery(theme.breakpoints.down('lg'));

    return (
        <ThemeProvider theme={ThemeLight}>
        <Box className={"Table"}>
            <Box className={"Table-Row"}>
                <Box className={"Table-Cell"} sx={{height: 0}}>
                    <AppBar position="relative" color={'transparent'} elevation={0}>
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2, padding: 0, marginLeft: '-4px'}}
                            >
                                <Avatar
                                    alt={'Logo'}
                                    src={ConstantImages.common.logo}
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        '& .MuiAvatar-img': {
                                            width: 46,
                                            height: 46,
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
                                spacing={2}
                            >
                                <Button color="inherit">Сообщество</Button>
                                <Button color="inherit">Эксперты</Button>
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
                                        <Typography variant="h2">
                                            Mobile Broadcast
                                        </Typography>

                                        <Typography variant="text1">
                                            Это международное сообщество для всех, кто увлечен мобильной разработкой. Это место, где границы между платформами стираются, и единственное, что имеет значение – ваш интерес и страсть к мобильным технологиям.
                                        </Typography>

                                        <Box>
                                            <Button variant="contained">
                                                Вступить в сообщество
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
                        <Stack spacing={4}>
                            <img src={ConstantImages.common.logo} alt="Logo" />
                            <Box>
                                © Mobile Broadcast 2024
                            </Box>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Box>
        </ThemeProvider>
    );
}

export default App;
