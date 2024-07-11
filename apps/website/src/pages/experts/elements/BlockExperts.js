import * as React from 'react';
import Lottie from "lottie-react";
import {DataLottie, LocalizationContext, RouteContext} from '../../../base';
import {
    useTheme,
    useMediaQuery,
    Card,
    CardContent,
    Button,
    Grid,
    Stack,
    Box,
    FormControl,
    MenuItem,
    InputLabel,
    Select,
    TextField,
    Typography,
    CardMedia,
    Chip,
} from '@mui/material';

import {DataExperts} from "../../../base/data/DataExperts";


export function BlockExperts(props) {

    const theme = useTheme()
    const isSM = useMediaQuery(theme.breakpoints.down('sm'))

    const {t, isLocEn} = React.useContext(LocalizationContext)
    const {route, routes} = React.useContext(RouteContext)

    const [search, setSearch] = React.useState('');
    const [direction, setDirection] = React.useState('');

    const directions = []
    const content = []
    DataExperts.forEach((item) => {
        // Get localization data
        const search_name = isLocEn ? item.name_en : item.name_ru

        // Get array for select
        item.direction.forEach((direction) => {
            if (!directions.includes(direction)) {
                directions.push(direction)
            }
        })
        directions.sort()

        // Filter direction
        if (direction && !item.direction.includes(direction)) {
            return;
        }

        // Search ru/en name city
        if (!search
            || item.name_en.toLowerCase().includes(search.toLowerCase())
            || item.name_ru.toLowerCase().includes(search.toLowerCase())
        ) {
            // Items
            content.push(
                <Grid key={item.id} item xl={3} lg={3} md={4} sm={6} xs={12}>
                    <Card color={'primary'} sx={{
                        '& .MuiCardContent-root': {
                            marginBottom: -1
                        },
                        '@media (max-width: 420px)': {
                            '& .MuiCardMedia-root': {
                                height: 375
                            }
                        }
                    }}>
                        <CardMedia
                            sx={{ height: isSM ? 560 : 380 }}
                            image={item.image}
                            title={search_name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {search_name}
                            </Typography>

                            <Stack spacing={0.5} direction={'row'} sx={{marginTop: 1.6}}>
                                {item.direction.map((option) => (
                                    <Chip className={option.replace(' ', '_')} label={option} variant="outlined" />
                                ))}
                            </Stack>

                            <Stack direction={'row'} justifyContent="flex-end" sx={{paddingTop: 2}}>
                                    <Button
                                        color='primary'
                                        size="small"
                                        onClick={() => {
                                            route.toLocation(routes.expert, item.id)
                                        }}
                                    >
                                        {t('common.t_more')}
                                    </Button>
                                </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            )
        }
    })

    return (
        <Box>
            <Grid
                container
                spacing={isSM ? 4 : 5}
                rowSpacing={isSM ? 4 : 5}
                justifyContent="flex-end"
                sx={{marginBottom: isSM ? 4 : 5}}
            >
                <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
                    <TextField
                        id='outlined-basic'
                        inputProps={{
                            autocomplete: 'off',
                            form: {
                                autocomplete: 'off',
                            },
                        }}
                        label={t('pages.experts.t_filter_search')}
                        variant='outlined'
                        sx={{ width: '100%' }}
                        value={search}
                        onChange={(event) => {
                          setSearch(event.target.value);
                        }}
                    />
                </Grid>

                <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="direction-select-label">
                        {t('pages.experts.t_filter_direction')}
                        </InputLabel>
                        <Select
                            labelId="direction-select-label"
                            value={direction}
                            label={t('pages.experts.t_filter_direction')}
                            onChange={(event) => {
                                setDirection(event.target.value);
                            }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {directions.map((option) => (
                                <MenuItem key={`cat-${option}`} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            {content.length !== 0 ? (
                <Grid
                    container
                    spacing={isSM ? 4 : 5}
                    rowSpacing={isSM ? 4 : 5}
                >
                    {content}
                </Grid>
            ) : (
                <Stack spacing={4} sx={{paddingTop: 3, paddingBottom: 3}}>
                    <Typography variant='h4' color={'text.primary'} sx={{textAlign: 'center'}}>
                        {t('pages.experts.t_not_found')}
                    </Typography>
                    <Box>
                        <Lottie
                            className={'NotFoundLottie'}
                            animationData={DataLottie.not_found}
                        />
                    </Box>
                </Stack>
                )}
        </Box>
    );
}

BlockExperts.propTypes = {};
