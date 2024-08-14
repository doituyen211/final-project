import axios from "axios";

export const dashboardEducationApi = {
  getGraduateClasses() {
    return axios.get(
      "https://66bc135b24da2de7ff6946bf.mockapi.io/graduateClasses"
    );
  },

  getReserveStudent() {
    return axios.get(
      "https://66bc135b24da2de7ff6946bf.mockapi.io/reserveStudent"
    );
  },
};
