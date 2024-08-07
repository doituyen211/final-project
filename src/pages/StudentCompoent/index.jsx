import { useEffect, useState } from "react";
import PageContent from "./PageContent";
import PageHeader from "./PageHeader";
import PageLayout from "./PageLayout";
import axios from "axios";

const StudentCompoent = () => {
    const [dataTable, setDataTable] = useState([]);
    const [classTable, setClassTable] = useState("");
    const apiUpdate = "https://66ac5cccf009b9d5c731c682.mockapi.io";
    const apiCreate ="https://66ac5cccf009b9d5c731c682.mockapi.io";
    const apiDelete = "https://66ac5cccf009b9d5c731c682.mockapi.io";
    const apiView = "https://66ac5cccf009b9d5c731c682.mockapi.io";

    const getData = async () => {
        try {
            const res = await axios.get(
                "https://66ac5cccf009b9d5c731c682.mockapi.io"
            ); // Get data from api
            setDataTable(res.data);
            setClassTable("table table-bordered table-hover");
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const formFieldsProp = [
        {
            name: "name",
            type: "text",
            label: "Họ tên",
            placeholder: "Nhập họ tên",
        },
        {
            name: "email",
            type: "text",
            label: "Email",
            placeholder: "Nhập email",
        },
        {
            name: "call_number",
            type: "text",
            label: "Số điện thoai",
            placeholder: "Nhập số điện thoai",
        },
        {
            name: "status",
            type: "text",
            label: "Trạng thái",
            placeholder: "Nhập trạng thái",
        },
    ];
    const cols = [
        "Id",
        "Họ tên",
        "Email",
        "Số điện thoại",
        "Trạng thái",
        "",
    ];

    useEffect(() => {
        getData();
    }, [dataTable]);

    const handleSave = (formData) => {
        console.log("Saving data...");
        console.log("Form data:", formData);
        // Your save logic here
    };

    return (
        <PageLayout>
            <PageHeader namePage={"Quản lý học viên"} />
            <PageContent
                headerContent={"Danh sách học viên"}
                dataTable={dataTable}
                getData={getData}
                classTable={classTable}
                apiUpdate={apiUpdate}
                apiCreate={apiCreate}
                apiDelete={apiDelete}
                apiView={apiView}
                formFieldsProp={formFieldsProp}
                cols={cols}
                handleSave={handleSave}
            />
        </PageLayout>
    );
};

export default StudentCompoent;
