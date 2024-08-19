import axios from "axios";

const API_URL = "https://66ac93a1f009b9d5c7329ca9.mockapi.io/api/thongtinhocvien";

// Fetch student data
export const fetchStudents = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

// Update student information
export const updateStudent = async (id, studentData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, studentData);
    return response.data;
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
};

// Change password by updating student information
export const changePassword = async (id, currentPassword, newPassword) => {
  try {
    // Fetch the student first
    const students = await fetchStudents();
    const student = students.find(student => student.id === id);

    // Verify current password
    if (student.mat_khau !== currentPassword) {
      throw new Error("Current password is incorrect.");
    }

    // Update the password
    const updatedStudent = {
      ...student,
      mat_khau: newPassword
    };

    const response = await axios.put(`${API_URL}/${id}`, updatedStudent);
    return response.data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};
