import * as React from 'react';
import {Images, LanguageContext} from '../../../base';
import {
    useTheme,
    useMediaQuery,
    Button,
    Box,
    Stack,
    Grid,
    Typography,
} from '@mui/material';


export function AboutWithMap(props) {
    const theme = useTheme()
    const isLG = useMediaQuery(theme.breakpoints.down('lg'));
    const {t} = React.useContext(LanguageContext)

    return (
        <Box sx={{ textAlign: isLG ? 'center' : 'inherit', overflow: 'hidden' }} >
            <Grid
                container
                spacing={{lg: 5}}
                rowSpacing={8}
            >
                <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                    <Stack spacing={2}>
                        <Typography variant='h2' color={'text.primary'}>
                            {t('pages.home.t_block_1_title')}
                        </Typography>

                        <Typography variant='text1' color={'text.primary'}>
                            {t('pages.home.t_block_1_text')}
                        </Typography>

                        <Box>
                            <Button variant='contained'>
                                {t('pages.home.t_block_1_button')}
                            </Button>
                        </Box>
                    </Stack>
                </Grid>
                <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                    <Box sx={{width: '100%', textAlign: 'center'}}>
                        <img style={{width: '100%', maxWidth: '600px'}} src={Images.home.map} alt='Map' />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

AboutWithMap.propTypes = {};
