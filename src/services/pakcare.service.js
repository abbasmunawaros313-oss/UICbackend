import axiosInstance from '../utils/axios-instance.js';
import logger from '../utils/logger.js';

/**
 * Get countries (PakCare API)
 * @param {string} areaShortCode - Optional area short code
 * @returns {Promise<Object>} API response
 */
export const getCountries = async (areaShortCode = null) => {
    try {
        logger.info('Calling PakCare GetCountries', { areaShortCode });

        const params = {};
        if (areaShortCode) {
            params.AreaShortCode = areaShortCode;
        }

        const response = await axiosInstance.get('API/PakCare/GetCountries', { params });

        return response.data;
    } catch (error) {
        logger.error('Error in PakCare getCountries', {
            error: error.message,
            response: error.response?.data,
        });
        throw error;
    }
};

/**
 * Get coverages (PakCare API)
 * @param {string} areaShortCode - Optional area short code
 * @returns {Promise<Object>} API response
 */
export const getCoverages = async (areaShortCode = null) => {
    try {
        logger.info('Calling PakCare GetCoverages', { areaShortCode });

        const params = {};
        if (areaShortCode) {
            params.AreaShortCode = areaShortCode;
        }

        const response = await axiosInstance.get('API/PakCare/GetCoverages', { params });

        return response.data;
    } catch (error) {
        logger.error('Error in PakCare getCoverages', {
            error: error.message,
            response: error.response?.data,
        });
        throw error;
    }
};

/**
 * Get packages (PakCare API)
 * @param {Object} params - Request parameters
 * @returns {Promise<Object>} API response
 */
export const getPackages = async (params) => {
    try {
        logger.info('Calling PakCare GetPackages', { params });

        const response = await axiosInstance.get('API/PakCare/GetPackages', {
            params: {
                TravelerName: params.TravelerName,
                NICNo: params.NICNo,
                NTNNo: params.NTNNo,
                TravelDays: params.TravelDays,
                DOB: params.DOB,
                Covid: params.Covid,
            },
        });

        return response.data;
    } catch (error) {
        logger.error('Error in PakCare getPackages', {
            error: error.message,
            response: error.response?.data,
        });
        throw error;
    }
};

/**
 * Create policy (PakCare API)
 * @param {Object} policyData - Policy data
 * @returns {Promise<Object>} API response
 */
export const createPolicy = async (policyData) => {
    try {
        logger.info('Calling PakCare CreatePolicy', { policyData });

        const response = await axiosInstance.post('API/PakCare/CreatePolicy', policyData);

        return response.data;
    } catch (error) {
        logger.error('Error in PakCare createPolicy', {
            error: error.message,
            response: error.response?.data,
        });
        throw error;
    }
};

/**
 * Get policy requests (PakCare API)
 * @param {string} dataFor - Filter: All, Pending, Cancelled, Posted
 * @returns {Promise<Object>} API response
 */
export const getRequests = async (dataFor) => {
    try {
        logger.info('Calling PakCare GetRequests', { dataFor });

        const response = await axiosInstance.get('API/PakCare/GetRequests', {
            params: {
                Datafor: dataFor,
            },
        });

        return response.data;
    } catch (error) {
        logger.error('Error in PakCare getRequests', {
            error: error.message,
            response: error.response?.data,
        });
        throw error;
    }
};

/**
 * Process request (PakCare API)
 * @param {Object} requestData - Request data
 * @returns {Promise<Object>} API response
 */
export const processRequest = async (requestData) => {
    try {
        logger.info('Calling PakCare ProcessRequest', { requestData });

        const response = await axiosInstance.post('API/PakCare/ProcessRequest', requestData);

        return response.data;
    } catch (error) {
        logger.error('Error in PakCare processRequest', {
            error: error.message,
            response: error.response?.data,
        });
        throw error;
    }
};

/**
 * Get report (PakCare API)
 * @param {Object} params - Report parameters
 * @returns {Promise<Object>} API response
 */
export const getReport = async (params) => {
    try {
        logger.info('Calling PakCare GetReport', { params });

        const response = await axiosInstance.get('API/PakCare/GetReport', {
            params: {
                StartDate: params.StartDate,
                EndDate: params.EndDate,
                ReportType: params.ReportType || 'All',
            },
        });

        return response.data;
    } catch (error) {
        logger.error('Error in PakCare getReport', {
            error: error.message,
            response: error.response?.data,
        });
        throw error;
    }
};

/**
 * Get print URL (PakCare API)
 * @param {string} policyNo - Policy number
 * @returns {Promise<Object>} API response
 */
export const getPrintUrl = async (policyNo) => {
    try {
        logger.info('Calling PakCare GetPrintUrl', { policyNo });

        const response = await axiosInstance.get('API/PakCare/GetPrintUrl', {
            params: {
                PolicyNo: policyNo,
            },
        });

        return response.data;
    } catch (error) {
        logger.error('Error in PakCare getPrintUrl', {
            error: error.message,
            response: error.response?.data,
        });
        throw error;
    }
};
