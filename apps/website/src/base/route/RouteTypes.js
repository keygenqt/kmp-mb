/**
 * Route validate types
 */
export const RouteTypes = {

    string: 'string',
    number: 'number',
    integer: 'integer',
    float: 'float',
    bool: 'boolean',

    validate: (type, value) => {
        switch (type) {
            case RouteTypes.string:
                return RouteTypes.validateString(value)
            case RouteTypes.number:
                return RouteTypes.validateNumber(value)
            case RouteTypes.integer:
                return RouteTypes.validateInteger(value)
            case RouteTypes.float:
                return RouteTypes.validateFloat(value)
            case RouteTypes.bool:
                return RouteTypes.validateBool(value)
            default:
                return true
        }
    },

    validateString: (value) => {
        return true
    },

    validateNumber: (value) => {
        return RouteTypes.validateInteger(value) || RouteTypes.validateFloat(value)
    },

    validateInteger: (value) => {
        const regexPath = /\d+/ig;
        return value.replace(regexPath, '').length === 0
    },

    validateFloat: (value) => {
        const regexPath = /\d+.\d+/ig;
        return value.replace(regexPath, '').length === 0
    },

    validateBool: (value) => {
        return value === 'true' || value === 'false'
    }
}
