import axios from "axios";
import API from "../store/Api"; // Đảm bảo đúng đường dẫn tới Api.jsx

// Fetch all exams
const fetchAllExam = () => {
  return axios.get(API.EXAM);
};

// Create a new exam
const postCreateExam = (ma_mon, ma_lop, time, link_exam) => {
  return axios.post(API.EXAM, { ma_mon, ma_lop, time, link_exam });
};

// Update an exam
const putEditExam = (id, ma_mon, ma_lop, time, link_exam) => {
  return axios.put(`${API.EXAM}/${id}`, { ma_mon, ma_lop, time, link_exam });
};

// Delete an exam
const deleteExam = (id) => {
  return axios.delete(`${API.EXAM}/${id}`);
};

export { fetchAllExam, postCreateExam, putEditExam, deleteExam };
