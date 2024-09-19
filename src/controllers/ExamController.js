import {
    fetchAllExam,
    fetchAllClasses,
    getDetailExam,
    postCreateExam,
    putEditExam,
    deleteExam, fetchSubjectsByClassId,
} from "../services/ExamService";
import {toast} from "react-toastify";

const getExams = async (
    searchExam,
    currentPage,
    perPage,
    setDataTable,
    setTotalPage,
    setIsLoading
) => {
    try {
        setIsLoading(true);
        const res = await fetchAllExam();
        if (res) {
            let filteredData = res.filter((item) => item.status === false);
            console.log("Check Data: ", filteredData);
            // Sắp xếp dữ liệu theo ID
            filteredData.sort((a, b) => new Date(a.id) - new Date(b.id));


            let formattedData = filteredData.map((item, index) =>
                formatData(item, index)
            );


            if (searchExam) {
                formattedData = formattedData.filter((item) =>
                    item.subject.toLowerCase().includes(searchExam.toLowerCase())
                );
            }

            setTotalPage(Math.ceil(formattedData.length / perPage));
            setDataTable(formattedData);
        }
    } catch (error) {
        console.error("Error fetching exams:", error);
    } finally {
        setIsLoading(false);
    }
};

const formatData = (data, index) => {
    const {
        id,
        subject,
        classField,
        examDate,
        examLink,
        // createdAt = "N/A",
        // updatedAt = "N/A",
        status,
    } = data;


    return {
        STT: index + 1,
        id,
        subject,
        classField,
        examDate: examDate,
        examLink: examLink || "N/A",
        // createdAt,
        // updatedAt,
        status,
    };
};


const handleViewExam = async (examId) =>{
  try {
    await getDetailExam(examId);
  } catch (error){
    toast.error(error.message);
  }
}

const handleCreateExam = async (formData, handleClose, getExams) => {
    try {
        await postCreateExam(
            formData.subject,
            formData.classField,
            formData.examDate,
            formData.examLink,
            // new Date().toISOString(), // createdAt
            // new Date().toISOString() // updatedAt
        );
        toast.success("Thêm mới lịch thi thành công!");
        handleClose();
        getExams();
    } catch (error) {
        toast.error("Đã xảy ra lỗi khi thêm mới lịch thi.");
    }
};

const handleEditExam = async (id, formData, handleClose, getExams) => {
    try {
        await putEditExam(
            id,
            formData.subject,
            formData.classField,
            formData.examDate,
            formData.examLink,
        );
        toast.success("Chỉnh sửa lịch thi thành công!");
        handleClose();
        getExams();
    } catch (error) {
        toast.error("Đã xảy ra lỗi khi chỉnh sửa lịch thi.");
    }
};

const handleDeleteExam = async (id, getExams) => {
    try {
        await deleteExam(id);
        toast.success("Xóa lịch thi thành công!");
        getExams();
    } catch (error) {
        toast.error("Đã xảy ra lỗi khi xóa lịch thi.");
    }
};
// Fetch classes
const getAllClasses = async () => {
    try {
        const response = await fetchAllClasses();
        console.log("Check respones class: ",response);
        return response;
    } catch (error) {
        console.error("Error fetching subjects or classes", error);
        return [];
    }
};

const getSubjectByClassId = async (classId) => {
    try {
        const response = await fetchSubjectsByClassId(classId);
        console.log("Subjects for class ID:", classId, response)
        return response;
    } catch (error) {
        console.error("Error fetching subjects by class ID:", error);
        return [];
    }
}


export {getExams, handleViewExam,handleCreateExam, handleEditExam, handleDeleteExam,getAllClasses,getSubjectByClassId};
