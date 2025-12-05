import * as pakcareService from '../services/pakcare.service.js';
import * as pakcareValidator from '../validators/pakcare.validator.js';
import logger from '../utils/logger.js';

/**
 * Get countries
 */
export const getCountries = async (req, res, next) => {
    try {
        // Validate request
        const { error, value } = pakcareValidator.getCountriesSchema.validate(req.query);

        if (error) {
            error.isJoi = true;
            return next(error);
        }

        // Call service
        const result = await pakcareService.getCountries(value.AreaShortCode);

        res.json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get coverages
 */
export const getCoverages = async (req, res, next) => {
    try {
        // Validate request
        const { error, value } = pakcareValidator.getCoveragesSchema.validate(req.query);

        if (error) {
            error.isJoi = true;
            return next(error);
        }

        // Call service
        const result = await pakcareService.getCoverages(value.AreaShortCode);

        res.json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get packages
 */
export const getPackages = async (req, res, next) => {
    try {
        // Validate request
        const { error, value } = pakcareValidator.getPackagesSchema.validate(req.query);

        if (error) {
            error.isJoi = true;
            return next(error);
        }

        // Call service
        const result = await pakcareService.getPackages(value);

        res.json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Create policy
 */
export const createPolicy = async (req, res, next) => {
    try {
        // Validate request
        const { error, value } = pakcareValidator.createPolicySchema.validate(req.body);

        if (error) {
            error.isJoi = true;
            return next(error);
        }

        logger.info('Creating PakCare policy', {
            travelerName: value.TravelerName,
            planType: value.PlanType,
            planName: value.PlanName,
        });

        // Call service
        const result = await pakcareService.createPolicy(value);

        res.json({
            success: true,
            data: result,
            message: 'PakCare policy created successfully',
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get policy requests
 */
export const getRequests = async (req, res, next) => {
    try {
        // Validate request
        const { error, value } = pakcareValidator.getRequestsSchema.validate(req.query);

        if (error) {
            error.isJoi = true;
            return next(error);
        }

        // Call service
        const result = await pakcareService.getRequests(value.Datafor);

        res.json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Process request
 */
export const processRequest = async (req, res, next) => {
    try {
        // Validate request
        const { error, value } = pakcareValidator.processRequestSchema.validate(req.body);

        if (error) {
            error.isJoi = true;
            return next(error);
        }

        logger.info('Processing PakCare request', {
            requestId: value.RequestID,
            isCancelled: value.isCancelled,
        });

        // Call service
        const result = await pakcareService.processRequest(value);

        res.json({
            success: true,
            data: result,
            message: value.isCancelled ? 'Request cancelled successfully' : 'Request processed successfully',
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get report
 */
export const getReport = async (req, res, next) => {
    try {
        // Validate request
        const { error, value } = pakcareValidator.getReportSchema.validate(req.query);

        if (error) {
            error.isJoi = true;
            return next(error);
        }

        // Call service
        const result = await pakcareService.getReport(value);

        res.json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get print URL
 */
export const getPrintUrl = async (req, res, next) => {
    try {
        // Validate request
        const { error, value } = pakcareValidator.getPrintUrlSchema.validate(req.query);

        if (error) {
            error.isJoi = true;
            return next(error);
        }

        // Call service
        const result = await pakcareService.getPrintUrl(value.PolicyNo);

        res.json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};
