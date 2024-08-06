// src/store/Api.jsx

// Base URL for the API
// const BASE_URL = 'https://66aa0b5b613eced4eba7559a.mockapi.io';
const BASE_URL = "http://localhost:8080/api";

// Common API endpoints
const API = {
  SUBJECT: `${BASE_URL}/subject`,
  CLASS: `${BASE_URL}/class`,
  Student: `${BASE_URL}/student`,
    COURSE: `${BASE_URL}/khoa_hoc`,
    SCHEDULE: `${BASE_URL}/lich_hoc`,


    // Add other API endpoints here if needed
};

export default API;
