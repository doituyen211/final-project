import axios from "axios";

export const classApi = {
  getClassList(className, startDate, endDate) {
    return axios.get("http://localhost:9001/api/v1/classes", {
      params: {
        ...(className ? { className } : {}),
        ...(startDate ? { startDate } : {}),
        ...(endDate ? { endDate } : {}),
      },
    });
  },

  getStudentByIdClass(id) {
    return axios.get(`http://localhost:9001/api/v1/classes/classMember/${id}`);
  },

  addClass(classData) {
    return axios.post("http://localhost:9001/api/v1/classes", classData);
  },

  deleteClass(idClass) {
    return axios.delete(`http://localhost:9001/api/v1/classes/${idClass}`);
  },

  editClass(idClass, newData) {
    return axios.put(
      `http://localhost:9001/api/v1/classes/${idClass}`,
      newData
    );
  },

  getTrainingProgram() {
    return axios.get(
      `http://localhost:9001/api/v1/training_program/getAllPrograms`
    );
  },
};
