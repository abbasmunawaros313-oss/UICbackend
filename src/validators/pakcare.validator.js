import Joi from 'joi';
import {
    isValidAreaCode,
    isValidPlanType,
    isValidCovidOption,
    isValidEmail,
    isValidPhone,
    isValidPassport,
    isValidNIC,
    isValidNTN,
    isValidDateFormat,
    isValidAge
} from '../utils/validators.js';

// Custom Joi validators (reuse from travel validator)
const customJoi = Joi.extend((joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.validAge': 'Age must be between 18 and 86 years',
        'string.validDate': 'Date must be in DD/MM/YYYY format',
        'string.validNIC': 'Invalid NIC format',
        'string.validNTN': 'Invalid NTN format',
        'string.validAreaCode': 'Invalid area code',
        'string.validPlanType': 'Invalid plan type',
        'string.validCovidOption': 'Invalid Covid option',
        'string.validEmail': 'Invalid email format',
        'string.validPhone': 'Invalid phone number format',
        'string.validPassport': 'Invalid passport format',
    },
    rules: {
        validAge: {
            validate(value, helpers) {
                if (!isValidDateFormat(value) || !isValidAge(value)) {
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
    },
}));

// Schema for PakCare Countries
export const getCountriesSchema = customJoi.object({
    AreaShortCode: customJoi.string().optional().validAreaCode(),
});

// Schema for PakCare Coverages
export const getCoveragesSchema = customJoi.object({
    AreaShortCode: customJoi.string().optional().validAreaCode(),
});

// Schema for PakCare Packages
export const getPackagesSchema = customJoi.object({
    TravelerName: customJoi.string().required().min(2).max(100),
    NICNo: customJoi.string().required().validNIC(),
    NTNNo: customJoi.string().required().validNTN(),
    TravelDays: customJoi.number().required().integer().min(1).max(365),
    DOB: customJoi.string().required().validAge(),
    Covid: customJoi.string().required().validCovidOption(),
});

// Schema for PakCare Policy Creation
export const createPolicySchema = customJoi.object({
    TravelerName: customJoi.string().required().min(2).max(100),
    NICNo: customJoi.string().required().validNIC(),
    NTNNo: customJoi.string().required().validNTN(),
    DOB: customJoi.string().required().validAge(),
    PassportNo: customJoi.string().optional().validPassport().allow(''),
    Email: customJoi.string().required().validEmail(),
    PhoneNo: customJoi.string().required().validPhone(),
    Address: customJoi.string().required().min(10).max(500),
    PlanType: customJoi.string().required().validPlanType(),
    PlanName: customJoi.string().required(),
    TravelDays: customJoi.number().required().integer().min(1).max(365),
    StartDate: customJoi.string().required().validDate(),
    EndDate: customJoi.string().required().validDate(),
    Covid: customJoi.string().required().validCovidOption(),
    Premium: customJoi.number().required().min(0),
    Remarks: customJoi.string().optional().allow('').max(500),
});

// Schema for PakCare Get Requests
export const getRequestsSchema = customJoi.object({
    Datafor: customJoi.string().required()
        .valid('All', 'Pending', 'Cancelled', 'Posted'),
});

// Schema for PakCare Process Request
export const processRequestSchema = customJoi.object({
    RequestID: customJoi.string().required(),
    isCancelled: customJoi.boolean().required(),
    CRemarks: customJoi.string().when('isCancelled', {
        is: true,
        then: customJoi.string().required().min(5).max(500),
        otherwise: customJoi.string().optional().allow(''),
    }),
});

// Schema for PakCare Report
export const getReportSchema = customJoi.object({
    StartDate: customJoi.string().required().validDate(),
    EndDate: customJoi.string().required().validDate(),
    ReportType: customJoi.string().optional()
        .valid('Summary', 'Detailed', 'All')
        .default('All'),
});

// Schema for PakCare Get Print URL
export const getPrintUrlSchema = customJoi.object({
    PolicyNo: customJoi.string().required()
        .messages({
            'string.empty': 'Policy number is required',
        }),
});
