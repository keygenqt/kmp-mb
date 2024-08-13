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
    Card,
    Typography,
    Stack,
    Divider,
    Grid,
    Box,
} from '@mui/material';

export function CardCount(props) {
    const theme = useTheme()
    const isMD = useMediaQuery(theme.breakpoints.down('md'))
    return (
        <Card sx={{
            '@media(max-width: 2000px)': {
                '& h2': {
                    fontSize: 36,
                },
                '& h4': {
                    fontSize: 24,
                }
            },
            '@media(max-width: 1777px)': {
                '& h2': {
                    fontSize: 26,
                },
                '& h4': {
                    fontSize: 18,
                }
            }
        }}>
            <Box sx={{with: 1}}>
                <Grid
                    container
                    alignItems="center"
                >
                    <Grid item xs={7} sm={7} md={7} lg={7}>
                        <Stack direction={'row'}>
                            <Stack
                                justifyContent="space-between"
                                sx={{p: 2, minHeight: isMD ? 0 : 175}}
                            >
                                {props.icon}
                                <Stack spacing={2} sx={{marginTop: 2}}>
                                    <Typography variant="h4" color={'text.primary'} sx={{whiteSpace: 'pre'}}>
                                        {props.title}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        color={'text.primary'}
                                    >
                                        {props.desc}
                                    </Typography>
                                </Stack>
                                <Box/>
                            </Stack>
                            <Box sx={{ flexGrow: 1 }}/>
                            <Divider orientation='vertical' flexItem />
                        </Stack>
                    </Grid>
                    <Grid item xs={5} sm={5} md={5} lg={5}>
                        <Typography
                            variant="h2"
                            color={'text.primary'}
                            sx={{
                                textAlign: 'center',
                                p: 2,
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                            }}
                        >
                            {props.children}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Card>
    );
}

CardCount.propTypes = {
    children: PropTypes.string.isRequired
};
