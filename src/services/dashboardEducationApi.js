import axios from "axios";

export const dashboardEducationApi = {
  getQuantity() {
    return axios.get(
      "https://66bc135b24da2de7ff6946bf.mockapi.io/manageStudent"
    );
  },
  getQuantityPerYear(year) {
    return axios.get(
      `https://66bc135b24da2de7ff6946bf.mockapi.io/manageStudent/${year}`
    );
  },
};
