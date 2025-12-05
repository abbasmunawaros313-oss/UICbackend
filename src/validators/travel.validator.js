import Joi from 'joi';
import {
    isValidAge,
    isValidDateFormat,
    isValidNIC,
    isValidNTN,
    isValidAreaCode,
    isValidPlanType,
    isValidCovidOption,
    isValidEmail,
    isValidPhone,
    isValidPassport,
    isValidGST
} from '../utils/validators.js';

// Custom Joi validators
const customJoi = Joi.extend((joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.validAge': 'Age must be between 18 and 86 years',
        'string.validDate': 'Date must be in DD/MM/YYYY format',
        'string.validNIC': 'Invalid NIC format (13 digits or xxxxx-xxxxxxx-x)',
        'string.validNTN': 'Invalid NTN format',
        'string.validAreaCode': 'Invalid area code (must be SCH, ROW, WW, or PC)',
        'string.validPlanType': 'Invalid plan type (must be S or F)',
        'string.validCovidOption': 'Invalid Covid option (must be "Covered" or "Not Covered")',
        'string.validEmail': 'Invalid email format',
        'string.validPhone': 'Invalid phone number format',
        'string.validPassport': 'Invalid passport format',
        'string.validGST': 'Invalid GST number format',
    },
    rules: {
        validAge: {
            validate(value, helpers) {
                if (!isValidDateFormat(value)) {
                    return helpers.error('string.validDate');
                }
                if (!isValidAge(value)) {
                    return helpers.error('string.validAge');
                }
                return value;
            },
        },
        validDate: {
            validate(value, helpers) {
                if (!isValidDateFormat(value)) {
                    return helpers.error('string.validDate');
                }
                return value;
            },
        },
        validNIC: {
            validate(value, helpers) {
                if (!isValidNIC(value)) {
                    return helpers.error('string.validNIC');
                }
                return value;
            },
        },
        validNTN: {
            validate(value, helpers) {
                if (!isValidNTN(value)) {
                    return helpers.error('string.validNTN');
                }
                return value;
            },
        },
        validAreaCode: {
            validate(value, helpers) {
                if (!isValidAreaCode(value)) {
                    return helpers.error('string.validAreaCode');
                }
                return value;
            },
        },
        validPlanType: {
            validate(value, helpers) {
                if (!isValidPlanType(value)) {
                    return helpers.error('string.validPlanType');
                }
                return value;
            },
        },
        validCovidOption: {
            validate(value, helpers) {
                if (!isValidCovidOption(value)) {
                    return helpers.error('string.validCovidOption');
                }
                return value;
            },
        },
        validEmail: {
            validate(value, helpers) {
                if (!isValidEmail(value)) {
                    return helpers.error('string.validEmail');
                }
                return value;
            },
        },
        validPhone: {
            validate(value, helpers) {
                if (!isValidPhone(value)) {
                    return helpers.error('string.validPhone');
                }
                return value;
            },
        },
        validPassport: {
            validate(value, helpers) {
                if (!isValidPassport(value)) {
                    return helpers.error('string.validPassport');
                }
                return value;
            },
        },
        validGST: {
            validate(value, helpers) {
                if (!isValidGST(value)) {
                    return helpers.error('string.validGST');
                }
                return value;
            },
        },
    },
}));

// Schema for GetPackagesDetailByTravelPeriodWithCovid
export const getPackagesSchema = customJoi.object({
    TravelerName: customJoi.string().required().min(2).max(100)
        .messages({
            'string.empty': 'Traveler name is required',
            'string.min': 'Traveler name must be at least 2 characters',
            'string.max': 'Traveler name must not exceed 100 characters',
        }),
    NICNo: customJoi.string().optional().allow('', null)
        .messages({
            'string.empty': 'NIC number is optional',
        }),
    NTNNo: customJoi.string().optional().allow('', null)
        .messages({
            'string.empty': 'NTN number is optional',
        }),
    TravelDays: customJoi.number().required().integer().min(1).max(1095)
        .messages({
            'number.base': 'Travel days must be a number',
            'number.min': 'Travel days must be at least 1',
            'number.max': 'Travel days must not exceed 1095 (3 years)',
            'any.required': 'Travel days is required',
        }),
    DOB: customJoi.string().required()
        .messages({
            'string.empty': 'Date of birth is required',
        }),
    Covid: customJoi.string().required()
        .messages({
            'string.empty': 'Covid coverage option is required',
        }),
});

// Schema for GetCoveragesDetailbyArea
export const getCoveragesByAreaSchema = customJoi.object({
    AreaShortCode: customJoi.string().required().validAreaCode()
        .messages({
            'string.empty': 'Area short code is required',
        }),
});

// Schema for GetCountryDetailbyArea
export const getCountryByAreaSchema = customJoi.object({
    AreaShortCode: customJoi.string().required().validAreaCode()
        .messages({
            'string.empty': 'Area short code is required',
        }),
});

// Schema for child in family plan
const childSchema = customJoi.object({
    ChildName: customJoi.string().required().min(2).max(100),
    ChildDOB: customJoi.string().required().validDate(),
    ChildPassportNo: customJoi.string().optional().validPassport().allow(''),
});

// Schema for GenerateUWDocumentWithCovid
export const generatePolicySchema = customJoi.object({
    TravelerName: customJoi.string().required().min(2).max(100)
        .messages({
            'string.empty': 'Traveler name is required',
        }),
    NICNo: customJoi.string().required().validNIC()
        .messages({
            'string.empty': 'NIC number is required',
        }),
    NTNNo: customJoi.string().optional().allow('').validNTN()
        .messages({
            'string.empty': 'NTN number is required',
        }),
    DOB: customJoi.string().required().validAge()
        .messages({
            'string.empty': 'Date of birth is required',
        }),
    PassportNo: customJoi.string().required().validPassport()
        .messages({
            'string.empty': 'Passport number is required',
        }),
    Email: customJoi.string().required().validEmail()
        .messages({
            'string.empty': 'Email is required',
        }),
    PhoneNo: customJoi.string().required().validPhone()
        .messages({
            'string.empty': 'Phone number is required',
        }),
    Address: customJoi.string().required().min(10).max(500)
        .messages({
            'string.empty': 'Address is required',
            'string.min': 'Address must be at least 10 characters',
        }),
    BeneficiaryName: customJoi.string().required().min(2).max(100)
        .messages({
            'string.empty': 'Beneficiary name is required',
            'string.min': 'Beneficiary name must be at least 2 characters',
        }),
    Relationship: customJoi.string().required().min(2).max(50)
        .messages({
            'string.empty': 'Relationship is required',
            'string.min': 'Relationship must be at least 2 characters',
        }),
    Country: customJoi.string().required().min(2).max(100)
        .messages({
            'string.empty': 'Country is required',
        }),
    AreaShortCode: customJoi.string().required().validAreaCode()
        .messages({
            'string.empty': 'Area short code is required',
        }),
    CountryCode: customJoi.string().required().min(2).max(3)
        .messages({
            'string.empty': 'Country code is required',
        }),
    PlanType: customJoi.string().required().validPlanType()
        .messages({
            'string.empty': 'Plan type is required',
        }),
    PlanName: customJoi.string().required()
        .valid('DIAMOND', 'GOLD', 'SILVER', 'STANDARD', 'PLATINUM', 'GOLD PLUS', 'SAPPHIRE', 'SAPPHIRE PLUS')
        .messages({
            'string.empty': 'Plan name is required',
            'any.only': 'Invalid plan name',
        }),
    TravelDays: customJoi.number().required().integer().min(1).max(365)
        .messages({
            'any.required': 'Travel days is required',
        }),
    StartDate: customJoi.string().required().validDate()
        .messages({
            'string.empty': 'Start date is required',
        }),
    EndDate: customJoi.string().required().validDate()
        .messages({
            'string.empty': 'End date is required',
        }),
    Covid: customJoi.string().required().validCovidOption()
        .messages({
            'string.empty': 'Covid coverage option is required',
        }),
    Premium: customJoi.number().required().min(0)
        .messages({
            'any.required': 'Premium is required',
            'number.min': 'Premium must be a positive number',
        }),
    GSTNo: customJoi.string().optional().allow('').validGST(),

    // Family plan specific fields (conditional)
    SpouseName: customJoi.string().when('PlanType', {
        is: 'F',
        then: customJoi.string().required().min(2).max(100)
            .messages({
                'string.empty': 'Spouse name is required for family plan',
                'any.required': 'Spouse name is required for family plan',
            }),
        otherwise: customJoi.string().optional().allow(''),
    }),
    SpouseDOB: customJoi.string().when('PlanType', {
        is: 'F',
        then: customJoi.string().required().validAge()
            .messages({
                'string.empty': 'Spouse date of birth is required for family plan',
                'any.required': 'Spouse date of birth is required for family plan',
            }),
        otherwise: customJoi.string().optional().allow(''),
    }),
    SpousePassportNo: customJoi.string().when('PlanType', {
        is: 'F',
        then: customJoi.string().optional().validPassport().allow(''),
        otherwise: customJoi.string().optional().allow(''),
    }),
    NoOfChildren: customJoi.number().when('PlanType', {
        is: 'F',
        then: customJoi.number().integer().min(0).max(10)
            .messages({
                'number.max': 'Maximum 10 children allowed',
            }),
        otherwise: customJoi.number().optional().default(0),
    }),
    Children: customJoi.array().when('NoOfChildren', {
        is: customJoi.number().greater(0),
        then: customJoi.array().items(childSchema).min(1)
            .messages({
                'array.min': 'Children details are required when NoOfChildren > 0',
            }),
        otherwise: customJoi.array().optional().default([]),
    }),

    // Optional fields
    Remarks: customJoi.string().optional().allow('').max(500),
});

// Schema for GetRequestedUWDocumentData
export const getRequestsSchema = customJoi.object({
    Datafor: customJoi.string().required()
        .valid('All', 'Pending', 'Cancelled', 'Posted')
        .messages({
            'string.empty': 'Datafor parameter is required',
            'any.only': 'Datafor must be one of: All, Pending, Cancelled, Posted',
        }),
});

// Schema for ProcessUWRequestData
export const processRequestSchema = customJoi.object({
    RequestID: customJoi.string().required()
        .messages({
            'string.empty': 'Request ID is required',
        }),
    isCancelled: customJoi.boolean().required()
        .messages({
            'any.required': 'isCancelled flag is required',
        }),
    CRemarks: customJoi.string().when('isCancelled', {
        is: true,
        then: customJoi.string().required().min(5).max(500)
            .messages({
                'string.empty': 'Cancellation remarks are required when cancelling',
                'any.required': 'Cancellation remarks are required when cancelling',
                'string.min': 'Cancellation remarks must be at least 5 characters',
            }),
        otherwise: customJoi.string().optional().allow(''),
    }),
});
