import axios from "axios";
import API from "../store/Api";

export const classApi = {
  getClassList() {
    return axios.get("https://66ac7831f009b9d5c73229a5.mockapi.io/classes");
  },

  getStudentByIdClass(id) {
    return axios.get(
      `https://66ac7831f009b9d5c73229a5.mockapi.io/students/${id}`
    );
  },

  addClass(classData) {
    return axios.post(
      "https://66ac7831f009b9d5c73229a5.mockapi.io/classes",
      classData
    );
  },

  deleteClass(idClass) {
    return axios.delete(
      `https://66ac7831f009b9d5c73229a5.mockapi.io/classes/${idClass}`
    );
  },

  editClass(idClass, newData) {
    return axios.put(
      `https://66ac7831f009b9d5c73229a5.mockapi.io/classes/${idClass}`,
      newData
    );
  },

  getTrainingProgram() {
    return axios.get(
      `https://64dc81fbe64a8525a0f699a1.mockapi.io/api/v1/trainin_program`
    );
  },
};
