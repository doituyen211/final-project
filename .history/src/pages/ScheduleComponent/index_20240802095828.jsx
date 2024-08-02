import axios from "axios";
import React, { useState } from "react";

const ScheduleComponent = () => {
    const [dataTable, setDataTable] = useState([]);
    const [titleTable, setTitleTable] = useState("");
    const [classTable, setClassTable] = useState("");
    const [totalPage, setTotalPage] = useState(5);
    const [isEdit, setIsEdit] = useState(true);
    const [isCurrent, setIsCurrent] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const apiUpdate = "https://66aa0b5b613eced4eba7559a.mockapi.io/subject";
    const apiCreate = "https://66aa0b5b613eced4eba7559a.mockapi.io/subject";
    const apiDelete = "https://66aa0b5b613eced4eba7559a.mockapi.io/subject";
    const apiView = "https://66aa0b5b613eced4eba7559a.mockapi.io/subject";
    const formFieldsProp = [
        {
            name: "name",
            type: "text",
            label: "Name",
            placeholder: "Enter the name",
        },
        {
            name: "duration",
            type: "text",
            label: "Duration",
            placeholder: "Enter duration",
        },
        {
            name: "programName",
            type: "select",
            label: "Program Name",
            placeholder: "Select a program",
            apiUrl: "/data/status.json",
            defaultOption: {
                value: "",
                label: "Select a program",
            },
        },
        {
            name: "status",
            type: "select",
            label: "Status",
            placeholder: "Select status",
            apiUrl: "/data/status.json",
            defaultOption: {
                value: "",
                label: "Select status",
            },
        },
    ];

    const cols = [
        "Mã môn học",
        "Tên môn học",
        "Thời lượng",
        "Tên chương trình học",
        "Trạng thái",
        "",
    ];

    //BEGIN- GetData
    const getData = async () => {
        try {
            const res = await axios.get(
                "https://66aa0b5b613eced4eba7559a.mockapi.io/subject"
            ); // Get data from api
            setDataTable(res.data);
            setTitleTable("SubjectComponent");
            setClassTable("table table-bordered table-hover");
            setTotalPage(5);
            setCurrentPage(1);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getData();
    }, [dataTable]);
    //-------------

    //Begin - Paging
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    //---------
    //---------Begin - Modal
    const [modalShow, setModalShow] = useState(false);
    const [modalProps, setModalProps] = useState({
        show: modalShow,
        action: "",
        formFieldsProp: formFieldsProp,
        initialIsEdit: false,
        initialIdCurrent: null,
        apiUpdate: apiUpdate,
        apiCreate: apiCreate,
    });

    const handleSave = (formData) => {
        console.log("Saving data...");
        console.log("Form data:", formData);
        // Your save logic here
    };
    //End - Create

    //Begin - Search
    const handleSearch = () => {};
    // End - Search
    return <></>;
};

export default ScheduleComponent;
