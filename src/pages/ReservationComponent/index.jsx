import React, { useEffect, useState } from "react";
import TableComponents from "../../components/TableComponent";
import PagingComponent from "../../components/PagingComponent";
import ModalComponent from "../../components/ModalComponent";
import { Button } from "react-bootstrap";
import axios from "axios";

const ReservationComponent = () => {
  const [keyword, setKeyword] = useState("");
  const [dataTable, setDataTable] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [titleTable, setTitleTable] = useState("");
  const [classTable, setClassTable] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Set the number of items per page

  const apiCreate = "https://66ac93a1f009b9d5c7329ca9.mockapi.io/api/hocvien";
  const apiDelete = "https://66ac93a1f009b9d5c7329ca9.mockapi.io/api/hocvien";
  const apiView = "https://66ac93a1f009b9d5c7329ca9.mockapi.io/api/hocvien";
  const apiUpdate = "https://66ac93a1f009b9d5c7329ca9.mockapi.io/api/hocvien";

  const formFieldsProp = [
    {
      name: "code",
      type: "text",
      label: "Mã học viên",
      placeholder: "Nhập mã học viên",
    },
    {
      name: "name",
      type: "text",
      label: "Họ và tên",
      placeholder: "Nhập tên",
    },
    {
      name: "phonenumber",
      type: "text",
      label: "Số điện thoại",
      placeholder: "Nhập số điện thoại",
    },
    {
      name: "email",
      type: "text",
      label: "Email",
      placeholder: "Nhập email",
    },
    {
      name: "started",
      type: "date",
      label: "Thời gian bắt đầu",
    },
    {
      name: "ended",
      type: "date",
      label: "Thời gian kết thúc",
    },
    {
      name: "status",
      type: "text",
      label: "Trạng thái",
      placeholder: "Nhập trạng thái",
    },
  ];
  const cols = [
    "STT",
    "Mã học viên",
    "Tên học viên",
    "Số điện thoại",
    "Email",
    "Thời gian bắt đầu",
    "Thời gian kết thúc",
    "Trạng thái",
    "",
  ];

  // Get data from API
  const getData = async (page = 1) => {
    try {
      const res = await axios.get(apiView);
      const allData = res.data;
      setDataTable(allData);
      setFilteredData(allData);
      setTitleTable("ReservationComponent");
      setClassTable("table table-bordered table-hover");

      const total = Math.ceil(allData.length / itemsPerPage);
      setTotalPage(total);
      paginateData(allData, page);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    paginateData(filteredData, pageNumber);
  };

  // Pagination logic
  const paginateData = (data, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const paginated = data.slice(startIndex, startIndex + itemsPerPage);
    setPaginatedData(paginated);
  };

  // Modal handling
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

  // Handle search
  const handleSearch = (event) => {
    setKeyword(event.target.value);
    let term = event.target.value.toLowerCase();
    if (term) {
      const filtered = dataTable.filter((item) =>
        item.name.toLowerCase().includes(term)
      );
      setFilteredData(filtered);
      paginateData(filtered, 1); // Reset to first page for search results
      setCurrentPage(1);
      setTotalPage(Math.ceil(filtered.length / itemsPerPage)); // Recalculate total pages for search results
    } else {
      setFilteredData(dataTable);
      paginateData(dataTable, 1); // Reset to first page if search term is cleared
      setCurrentPage(1);
      setTotalPage(Math.ceil(dataTable.length / itemsPerPage)); // Recalculate total pages
    }
  };

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Quản lý Bảo Lưu</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">Quản lý bảo lưu</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col">
              <div className="card card-primary">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-md-10 d-flex align-items-center gap-3">
                      <div className="d-flex col-md-6 justify-between-end gap-2">
                        <input
                          type="text"
                          value={keyword}
                          className="form-control"
                          placeholder="Tìm kiếm học viên..."
                          aria-label="Search input"
                          onChange={handleSearch}
                        />
                        <Button variant="light" size="sm">
                          <i className="bi bi-search"></i>
                        </Button>
                      </div>
                    </div>
                    <div className="col-md-2 d-flex align-items-center justify-content-end">
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={() => {
                          setModalShow(true);
                          setModalProps({
                            onHide: () => setModalShow(false),
                            onSave: handleSave,
                            action: "CREATE",
                            formFieldsProp: formFieldsProp,
                            initialIsEdit: true,
                            initialIdCurrent: null,
                            apiCreate: apiCreate,
                          });
                        }}
                      >
                        <i className="bi bi-plus-circle"></i>
                      </Button>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12" style={{ width: "100%" }}>
                      <TableComponents
                        cols={cols}
                        dataTable={paginatedData}
                        classTable={classTable}
                        apiDelete={apiDelete}
                        apiUpdate={apiUpdate}
                        apiView={apiView}
                        formFieldsProp={formFieldsProp}
                        getData={getData}
                      />
                    </div>
                  </div>
                  <div className="row justify-content-center mt-3">
                    <div className="col-auto">
                      <PagingComponent
                        totalPage={totalPage}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="card-footer"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ModalComponent show={modalShow} getData={getData} {...modalProps} />
    </>
  );
};

export default ReservationComponent;
