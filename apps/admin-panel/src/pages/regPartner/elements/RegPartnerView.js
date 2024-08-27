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
    RouteContext
} from "../../../base"
import {
    useTheme,
    useMediaQuery,
    Card,
    Stack,
    Typography,
    Button,
    Divider,
} from "@mui/material";
import {
    Email,
    Telegram,
    PhoneEnabled,
} from '@mui/icons-material';


export function RegPartnerView(props) {
    const theme = useTheme()
    const isSM = useMediaQuery(theme.breakpoints.down('sm'))
    const {route} = React.useContext(RouteContext)

    return (
        <Stack spacing={3}>
            <Card sx={{p: 2}}>
                <Stack spacing={1} >
                    <Typography variant="h5" color={'text.primary'}>
                        Links
                    </Typography>
                    <Divider/>
                    <Stack spacing={1} direction={isSM ? 'column' : 'row'}>
                        <Button
                            sx={{width: 1}}
                            variant={'outlined'}
                            endIcon={<Email color={'text.primary'} sx={{height: 18}}/>}
                            onClick={() => {
                                route.openEmail(props.model?.email)
                            }}
                        >
                            Email
                        </Button>
                        {props.model?.telegram && (
                            <Button
                                sx={{width: 1}}
                                variant={'outlined'}
                                endIcon={<Telegram color={'text.primary'} sx={{height: 18}}/>}
                                onClick={() => {
                                    route.openUrlNewTab(props.model?.telegram)
                                }}
                            >
                                Telegram
                            </Button>
                        )}
                        <Button
                            sx={{width: 1}}
                            variant={'outlined'}
                            endIcon={<PhoneEnabled color={'text.primary'} sx={{height: 18}}/>}
                            onClick={() => {
                                route.openPhone(props.model?.phone)
                            }}
                        >
                            {props.model?.phone}
                        </Button>
                    </Stack>
                </Stack>
            </Card>

            <Card sx={{p: 2}}>
                <Stack spacing={1} >
                    <Typography variant="h5" color={'text.primary'}>
                        About
                    </Typography>
                    <Divider/>
                    <Stack spacing={3} >
                        <Stack spacing={1}>
                            <Typography variant="subtitle2" color={'text.primary'}>
                                Company
                            </Typography>
                            <Typography variant="text2" color={'text.primary'}>
                                {props.model?.company}
                            </Typography>
                        </Stack>

                        <Stack spacing={1}>
                            <Typography variant="subtitle2" color={'text.primary'}>
                                Name
                            </Typography>
                            <Typography variant="text2" color={'text.primary'}>
                                {props.model?.fname} {props.model?.lname}
                            </Typography>
                        </Stack>

                        <Stack spacing={1}>
                            <Typography variant="subtitle2" color={'text.primary'}>
                                Format
                            </Typography>
                            <Typography variant="text2" color={'text.primary'}>
                                {props.model?.format}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Card>

            <Card>
                <Stack spacing={1} sx={{p: 2}}>
                    <Typography variant="subtitle2" color={'text.primary'}>
                        Create date
                    </Typography>
                    <Typography variant="text2" color={'text.primary'}>
                        {new Intl
                        .DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                        })
                        .format(Date.parse(props.model.createAt))}
                    </Typography>
                </Stack>
            </Card>
        </Stack>
    );
}

RegPartnerView.propTypes = {
    model: PropTypes.object.isRequired,
};