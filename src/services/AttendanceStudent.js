import axios from "axios";
import API from "../store/Api";

const getAttendanceListByStudentId = () => {
    return axios.get("https://66b9d5d2fa763ff550f9bcdc.mockapi.io/my-roll-call");
}
const getDetailAttendanceBySubjectId = () => {
    return axios.get('https://66b9d5d2fa763ff550f9bcdc.mockapi.io/my-roll-call2');
}

export { getAttendanceListByStudentId, getDetailAttendanceBySubjectId };