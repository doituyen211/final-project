// src/store/Api.jsx

// Base URL for the API
// const BASE_URL = 'https://66aa0b5b613eced4eba7559a.mockapi.io';
const BASE_URL = "http://localhost:9001/api";
const BASE_URL_VERSION_1 = "http://localhost:9001/api/v1";
const BASE_URL_TP = "https://64dc81fbe64a8525a0f699a1.mockapi.io/api/v1";
const BASE_URL_INFOR_STU =
    "https://66ac93a1f009b9d5c7329ca9.mockapi.io/api/thongtinhocvien";
// Common API endpoints
const API = {
    SUBJECT: `${BASE_URL_VERSION_1}/subjects`,
    COURSE: `${BASE_URL}/khoa_hoc`,
    SCHEDULE: `${BASE_URL}/lich_hoc`,
    CLASSMEMBERS: `${BASE_URL}/thanh_vien_lop`,
    EXAM_SCHEDULE: `${BASE_URL}/v1/examschedules`,
    CLASS: `${BASE_URL}/class`,
    TRAINNING_PROGRAM: `${BASE_URL_TP}/trainin_program`,
    INFOR_STU: `${BASE_URL_INFOR_STU}/class`,
    LOGIN: `${BASE_URL_VERSION_1}/auth/login`,
    REGISTER: `${BASE_URL_VERSION_1}/auth/register`,
    // Add other API endpoints here if needed
};

export default API;
