import axios from "./customize-axios";

// Fetch all exams
const fetchAllExam = () => {
  return axios.get("/api/v1/examschedules/getAllExamSchedules");
};

//fetch all classes
const fetchAllClasses = () => {
  return axios.get("/api/v1/classes");
}

const fetchSubjectsByClassId = (classId) => {
  return axios.get(`/api/v1/examschedules/subjects/${classId}`);
}
//get detail exam
const getDetailExam = (examId) =>{
  return axios.get(`/api/v1/examschedules/showdetail/${examId}`);
}
// Create a new exam
const postCreateExam = (subject, classField, examDate, examLink) => {
  return axios.post("/api/v1/examschedules/createExamSchedule", {
    subject,
    classField,
    examDate,
    examLink,
    status:false,
  });
};

// Update an exam
const putEditExam = (id, subject, classField, examDate, examLink) => {
  return axios.put(`/api/v1/examschedules/updateExamSchedule/${id}`, {
    subject,
    classField,
    examDate,
    examLink,
    status:false,
  });
}

// Delete an exam
const deleteExam = (id) => {
  return axios.put(`/api/v1/examschedules/deleteExamSchedule/${id}`, {
    status: true,
  });
};


export { fetchAllExam,fetchAllClasses,fetchSubjectsByClassId,getDetailExam, postCreateExam, putEditExam, deleteExam };
