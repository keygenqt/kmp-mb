import * as React from 'react';
import {Brightness5Outlined, Brightness4Outlined} from '@mui/icons-material';
import {
    DataImages,
    LocalizationContext,
    RouteContext,
    CacheStorage,
    CacheKeys,
    CacheTypes,
    useCacheStorage,
} from '../../base';
import {
    useTheme,
    useMediaQuery,
    AppBar,
    Toolbar,
    IconButton,
    Button,
    Box,
    Stack,
    Avatar,
    Divider,
    ButtonGroup
} from '@mui/material';


export function Header(props) {
    const theme = useTheme()
    const isLG = useMediaQuery(theme.breakpoints.down('lg'))
    const {t} = React.useContext(LocalizationContext)
    const {route, routes} = React.useContext(RouteContext)
    const darkMode = useCacheStorage(CacheKeys.darkMode, CacheTypes.bool)

    return (
        <AppBar position='relative' color={'transparent'} elevation={0}>
        <Toolbar>
            <IconButton
                size='large'
                edge='start'
                color="inherit"
                aria-label='menu'
                sx={{ mr: 2, padding: 0, marginLeft: '-4px', marginRight: 0}}
                onClick={() => {
                    route.toLocation(routes.home)
                }}
            >
                <Avatar
                    alt={'Logo'}
                    src={DataImages.common.logo}
                    sx={{
                        width: isLG ? 38 : 60,
                        height: isLG ? 38 : 60,
                        '& .MuiAvatar-img': {
                            width: isLG ? 30 : 46,
                            height: isLG ? 30 : 46,
                            objectFit: 'contain',
                            padding: '4px',
                            paddingBottom: '8px'
                        },
                    }}
                />
            </IconButton>

            <Box sx={{ flexGrow: 1 }}/>

            <Stack
                direction='row'
                spacing={isLG ? 0.5 : 2}
            >

                <Button
                    color='primary'
                    onClick={() => {
                        route.toLocation(routes.community)
                    }}
                >
                    {t('layouts.header.t_community')}
                </Button>

                <Button
                    color='primary'
                    onClick={() => {
                        route.toLocation(routes.experts)
                    }}
                >
                    {t('layouts.header.t_experts')}
                </Button>

                <Divider orientation='vertical' flexItem />

                <ButtonGroup
                    color={'primary'}
                    size='small'
                    variant='text'
                    aria-label='Mode'
                >
                    <Button
                        sx={isLG ? {
                            minWidth: '30px !important',
                            height: '33px',
                            position: 'relative',
                            top: '4px',
                        } : {}}
                        onClick={() => {
                            CacheStorage.booleanSet(CacheKeys.darkMode, !darkMode)
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
    );
}

Header.propTypes = {};
