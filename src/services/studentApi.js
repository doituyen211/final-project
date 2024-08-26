// src/store/studentApi.js
import axios from 'axios';

const API_URL = 'https://66ac93a1f009b9d5c7329ca9.mockapi.io/api/thongtinhocvien';

export const fetchStudents = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

export const updateStudent = async (id, studentData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, studentData);
    return response.data;
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
};

export const changePassword = async (id, passwordData) => {
  try {
    // Assuming there is an endpoint for changing the password
    const response = await axios.put(`${API_URL}/${id}/change-password`, passwordData);
    return response.data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};
