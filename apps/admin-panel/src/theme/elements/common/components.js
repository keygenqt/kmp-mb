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

/**
 * API that enables the use of breakpoints in a wide variety of contexts.
 * @link https://mui.com/material-ui/customization/theme-components/
 */
export const components = {
    MuiFormGroup: {
        styleOverrides: {
            root: ({ theme }) =>
                theme.unstable_sx({
                    '& .MuiInputBase-root': {
                        background: theme.palette.mode === 'dark' ? '#3B3B3B57' : '#E3E3E357'
                    }
                }),
        }
    },
    MuiChip: {
        styleOverrides: {
            root: {
                height: 24,
                fontSize: 14,
                '& .MuiChip-label': {
                    paddingLeft: 6,
                    paddingRight: 6,
                }
            }
        }
    },
    MuiCard: {
        styleOverrides: {
            root: ({ theme }) =>
                theme.unstable_sx({
                    borderRadius: 5,
                    boxShadow: 'none !important',
                    background: theme.palette.mode === 'dark' ? '#1e1e1e' : '#F9F9F9',
                    border: '1px solid',
                    borderColor: theme.palette.mode === 'dark' ? '#cb8ff747' : '#802aea2b',
                    '& .MuiCardHoverShow': {
                        opacity: '0',
                        transitionDuration: '200ms'
                    },
                    '&:hover .MuiCardHoverShow': {
                        opacity: '1'
                    },
                }),
        }
    },
    MuiToolbar: {
        styleOverrides: {
            root: {
                height: 80,
                minHeight: 80,
            }
        }
    }
}
