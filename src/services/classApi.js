import axios from "axios";

export const classApi = {
  getClassList(className, startDate, endDate) {
    return axios.get("http://localhost:9001/api/v1/classes", {
      params: {
        ...(className ? { className } : {}), // Thêm className nếu nó tồn tại
        ...(startDate ? { startDate } : {}),
        ...(endDate ? { endDate } : {}),

        // className: className ? className : "",
        // startDate: startDate ? startDate : "",
        // endDate: endDate ? endDate : "",
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
    return axios.delete(
      `https://66ac7831f009b9d5c73229a5.mockapi.io/classes/${idClass}`
    );
  },

  editClass(idClass, newData) {
    return axios.put(
      `http://localhost:9001/api/v1/classes/${idClass}`,
      newData
    );
  },

  getTrainingProgram() {
    return axios.get(`http://localhost:9001/training_program/getAllPrograms`);
  },
};
