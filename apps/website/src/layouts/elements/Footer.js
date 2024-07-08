import * as React from 'react';
import {Images, LanguageContext} from '../../base';
import {
    Button,
    Box,
    Stack,
    Typography,
    ButtonGroup
} from '@mui/material';


export function Footer(props) {
    const {t, i18n, isLocEn} = React.useContext(LanguageContext)
    return (
        <Box className={'Footer'}>
            <Stack spacing={4} alignItems='center'>
                <img src={Images.common.logo} alt='Logo' />

                <Box>
                    {t('layouts.footer.t_copyright')}
                </Box>

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
        </Box>
    );
}

Footer.propTypes = {};
