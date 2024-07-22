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
import {LocalizationContext, RouteContext, Shared} from '../../../base';
import {
    useTheme,
    useMediaQuery,
    Card,
    Typography,
    Grid,
    Box,
    Stack,
    CardActionArea,
} from '@mui/material';
import {
    Telegram,
    Language,
    GitHub,
    YouTube,
    CellTower,
    ArrowOutward
} from '@mui/icons-material';

function getIcon(key) {
    switch(key) {
        case Shared.mediaTypes.telegram:
            return <Telegram className={'TelegramIcon'}/>
        case Shared.mediaTypes.github:
            return <GitHub className={'GitHubIcon'}/>
        case Shared.mediaTypes.youtube:
            return <YouTube className={'YouTubeIcon'}/>
        case Shared.mediaTypes.site:
            return <Language className={'LanguageIcon'}/>
        default:
            return <CellTower className={'CellTowerIcon'}/>
      }
}

export function BlockMedia(props) {

    const {
        media,
    } = props

    const theme = useTheme()
    const isSM = useMediaQuery(theme.breakpoints.down('sm'))
    const {t} = React.useContext(LocalizationContext)
    const {route} = React.useContext(RouteContext)

    const content = []
    media?.forEach((model, index) => {
        content.push(
            <Grid key={`media-${index}`} item xl={3} lg={3} md={4} sm={6} xs={12}>
                <Card color={'primary'}>
                    <CardActionArea
                        sx={{padding: 2}}
                        onClick={() => {
                            route.openUrlNewTab(model.link)
                        }}
                    >
                        <Stack>
                            <Box className={'MediaIcon'}>
                                {getIcon(model.type.name)}
                            </Box>
                            <Box className={'MediaArrow'}>
                                <ArrowOutward/>
                            </Box>
                        </Stack>
                    </CardActionArea>
                </Card>
            </Grid>
        )
    })

    return (
        <>
            {content.length === 0 ? null : (
                <Box>
                    <Typography variant='h5' color={'text.primary'} sx={{marginBottom: 3, textAlign: 'right'}}>
                        {t('pages.expert.t_media')}
                    </Typography>
                    <Grid
                        container
                        spacing={isSM ? 4 : 5}
                        justifyContent="flex-end"
                    >
                        {content}
                    </Grid>
                </Box>
            )}
        </>
    );
}

BlockMedia.propTypes = {
    media: PropTypes.array.isRequired,
};
