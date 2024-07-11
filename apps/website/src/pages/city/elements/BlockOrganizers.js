import * as React from 'react';
import PropTypes from "prop-types";
import {LocalizationContext, RouteContext} from '../../../base';
import {
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
import {Telegram, Mail} from '@mui/icons-material';


export function BlockOrganizers(props) {
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
                spacing={5}
                rowSpacing={5}
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
