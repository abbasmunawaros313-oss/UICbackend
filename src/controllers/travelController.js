import axios from "axios";

const API_BASE = "http://APITravel.theunitedsoftware.com/";
const API_KEY = "7b6f1ttz41169d544e4eda4b2b263e6bffe50d";
const USERNAME = "API.OS.isb";
const PASSWORD = "API.on@estop7*7";
const SRV_SRCE = "UIC";

// Helper function to call UIC API
async function callUIC(endpoint, params = {}) {
  try {
    const url = `${API_BASE}/${endpoint}`;

    const response = await axios.get(url, {
      params: {
        UserName: USERNAME,
        Password: PASSWORD,
        SrvSrce: SRV_SRCE,
        API_KEY: API_KEY,
        ...params,
      },
    });

    return response.data;
  } catch (err) {
    return { error: true, message: err.message };
  }
}

// ----------------------
// CONTROLLER FUNCTIONS
// ----------------------

// 1. Get Packages Detail (GET)
export const getPackagesDetail = async (req, res) => {
  const params = req.query;
  const data = await callUIC("GetPackagesDetailByTravelPeriodWithCovid", params);
  res.json(data);
};

// 2. Get All Coverages
export const getAllCoverages = async (req, res) => {
  const data = await callUIC("GetALLCoveragesDetail");
  res.json(data);
};

// 3. Get Coverages By Area
export const getCoverageByArea = async (req, res) => {
  const params = req.query;
  const data = await callUIC("GetCoveragesDetailbyArea", params);
  res.json(data);
};

// 4. Get Country List By Area
export const getCountriesByArea = async (req, res) => {
  const params = req.query;
  const data = await callUIC("GetCountryDetailbyArea", params);
  res.json(data);
};

// 5. Generate Underwriting Document (POST)
export const generateUWDocument = async (req, res) => {
  try {
    const url = `${API_BASE}/GenerateUWDocumentWithCovid`;

    const response = await axios.post(url, null, {
      params: {
        UserName: USERNAME,
        Password: PASSWORD,
        SrvSrce: SRV_SRCE,
        API_KEY: API_KEY,
        ...req.body,
      },
    });

    res.json(response.data);
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
};

// 6. Get Requested UW (GET)
export const getRequestedUWDocument = async (req, res) => {
  const params = req.query;
  const data = await callUIC("GetRequestedUWDocumentData", params);
  res.json(data);
};

// 7. Process UW Request (POST)
export const processUWRequest = async (req, res) => {
  try {
    const url = `${API_BASE}/ProcessUWRequestData`;

    const response = await axios.post(url, null, {
      params: {
        UserName: USERNAME,
        Password: PASSWORD,
        SrvSrce: SRV_SRCE,
        API_KEY: API_KEY,
        ...req.body,
      },
    });

    res.json(response.data);
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
};
