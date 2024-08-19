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
import { FormLayout } from '../../layouts';
import { useHttpQuery, Shared } from '../../base';
import { RegExpertForm } from './elements/RegExpertForm';

export function RegExpertPage(props) {
    let {id} = useParams();
    const model = useHttpQuery(Shared.queries.registrationExpert, id)
    return (
        <FormLayout
            id={id}
            model={model}
            title={'Registration expert'}
        >
            <RegExpertForm
                id={id}
                model={model}
            />
        </FormLayout>
    )
}

RegExpertPage.propTypes = {};
