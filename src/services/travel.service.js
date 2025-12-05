import axiosInstance from '../utils/axios-instance.js';
import logger from '../utils/logger.js';

/**
 * Get packages detail by travel period with Covid coverage
 * @param {Object} params - Request parameters
 * @returns {Promise<Object>} API response
 */
export const getPackagesDetailByTravelPeriod = async (params) => {
    try {
        // Format DOB to YYYY-MM-DD if it's in DD/MM/YYYY format
        let formattedDOB = params.DOB;
        if (params.DOB && params.DOB.includes('/')) {
            const [day, month, year] = params.DOB.split('/');
            formattedDOB = `${year}-${month}-${day}`;
        }

        const requestParams = {
            TravelerName: params.TravelerName,
            NICNo: params.NICNo || '',
            NTNNo: params.NTNNo || '',
            TravelDays: params.TravelDays,
            DOB: formattedDOB,
            Covid: params.Covid || 'Covered',
            // UserName, Password, SrvSrce are injected by axios interceptor
        };

        logger.info('Calling GetPackagesDetailByTravelPeriodWithCovid', { params: requestParams });

        const response = await axiosInstance.get('API/Travel/GetPackagesDetailByTravelPeriodWithCovid', {
            params: requestParams,
        });

        return response.data;
    } catch (error) {
        logger.error('Error in getPackagesDetailByTravelPeriod', {
            error: error.message,
            response: error.response?.data,
        });
        throw error;
    }
};

/**
 * Get all coverages detail
 * @returns {Promise<Object>} API response
 */
export const getAllCoveragesDetail = async () => {
    try {
        logger.info('Calling GetALLCoveragesDetail');

        const response = await axiosInstance.get('API/Travel/GetALLCoveragesDetail');

        return response.data;
    } catch (error) {
        logger.error('Error in getAllCoveragesDetail', {
            error: error.message,
            response: error.response?.data,
        });
        throw error;
    }
};

/**
 * Get coverages detail by area
 * @param {string} areaShortCode - Area short code (SCH, ROW, WW, PC)
 * @returns {Promise<Object>} API response
 */
export const getCoveragesDetailByArea = async (areaShortCode) => {
    try {
        logger.info('Calling GetCoveragesDetailbyArea', { areaShortCode });

        const response = await axiosInstance.get('API/Travel/GetCoveragesDetailbyArea', {
            params: {
                AreaShortCode: areaShortCode,
            },
        });

        return response.data;
    } catch (error) {
        logger.error('Error in getCoveragesDetailByArea', {
            error: error.message,
            response: error.response?.data,
        });
        throw error;
    }
};

/**
 * Get country detail by area
 * @param {string} areaShortCode - Area short code (SCH, ROW, WW, PC)
 * @returns {Promise<Object>} API response
 */
export const getCountryDetailByArea = async (areaShortCode) => {
    try {
        logger.info('Calling GetCountryDetailbyArea', { areaShortCode });

        const response = await axiosInstance.get('API/Travel/GetCountryDetailbyArea', {
            params: {
                AreaShortCode: areaShortCode,
            },
        });

        return response.data;
    } catch (error) {
        logger.error('Error in getCountryDetailByArea', {
            error: error.message,
            response: error.response?.data,
        });
        throw error;
    }
};

/**
 * Generate UW document with Covid coverage (Create Policy)
 * @param {Object} policyData - Policy data
 * @returns {Promise<Object>} API response with PolicyNo and PrintURL
 */
export const generateUWDocument = async (policyData) => {
    try {
        // Format DOB and dates to YYYY-MM-DD for UIC API
        let formattedDOB = policyData.DOB;
        if (policyData.DOB && policyData.DOB.includes('/')) {
            const [day, month, year] = policyData.DOB.split('/');
            formattedDOB = `${year}-${month}-${day}`;
        }

        let formattedStartDate = policyData.StartDate;
        if (policyData.StartDate && policyData.StartDate.includes('/')) {
            const [day, month, year] = policyData.StartDate.split('/');
            formattedStartDate = `${year}-${month}-${day}`;
        }

        let formattedSpouseDOB = policyData.SpouseDOB || '';
        if (policyData.SpouseDOB && policyData.SpouseDOB.includes('/')) {
            const [day, month, year] = policyData.SpouseDOB.split('/');
            formattedSpouseDOB = `${year}-${month}-${day}`;
        }

        // Map field names from internal format to UIC API format
        const requestParams = {
            AreaShortCode: policyData.AreaShortCode,
            TravelDate: formattedStartDate, // Map StartDate -> TravelDate
            TravelerName: policyData.TravelerName,
            NoOfDays: policyData.TravelDays, // Map TravelDays -> NoOfDays
            DOB: formattedDOB,
            PassportNo: policyData.PassportNo,
            NICNo: policyData.NICNo || '',
            Address: policyData.Address,
            ContactNo: policyData.PhoneNo, // Map PhoneNo -> ContactNo
            BeneficiaryName: policyData.BeneficiaryName,
            Relationship: policyData.Relationship,
            Country: policyData.Country,
            Remarks: policyData.Remarks || 'Online Purchase',
            PlanType: policyData.PlanType,
            Plan: policyData.PlanName, // Map PlanName -> Plan
            Premium: policyData.Premium,
            NTNNo: policyData.NTNNo || '',
            TravelerEmail: policyData.Email || '', // Map Email -> TravelerEmail
            SpouseName: policyData.SpouseName || '',
            SpouseDOB: formattedSpouseDOB,
            SpousePassport: policyData.SpousePassportNo || '',
            Child1Name: policyData.Children?.[0]?.Name || '',
            Child1DOB: policyData.Children?.[0]?.DOB || '',
            Child1Passport: policyData.Children?.[0]?.PassportNo || '',
            Child2Name: policyData.Children?.[1]?.Name || '',
            Child2DOB: policyData.Children?.[1]?.DOB || '',
            Child2Passport: policyData.Children?.[1]?.PassportNo || '',
            Child3Name: policyData.Children?.[2]?.Name || '',
            Child3DOB: policyData.Children?.[2]?.DOB || '',
            Child3Passport: policyData.Children?.[2]?.PassportNo || '',
            isRequestPolicy: policyData.isRequestPolicy || false,
            ReferenceNo: policyData.ReferenceNo || '',
            ESystemName: policyData.ESystemName || 'OneStop',
            EUserName: policyData.EUserName || policyData.TravelerName,
            Covid: policyData.Covid || 'Covered',
            // UserName, Password, SrvSrce are injected by axios interceptor
        };

        logger.info('Mapped request params for UIC API', { requestParams });

        // UIC API expects query parameters for POST requests
        const response = await axiosInstance.post('API/Travel/GenerateUWDocumentWithCovid', null, {
            params: requestParams,
        });

        return response.data;
    } catch (error) {
        logger.error('Error in generateUWDocument', {
            error: error.message,
            response: error.response?.data,
        });
        throw error;
    }
};

/**
 * Get requested UW document data
 * @param {string} dataFor - Filter: All, Pending, Cancelled, Posted
 * @returns {Promise<Object>} API response
 */
export const getRequestedUWDocuments = async (dataFor) => {
    try {
        logger.info('Calling GetRequestedUWDocumentData', { dataFor });

        const response = await axiosInstance.get('API/Travel/GetRequestedUWDocumentData', {
            params: {
                Datafor: dataFor,
            },
        });

        return response.data;
    } catch (error) {
        logger.error('Error in getRequestedUWDocuments', {
            error: error.message,
            response: error.response?.data,
        });
        throw error;
    }
};

/**
 * Process UW request data (Approve or Cancel)
 * @param {Object} requestData - Request data with RequestID, isCancelled, CRemarks
 * @returns {Promise<Object>} API response
 */
export const processUWRequest = async (requestData) => {
    try {
        logger.info('Calling ProcessUWRequestData', { requestData });

        const response = await axiosInstance.post('API/Travel/ProcessUWRequestData', requestData);

        return response.data;
    } catch (error) {
        logger.error('Error in processUWRequest', {
            error: error.message,
            response: error.response?.data,
        });
        throw error;
    }
};
