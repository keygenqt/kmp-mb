/**
 * Copyright 2024 Vitaliy Zarubin
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from 'react';
import PropTypes from 'prop-types';
import {
    useTheme,
    useMediaQuery,
    Box,
    Stack,
} from '@mui/material';
import {
    useWindowResize,
} from '../base';

import {Menu} from './elements/Menu';
import {Header} from './elements/Header';
import {Footer} from './elements/Footer';

export function BaseLayout(props) {
    const theme = useTheme()
    const isMD = useMediaQuery(theme.breakpoints.down('md'))
    const isLG = useMediaQuery(theme.breakpoints.down('lg'))
    const widthMenu = isMD ? 250: 300
    const {width} = useWindowResize()
    const [showMenu, setShowMenu] = React.useState(!isLG)

    React.useEffect(() => {
        setShowMenu(!isLG)
    }, [isLG])

    return (
        <>
            {/* Header */}
            <Box className={'Table-Row'}>
                <Box className={'Table-Cell Header'} sx={{height: '1px'}}>
                    <Box sx={{maxWidth: width}}>
                        <Header onClickMenu={() => setShowMenu(!showMenu)}/>
                    </Box>
                </Box>
            </Box>
            {/* Content */}
            <Box className={'Table-Row'}>
                <Box
                    id={'Table-Cell-Page'}
                    className={'Table-Cell ' + props.className}
                    sx={{
                        verticalAlign: props.isCenter === true ? 'middle' : 'top'
                    }}
                >
                    {/* Body with menu */}
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="stretch"
                        spacing={2}
                        sx={{
                            height: '100%'
                        }}
                    >
                        {/* Menu */}
                        <Stack
                            width={widthMenu}
                            direction="column"
                            spacing={2}
                            sx={{
                                p: 2,
                                paddingRight: 0,
                                marginLeft: showMenu ? '0' : `calc(-${widthMenu}px - 15px) !important`,
                            }}
                        >
                            <Menu/>
                        </Stack>
                        {/* Body */}
                        <Stack
                            width={width + (showMenu ? (isMD ? 0 : -widthMenu) : 15) - 50}
                            direction="column"
                            justifyContent={props.isCenter === true ? 'center' : 'flex-start'}
                            alignItems={props.isCenter === true ? 'center' : 'flex-start'}
                            spacing={2}
                            sx={{
                                p: 3,
                                boxSizing: 'border-box',
                                background: '#802aea0a',
                                borderRadius: 3,
                            }}
                        >
                            {props.children}
                        </Stack>
                    </Stack>
                </Box>
            </Box>

            {/* Footer */}
            <Box className={'Table-Row'} sx={{height: '1px'}}>
                <Box className={'Table-Cell Footer'}>
                    <Box sx={{maxWidth: width}}>
                        <Footer/>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

BaseLayout.propTypes = {
    children: PropTypes.element.isRequired,
    className: PropTypes.string.isRequired,
    isCenter: PropTypes.bool,
};
