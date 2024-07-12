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
import {LocalizationContext, RouteContext} from '../../../base';
import {
    useTheme,
    useMediaQuery,
    Card,
    CardContent,
    Stack,
    Typography,
    Box,
    Chip,
    ButtonGroup,
    Button,
} from '@mui/material';
import {
    Email,
    LinkedIn,
    Telegram
} from "@mui/icons-material";

export function BlockInfo(props) {
    const theme = useTheme()
    const isMD = useMediaQuery(theme.breakpoints.down('md'))
    const {isLocEn} = React.useContext(LocalizationContext)
    const {route} = React.useContext(RouteContext)

    const {
        expert,
    } = props

    return (
        <Card sx={{padding: isMD ? 2 : 3}}>
            <CardContent>
                <Stack
                    direction={isMD ? 'column' : 'row'}
                    spacing={4}
                >
                    <Box sx={{textAlign: 'center'}}>
                        <Stack
                            spacing={2}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <img src={expert.image} alt='Logo' className='LogoExpert' />

                            {expert.contacts.telegram || expert.contacts.email || expert.contacts.linkedin ? (
                                <ButtonGroup color={'primary'} >
                                    {expert.contacts.telegram ? (
                                        <Button onClick={() => {
                                            route.openUrlNewTab(expert.contacts.telegram)
                                        }}>
                                            <Telegram/>
                                        </Button>
                                    ) : null}
                                    {expert.contacts.email ? (
                                        <Button onClick={() => {
                                            route.openEmail(expert.contacts.email)
                                        }}>
                                            <Email/>
                                        </Button>
                                    ) : null}
                                    {expert.contacts.linkedin ? (
                                        <Button onClick={() => {
                                            route.openUrlNewTab(expert.contacts.linkedin)
                                        }}>
                                            <LinkedIn/>
                                        </Button>
                                    ) : null}
                                </ButtonGroup>
                            ) : null}
                        </Stack>
                    </Box>

                    <Stack
                        spacing={isMD ? 2 : 3}
                        direction="column"
                        justifyContent="space-between"
                        sx={{ flexGrow: 1 }}
                    >
                        <Stack
                            spacing={isMD ? 2 : 3}
                        >
                            <Typography variant="h3" component="div">
                                {isLocEn ? expert.name_en : expert.name_ru}
                            </Typography>

                            <Stack className={'ExpertChips'} spacing={1} direction={'row'} sx={{marginTop: 1.6}}>
                                {expert.direction.map((option, index) => (
                                    <Chip key={`cip-${index}`} className={option.replace(' ', '_')} label={option} variant="outlined" />
                                ))}
                            </Stack>

                            <Typography
                                variant={isMD ? 'text2' : 'text1'}
                                color={'text.primary'}
                                sx={{whiteSpace: 'break-spaces'}}
                            >
                                {isLocEn ? expert.description_en : expert.description_ru}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}

BlockInfo.propTypes = {
    expert: PropTypes.object.isRequired,
};
