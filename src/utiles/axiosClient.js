import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const baseURL = process.env.UIC_BASE_URL || "http://travelapi.theunitedsoftware.com";

const axiosClient = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": process.env.UIC_API_KEY || "",
  },
});

export default axiosClient;
