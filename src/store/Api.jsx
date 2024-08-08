// src/store/Api.jsx

// Base URL for the API
const BASE_URL = 'http://localhost:8080/api';
const BASE_URL_TP = 'https://64dc81fbe64a8525a0f699a1.mockapi.io/api/v1';
const BASE_URL_STUDENT = 'https://66b437f79f9169621ea21d35.mockapi.io';
// Common API endpoints
const API = {
  SUBJECT: `${BASE_URL}/subject`,
  STUDENT: `${BASE_URL_STUDENT}/student`,
  COURSE: `${BASE_URL}/khoa_hoc`,
  SCHEDULE: `${BASE_URL}/lich_hoc`,
  CLASS: `${BASE_URL}/class`,
    TRAINNING_PROGRAM: `${BASE_URL_TP}/trainin_program`

  // Add other API endpoints here if needed
};

export default API;
