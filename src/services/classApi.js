import axios from "axios";
import API from "../store/Api";

export const classApi = {
  getClassList() {
    return axios.get(API.CLASS);
  },
};
