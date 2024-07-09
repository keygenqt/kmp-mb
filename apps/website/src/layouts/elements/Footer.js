import * as React from 'react';
import {DataImages, LocalizationContext, RouteContext} from '../../base';
import {
    useTheme,
    useMediaQuery,
    Button,
    Stack,
    Typography,
    ButtonGroup,
    Divider,
    Card,
    CardHeader,
    Avatar,
    CardActionArea,
} from '@mui/material';

import {Telegram, Mail} from '@mui/icons-material';


export function Footer(props) {
    const theme = useTheme()
    const isMD = useMediaQuery(theme.breakpoints.down('md'))
    const {route} = React.useContext(RouteContext)
    const {t, i18n, isLocEn} = React.useContext(LocalizationContext)

    return (
        <>
            <img src={DataImages.common.logo} alt='Logo' className='Logo Logo-Top' />

            <Stack spacing={3}>
                <Stack
                    spacing={2}
                    direction={isMD ? 'column': 'row'}
                    justifyContent="space-between"
                >
                    <Stack width={isMD ? '100%': 345} spacing={2} >
                        <Typography variant='h5' color={'white'}>
                            {t('layouts.footer.t_founders')}
                        </Typography>
                        <Card sx={{width: '100%'}}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" src={DataImages.common.rozov}>
                                        KR
                                    </Avatar>
                                }
                                title={t('layouts.footer.t_founder_k_title')}
                                subheader={t('layouts.footer.t_founder_k_text')}
                            />
                        </Card>
                        <Card sx={{width: '100%'}}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" src={DataImages.common.gladkov}>
                                        AG
                                    </Avatar>
                                }
                                title={t('layouts.footer.t_founder_a_title')}
                                subheader={t('layouts.footer.t_founder_a_text')}
                            />
                        </Card>
                    </Stack>

                    <img src={DataImages.common.logo} alt='Logo' className='Logo Logo-Center' />

                    <Stack width={isMD ? '100%': 345} spacing={2} alignItems={isMD ? 'flex-start' : 'flex-end'}>
                        <Typography variant='h5' color={'white'}>
                            {t('layouts.footer.t_contacts')}
                        </Typography>
                        <Card sx={{width: '100%', '& .MuiCardHeader-root' : isMD ? {} : {flexDirection: 'column', padding: '13px'}}}>
                            <CardActionArea
                                onClick={() => {
                                    route.openUrlNewTab('https://t.me/mobile_broadcast_news')
                                }}
                            >
                                <CardHeader
                                    avatar={<Telegram/>}
                                    title="@mobile_broadcast_news"
                                />
                            </CardActionArea>
                        </Card>
                        <Card sx={{width: '100%', '& .MuiCardHeader-root' : isMD ? {} : {flexDirection: 'column', padding: '13px'}}}>
                            <CardActionArea
                                onClick={() => {
                                    route.openEmail('sofiya@androidbroadcast.dev')
                                }}
                            >
                                <CardHeader
                                    avatar={<Mail/>}
                                    title="sofiya@androidbroadcast.dev"
                                />
                            </CardActionArea>
                        </Card>
                    </Stack>
                </Stack>

                <Divider variant="middle" flexItem color={'white'} sx={{opacity: 0.7}} />

                <Stack
                    direction={'row'}
                    justifyContent="space-between"
                >
                    <Typography variant='body2' color={'white'} sx={{paddingTop: '5px'}}>
                        {t('layouts.footer.t_copyright')}
                    </Typography>

                    <ButtonGroup
                        color={'white'}
                        size='small'
                        sx={{
                            '& .Mui-disabled': {
                                color: '#ffffff73 !important',
                                border: '1px solid #ffffff73 !important',
                            },
                            '@supports (-moz-appearance:none)': {
                                '& .MuiTypography-root' : {
                                    position: 'relative',
                                    top: '-2px',
                                }
                            }
                        }}
                    >
                        <Button
                            disabled={isLocEn}
                            onClick={() => {
                                i18n.changeLanguage('en-US')
                            }}
                        >
                            <Typography>en</Typography>
                        </Button>

                        <Button
                            disabled={!isLocEn}
                            onClick={() => {
                                i18n.changeLanguage('ru-RU')
                            }}
                        >
                            <Typography>ru</Typography>
                        </Button>
                    </ButtonGroup>
                </Stack>
            </Stack>
        </>
    );
}

Footer.propTypes = {};
