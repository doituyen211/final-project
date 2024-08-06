// src/store/Api.jsx

// Base URL for the API
// const BASE_URL = 'https://66aa0b5b613eced4eba7559a.mockapi.io';
const BASE_URL = "http://localhost:8080/api";

// Common API endpoints
const API = {
    SUBJECT: `${BASE_URL}/subject`,
    SCHEDULE: `${BASE_URL}/lich_hoc`,
    CLASS: `${BASE_URL}/class`,

    // Add other API endpoints here if needed
};

export default API;
