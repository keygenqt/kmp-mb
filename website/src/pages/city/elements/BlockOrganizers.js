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
    CardActions,
    Typography,
    IconButton,
    Grid,
    CardMedia,
    Box,
    Stack,
} from '@mui/material';
import {
    Telegram,
    Mail
} from '@mui/icons-material';

export function BlockOrganizers(props) {
    const theme = useTheme()
    const isSM = useMediaQuery(theme.breakpoints.down('sm'))
    const {t} = React.useContext(LocalizationContext)
    const {route} = React.useContext(RouteContext)

    const content = []
    props.organizers.forEach((item) => {
        content.push(
            <Grid key={item.id} item xl={3} lg={3} md={4} sm={6} xs={12}>
                <Card color={'primary'} sx={{
                    '& .MuiCardContent-root': {
                        padding: 2.5,
                        marginBottom: -2.5
                    }
                }}>
                    <CardMedia
                        sx={{ height: 270 }}
                        image={item.image}
                        title={item.name}
                    />
                    <Stack>
                        <CardContent>
                            <Typography gutterBottom={item.about !== undefined} variant="h5" component="div" sx={{whiteSpace: 'break-spaces'}}>
                                {item.name}
                            </Typography>
                            {item.about === undefined ? null : (
                                <Typography variant="body2" color="text.secondary">
                                    {item.about}
                                </Typography>
                            )}
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton
                                aria-label="Mail"
                                onClick={() => {
                                    route.openEmail(item.email)
                                }}
                            >
                                <Mail />
                            </IconButton>
                            <IconButton
                                aria-label="Telegram"
                                onClick={() => {
                                    route.openUrlNewTab(item.telegram)
                                }}
                            >
                                <Telegram />
                            </IconButton>
                        </CardActions>
                    </Stack>

                </Card>
            </Grid>
        )
    })

    return (
        <Box>
            <Typography variant='h5' color={'text.primary'} sx={{marginBottom: 3, textAlign: 'right'}}>
                {props.organizers.length === 1 ? t('pages.city.t_organizer') : t('pages.city.t_organizers')}
            </Typography>
            <Grid
                container
                spacing={isSM ? 4 : 5}
                justifyContent="flex-end"
            >
                {content}
            </Grid>
        </Box>
    );
}

BlockOrganizers.propTypes = {
    organizers: PropTypes.array.isRequired,
};
