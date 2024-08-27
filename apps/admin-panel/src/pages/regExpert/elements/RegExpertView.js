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
    Avatar,
} from "@mui/material";
import {
    Email,
    Telegram,
    InsertLink,
} from '@mui/icons-material';


export function RegExpertView(props) {
    const theme = useTheme()
    const isSM = useMediaQuery(theme.breakpoints.down('sm'))
    const {route} = React.useContext(RouteContext)

    return (
        <Stack spacing={3}>
            <Card sx={{p: 2}}>
                <Stack spacing={1} >
                    <Typography variant="h5" color={'text.primary'}>
                        Recommendation
                    </Typography>
                    <Divider/>
                    <Stack spacing={2} direction={'row'} alignItems="center">
                        <Avatar
                            alt={`${props.model?.expert?.fname} ${props.model?.expert?.lname}`}
                            src={props.model?.expert?.image}
                            sx={{ width: 56, height: 56 }}
                        />
                        <Stack spacing={1}>
                            <Typography variant="h6" color={'text.primary'}>
                                {props.model.expert?.fname}
                            </Typography>
                            <Typography variant="h6" color={'text.primary'}>
                                {props.model.expert?.lname}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Card>

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
                        <Button
                            sx={{width: 1}}
                            variant={'outlined'}
                            endIcon={<InsertLink color={'text.primary'} sx={{height: 18}}/>}
                            onClick={() => {
                                route.openUrlNewTab(props.model?.cv)
                            }}
                        >
                            CV
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
                                Direction
                            </Typography>
                            <Typography variant="text2" color={'text.primary'}>
                                {props.model?.direction?.name}
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
                                Location
                            </Typography>
                            <Typography variant="text2" color={'text.primary'}>
                                {props.model?.location}
                            </Typography>
                        </Stack>

                        <Stack spacing={1}>
                            <Typography variant="subtitle2" color={'text.primary'}>
                                Why
                            </Typography>
                            <Typography variant="text2" color={'text.primary'}>
                                {props.model?.why}
                            </Typography>
                        </Stack>

                        <Stack spacing={1}>
                            <Typography variant="subtitle2" color={'text.primary'}>
                                Experience
                            </Typography>
                            <Typography variant="text2" color={'text.primary'}>
                                {props.model?.experience}
                            </Typography>
                        </Stack>

                        <Stack spacing={1}>
                            <Typography variant="subtitle2" color={'text.primary'}>
                                Contribution
                            </Typography>
                            <Typography variant="text2" color={'text.primary'}>
                                {props.model?.contribution}
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

RegExpertView.propTypes = {
    model: PropTypes.object.isRequired,
};