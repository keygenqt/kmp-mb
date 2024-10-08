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
import { DataGrid } from '@mui/x-data-grid';
import {
    useTheme,
    Box,
} from '@mui/material';
import {
    useCacheStorage,
    CacheKeys,
    CacheStorage,
} from '../../../base';

export function CustomDataGrid(props) {
    const {palette} = useTheme();
    const darkMode = useCacheStorage(CacheKeys.darkMode, false, false)
    const cacheKey = `${CacheKeys.gridPage}-${props.rows?.[0]?.constructor?.name}`
    const paginationModel = useCacheStorage(cacheKey, {
        pageSize: 12,
        page: 0,
    })

    return (
        <Box sx={{
            width: 1,
            '& .MuiDataGrid-root': {
                borderRadius: '15px !important'
            },
            '& div': {
                outline: 'none !important'
            },
            '& .MuiTablePagination-actions': {
                padding: 2
            },
            '& .MuiTablePagination-actions .Mui-disabled': {
                opacity: 0.5
            },
            '& .MuiDataGrid-withBorderColor': {
                backgroundColor: palette.background.dark,
                borderColor: (darkMode ? '#454545' : '#802aea2b') + ' !important'
            },
            '& .MuiDataGrid-menuIcon': {
                backgroundColor: palette.background.dark
            },
            '& div[role="presentation"]': {
                backgroundColor: palette.background.dark
            },
            '& .MuiDataGrid-virtualScrollerContent[role="presentation"]': {
                backgroundColor: palette.background.default
            },
            '& .MuiDataGrid-virtualScrollerRenderZone div[role="presentation"]': {
                backgroundColor: palette.background.default
            },
            '& .MuiDataGrid-cell': {
                backgroundColor: palette.background.default,
                borderColor: (darkMode ? '#454545' : '#802aea2b') + ' !important'
            },
            '& .MuiDataGrid-columnHeader': {
                borderBottom: 'none !important'
            },
            '& div[data-field="actions"] .MuiIconButton-root': {
                backgroundColor: '#802aea29'
            },
            '& div[data-field="image"] .MuiAvatar-root': {
                position: 'relative',
                top: 12,
            }
        }}>
            <DataGrid
                paginationModel={paginationModel}
                onPaginationModelChange={(paginationModel) => CacheStorage.set(cacheKey, paginationModel)}
                pageSize={9}
                disableColumnFilter
                disableColumnSorting
                disableColumnResize
                disableRowSelectionOnClick
                disableColumnSelector
                disableColumnMenu
                rows={props.rows}
                columns={props.columns}
                pageSizeOptions={[12]}
            />
        </Box>
    );
}

CustomDataGrid.propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
};
