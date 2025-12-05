import * as travelService from '../services/travel.service.js';
import * as travelValidator from '../validators/travel.validator.js';
import logger from '../utils/logger.js';

/**
 * Get packages by travel period with Covid coverage
 */
export const getPackages = async (req, res, next) => {
    try {
        // Validate request
        const { error, value } = travelValidator.getPackagesSchema.validate(req.body);

        if (error) {
            error.isJoi = true;
            return next(error);
        }

        // Call service
        const result = await travelService.getPackagesDetailByTravelPeriod(value);

        // Return response
        res.json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get all coverages detail
 */
export const getAllCoverages = async (req, res, next) => {
    try {
        const result = await travelService.getAllCoveragesDetail();

        res.json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get coverages by area
 */
export const getCoveragesByArea = async (req, res, next) => {
    try {
        // Validate request
        const { error, value } = travelValidator.getCoveragesByAreaSchema.validate(req.query);

        if (error) {
            error.isJoi = true;
            return next(error);
        }

        // Call service
        const result = await travelService.getCoveragesDetailByArea(value.AreaShortCode);

        res.json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get countries by area
 */
export const getCountries = async (req, res, next) => {
    try {
        // Validate request
        const { error, value } = travelValidator.getCountryByAreaSchema.validate(req.query);

        if (error) {
            error.isJoi = true;
            return next(error);
        }

        // Call service
        const result = await travelService.getCountryDetailByArea(value.AreaShortCode);

        res.json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Create policy (Generate UW Document)
 */
export const createPolicy = async (req, res, next) => {
    try {
        logger.info('Policy creation request received', {
            planType: req.body.PlanType,
            planName: req.body.PlanName,
            travelerName: req.body.TravelerName,
        });

        // Validate request
        const { error, value } = travelValidator.generatePolicySchema.validate(req.body);

        if (error) {
            logger.error('Validation failed', {
                planType: req.body.PlanType,
                errorMessage: error.message,
                errorDetails: error.details,
            });
            error.isJoi = true;
            return next(error);
        }

        logger.info('Validation passed - Creating travel insurance policy', {
            travelerName: value.TravelerName,
            planType: value.PlanType,
            planName: value.PlanName,
        });

        // Call service
        const result = await travelService.generateUWDocument(value);

        res.json({
            success: true,
            data: result,
            message: 'Policy created successfully',
        });
    } catch (error) {
        logger.error('Error in createPolicy controller', {
            error: error.message,
            stack: error.stack,
        });
        next(error);
    }
};

/**
 * Get policy requests
 */
export const getRequests = async (req, res, next) => {
    try {
        // Validate request
        const { error, value } = travelValidator.getRequestsSchema.validate(req.query);

        if (error) {
            error.isJoi = true;
            return next(error);
        }

        // Call service
        const result = await travelService.getRequestedUWDocuments(value.Datafor);

        res.json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Process policy request (Approve or Cancel)
 */
export const processRequest = async (req, res, next) => {
    try {
        // Validate request
        const { error, value } = travelValidator.processRequestSchema.validate(req.body);

        if (error) {
            error.isJoi = true;
            return next(error);
        }

        logger.info('Processing policy request', {
            requestId: value.RequestID,
            isCancelled: value.isCancelled,
        });

        // Call service
        const result = await travelService.processUWRequest(value);

        res.json({
            success: true,
            data: result,
            message: value.isCancelled ? 'Request cancelled successfully' : 'Request processed successfully',
        });
    } catch (error) {
        next(error);
    }
};
