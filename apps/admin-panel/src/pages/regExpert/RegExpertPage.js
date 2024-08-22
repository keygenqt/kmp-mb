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
import { useParams } from 'react-router';
import { useHttpQuery, Shared } from '../../base';
import { FormWithViewLayout } from '../../layouts';
import { RegExpertView } from './elements/RegExpertView';
import { RegExpertForm } from './elements/RegExpertForm';
import {
    Grid,
    Stack,
    Typography,
    Card,
} from '@mui/material';

export function RegExpertPage(props) {
    let {id} = useParams();
    const model = useHttpQuery(Shared.queries.registrationExpert, id)

    return (
        <FormWithViewLayout
            id={id}
            model={model}
            title={'Registration Expert'}
        >
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={7} lg={7} xl={8}>
                    {model && (<RegExpertView model={model} />)}
                </Grid>
                <Grid item xs={12} sm={12} md={5} lg={5} xl={4}>
                    <Card sx={{p: 3, width: 1, boxSizing: 'border-box'}}>
                        <Stack spacing={2} sx={{width: 1}}>
                            <Typography variant="h5" color={'text.primary'}>
                                Update state
                            </Typography>
                            <RegExpertForm
                                id={id}
                                model={model}
                            />
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormWithViewLayout>
    )
}

RegExpertPage.propTypes = {};
