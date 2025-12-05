import axios from 'axios';
import logger from './logger.js';

// Get baseURL from environment or use default
const baseURL = process.env.UIC_BASE_URL || 'http://travelapi.theunitedsoftware.com/';

if (!process.env.UIC_BASE_URL) {
    logger.warn('UIC_BASE_URL not set in environment, using default:', baseURL);
}

logger.info('Axios instance configuration', { baseURL });

// Create axios instance with base configuration
// Basic Auth credentials from documentation (required for API access)
const BASIC_AUTH_USERNAME = 'TravelAPI';
const BASIC_AUTH_PASSWORD = '85aeezx305ae285f5a7959f89a8af9caa5f57';
const basicAuthToken = Buffer.from(`${BASIC_AUTH_USERNAME}:${BASIC_AUTH_PASSWORD}`).toString('base64');

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 30000, // 30 seconds
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${basicAuthToken}`, // Basic Auth from documentation
    },
});

// Request interceptor - auto-inject credentials
axiosInstance.interceptors.request.use(
    (config) => {
        // Add API Key to headers
        if (process.env.UIC_API_KEY) {
            config.headers['API_KEY'] = process.env.UIC_API_KEY;
            config.headers['x-api-key'] = process.env.UIC_API_KEY; // Try both standard formats
        }

        // Auto-inject UserName, Password, and SrvSrce for all requests
        // UIC API uses query parameters for both GET and POST requests
        if (config.params) {
            config.params = {
                UserName: process.env.UIC_USERNAME,
                Password: process.env.UIC_PASSWORD,
                SrvSrce: process.env.UIC_SRVSRCE,
                ...config.params,
            };
        }
        // For POST with body data (not used by UIC API but kept for compatibility)
        else if (config.method && config.method.toLowerCase() === 'post' && config.data) {
            config.data = {
                UserName: process.env.UIC_USERNAME,
                Password: process.env.UIC_PASSWORD,
                SrvSrce: process.env.UIC_SRVSRCE,
                ...config.data,
            };
        }

        // Log the outgoing request AFTER injection
        logger.info('API Request', {
            method: config.method?.toUpperCase(),
            url: config.url,
            baseURL: config.baseURL,
            params: config.params,
            data: config.data,
            hasApiKey: !!process.env.UIC_API_KEY,
        });

        return config;
    },
    (error) => {
        logger.error('Request Error', { error: error.message });
        return Promise.reject(error);
    }
);

// Response interceptor - log responses
axiosInstance.interceptors.response.use(
    (response) => {
        // Log successful response
        logger.info('API Response', {
            status: response.status,
            url: response.config.url,
            data: response.data,
        });
        return response;
    },
    (error) => {
        // Log error response
        if (error.response) {
            logger.error('API Error Response', {
                status: error.response.status,
                url: error.config?.url,
                data: error.response.data,
            });
        } else if (error.request) {
            logger.error('API No Response', {
                url: error.config?.url,
                message: 'No response received from server',
            });
        } else {
            logger.error('API Request Setup Error', {
                message: error.message,
            });
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
