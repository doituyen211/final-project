import axios from "axios";
import API from "../store/Api";

export const reservationApi = {
  getReservationList() {
    return axios.get("https://66ac93a1f009b9d5c7329ca9.mockapi.io/api/hocvien");
  },
};
