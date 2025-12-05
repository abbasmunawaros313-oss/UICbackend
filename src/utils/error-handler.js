// UIC API Error Code Mappings
const UIC_ERROR_CODES = {
    'USTI-A001': {
        message: 'Required fields are missing',
        statusCode: 400,
    },
    'USTI-A002': {
        message: 'User has expired',
        statusCode: 401,
    },
    'USTI-A003': {
        message: 'User is blocked',
        statusCode: 403,
    },
    'USTI-A004': {
        message: 'Age validation failed - Age must be between 18 and 86 years',
        statusCode: 400,
    },
    'USTI-A005': {
        message: 'Invalid username or password',
        statusCode: 401,
    },
    'USTI-A006': {
        message: 'Invalid NIC number format',
        statusCode: 400,
    },
    'USTI-A007': {
        message: 'Invalid NTN number format',
        statusCode: 400,
    },
    'USTI-A008': {
        message: 'Invalid date format',
        statusCode: 400,
    },
    'USTI-A009': {
        message: 'Invalid travel days - must be greater than 0',
        statusCode: 400,
    },
    'USTI-A010': {
        message: 'Invalid plan type',
        statusCode: 400,
    },
    'USTI-A011': {
        message: 'Insufficient balance in account',
        statusCode: 402,
    },
    'USTI-A012': {
        message: 'Invalid package selected',
        statusCode: 400,
    },
    'USTI-A013': {
        message: 'Invalid area code',
        statusCode: 400,
    },
    'USTI-A014': {
        message: 'Invalid country code',
        statusCode: 400,
    },
    'USTI-A015': {
        message: 'Invalid GST number',
        statusCode: 400,
    },
    'USTI-A016': {
        message: 'Policy generation failed',
        statusCode: 500,
    },
    'USTI-A017': {
        message: 'Invalid request ID',
        statusCode: 400,
    },
    'USTI-A018': {
        message: 'Request already processed',
        statusCode: 409,
    },
    'USTI-A019': {
        message: 'Request not found',
        statusCode: 404,
    },
    'USTI-A020': {
        message: 'Cancellation remarks required',
        statusCode: 400,
    },
    'USTI-A021': {
        message: 'Invalid email format',
        statusCode: 400,
    },
    'USTI-A022': {
        message: 'Invalid phone number format',
        statusCode: 400,
    },
    'USTI-A023': {
        message: 'Invalid passport number',
        statusCode: 400,
    },
    'USTI-A024': {
        message: 'Spouse details required for family plan',
        statusCode: 400,
    },
    'USTI-A025': {
        message: 'Children details required for family plan',
        statusCode: 400,
    },
    'USTI-A026': {
        message: 'Invalid number of children',
        statusCode: 400,
    },
    'USTI-A027': {
        message: 'Child age validation failed',
        statusCode: 400,
    },
    'USTI-A028': {
        message: 'Invalid premium amount',
        statusCode: 400,
    },
    'USTI-A029': {
        message: 'Invalid coverage amount',
        statusCode: 400,
    },
    'USTI-A030': {
        message: 'Invalid start date - cannot be in the past',
        statusCode: 400,
    },
    'USTI-A031': {
        message: 'Invalid end date',
        statusCode: 400,
    },
    'USTI-A032': {
        message: 'Date range validation failed',
        statusCode: 400,
    },
    'USTI-A033': {
        message: 'Duplicate policy request',
        statusCode: 409,
    },
    'USTI-A034': {
        message: 'Invalid Covid coverage option',
        statusCode: 400,
    },
    'USTI-A035': {
        message: 'Service source mismatch',
        statusCode: 400,
    },
    'USTI-A036': {
        message: 'Invalid AreaShortCode provided',
        statusCode: 400,
    },
    'USTI-A037': {
        message: 'Data retrieval failed',
        statusCode: 500,
    },
    'USTI-EX001': {
        message: 'System exception occurred',
        statusCode: 500,
    },
};

/**
 * Map UIC error code to HTTP status and message
 * @param {string} errorCode - UIC error code
 * @returns {Object} Error details with statusCode and message
 */
export const mapUICError = (errorCode) => {
    if (UIC_ERROR_CODES[errorCode]) {
        return UIC_ERROR_CODES[errorCode];
    }

    // Default error for unknown codes
    return {
        message: `Unknown error: ${errorCode}`,
        statusCode: 500,
    };
};

/**
 * Create standardized error response
 * @param {string} errorCode - UIC error code
 * @param {string} customMessage - Optional custom message
 * @returns {Object} Formatted error response
 */
export const createErrorResponse = (errorCode, customMessage = null) => {
    const errorDetails = mapUICError(errorCode);

    return {
        success: false,
        error: {
            code: errorCode,
            message: customMessage || errorDetails.message,
        },
        statusCode: errorDetails.statusCode,
    };
};

/**
 * Express error handler middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Express next function
 */
export const errorHandler = (err, req, res, next) => {
    // Check if error has UIC error code
    if (err.uicErrorCode) {
        const errorResponse = createErrorResponse(err.uicErrorCode, err.message);
        return res.status(errorResponse.statusCode).json(errorResponse);
    }

    // Handle Joi validation errors
    if (err.isJoi) {
        return res.status(400).json({
            success: false,
            error: {
                code: 'VALIDATION_ERROR',
                message: err.details[0].message,
                details: err.details,
            },
        });
    }

    // Handle axios errors
    if (err.isAxiosError) {
        const status = err.response?.status || 500;
        return res.status(status).json({
            success: false,
            error: {
                code: 'API_ERROR',
                message: err.response?.data?.message || err.message,
                details: err.response?.data,
            },
        });
    }

    // Default error response
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        error: {
            code: 'INTERNAL_ERROR',
            message: err.message || 'An unexpected error occurred',
        },
    });
};

/**
 * Create custom error with UIC error code
 * @param {string} errorCode - UIC error code
 * @param {string} customMessage - Optional custom message
 * @returns {Error} Error object with UIC code
 */
export const createUICError = (errorCode, customMessage = null) => {
    const error = new Error(customMessage || mapUICError(errorCode).message);
    error.uicErrorCode = errorCode;
    return error;
};
