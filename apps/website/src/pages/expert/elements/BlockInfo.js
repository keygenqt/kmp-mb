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
    LocalizationContext,
    RouteContext,
    Helper,
    ContactTypes
} from '../../../base';
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
    const {language} = React.useContext(LocalizationContext)
    const {route} = React.useContext(RouteContext)

    const {
        data,
    } = props

    const fname = Helper.locate(data, 'fname', language)
    const lname = Helper.locate(data, 'lname', language)
    const about = Helper.locate(data, 'about', language)
    const fullName = `${fname} ${lname}`
    const telegram = data.contacts?.find((contact) => contact.type === ContactTypes.TELEGRAM.name)
    const email = data.contacts?.find((contact) => contact.type === ContactTypes.EMAIL.name)
    const linkedin = data.contacts?.find((contact) => contact.type === ContactTypes.LINKEDIN.name)

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
                            <img src={data.image} alt='Logo' className='LogoExpert' />

                            {telegram || email || linkedin ? (
                                <ButtonGroup color={'primary'} >
                                    {telegram ? (
                                        <Button onClick={() => {
                                            route.openUrlNewTab(telegram.link)
                                        }}>
                                            <Telegram/>
                                        </Button>
                                    ) : null}
                                    {email ? (
                                        <Button onClick={() => {
                                            route.openEmail(email.link)
                                        }}>
                                            <Email/>
                                        </Button>
                                    ) : null}
                                    {linkedin ? (
                                        <Button onClick={() => {
                                            route.openUrlNewTab(linkedin.link)
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
                                {fullName}
                            </Typography>

                            <Stack className={'ExpertChips'} spacing={1} direction={'row'} sx={{marginTop: 1.6}}>
                                {data.directions?.map((direction, index) => (
                                    <Chip key={`cip-${index}`} className={direction.replace(' ', '_')} label={direction} variant="outlined" />
                                ))}
                            </Stack>

                            <Typography
                                variant={isMD ? 'text2' : 'text1'}
                                color={'text.primary'}
                                sx={{whiteSpace: 'break-spaces'}}
                            >
                                {about}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}

BlockInfo.propTypes = {
    data: PropTypes.object.isRequired,
};
