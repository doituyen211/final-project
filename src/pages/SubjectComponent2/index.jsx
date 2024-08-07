import React, { useEffect, useState, useCallback } from "react";
import { Button } from "react-bootstrap";
import SearchComponents from "../../components/SearchComponents";
import PagingComponent from "../../components/PagingComponent";
import TableComponents from "../../components/TableComponent";
import ModalComponent from "../../components/ModalComponent";
import { fetchAllExam } from "../../services/ExamService";
import API from "../../store/Api";
import DeleteComponent from "../../components/DeleteItemComponent";

const ExamComponent = () => {
  const cols = [
    "STT",
    "Mã môn học",
    "Mã lớp học",
    "Ngày thi",
    "Link bài thi",
    "Hành động",
  ];

  const fieldProps = [
    { name: "ma_mon", type: "text", label: "Mã môn học" },
    { name: "ma_lop", type: "text", label: "Mã lớp học" },
    { name: "thoi_gian", type: "date", label: "Ngày thi" },
    { name: "link_bai_thi", type: "text", label: "Link bài thi" },
  ];

  const [totalPage, setTotalPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataTable, setDataTable] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [action, setAction] = useState("");
  const [currentExam, setCurrentExam] = useState(null);
  const [searchExam, setSearchExam] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const perPage = 10;

  const api = API.EXAM;

  useEffect(() => {
    getExams();
  }, [currentPage, searchExam]);

  const getExams = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAllExam();
      console.log("->> Check res: ", res);
      if (res && res.data.content) {
        let formattedData = res.data.content.map((item, index) =>
          formatData(item, index)
        );
        if (searchExam) {
          formattedData = formattedData.filter((item) =>
            item.ma_mon.toLowerCase().includes(searchExam.toLowerCase())
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

  const formatData = (data) => {
    const { id, ma_mon, ma_lop, thoi_gian, link_bai_thi } = data;
    const formattedTime = new Date(thoi_gian * 1000).toLocaleDateString();
    return {
      id,
      ma_mon,
      ma_lop,
      thoi_gian: formattedTime,
      link_bai_thi: link_bai_thi || "N/A",
    };
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastRecord = currentPage * perPage;
  const indexOfFirstRecord = indexOfLastRecord - perPage;
  const currentData = dataTable.slice(indexOfFirstRecord, indexOfLastRecord);

  const handleShowModal = (action, exam = null) => {
    setAction(action);
    setCurrentExam(exam);
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setModalShow(false);
    setCurrentExam(null);
    getExams();
  };

  const confirmDelete = (exam) => {
    setDeleteItemId(exam.id);
    setShowConfirmModal(true);
  };

  const handleDeleteConfirmation = async () => {
    // Thực hiện xóa tại đây
    setShowConfirmModal(false);
    getExams();
  };

  const handleSearch = (exam) => {
    setSearchExam(exam);
  };

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Quản Lý Lịch Thi</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">Quản lý lịch thi</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col">
              <div className="card card-primary">
                <div className="card-body">
                  <div
                    style={{
                      fontWeight: "500",
                      fontSize: 18,
                      marginBottom: 8,
                    }}
                  >
                    Danh sách lịch thi
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="flex-grow-1">
                      <SearchComponents onSearch={handleSearch} />
                    </div>
                    <div>
                      <Button
                        variant="primary"
                        className="align-items-center"
                        onClick={() => handleShowModal("CREATE")}
                      >
                        <i className="bi bi-plus"></i>
                        Thêm mới
                      </Button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <TableComponents
                        cols={cols}
                        titleTable="Danh sách lịch thi"
                        dataTable={currentData}
                        classTable="table table-bordered table-hover"
                        formFieldsProp={fieldProps}
                        useModal={true}
                        actionDelete={confirmDelete}
                        openModal={handleShowModal}
                        currentPage={currentPage}
                        isLoading={isLoading}
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
              </div>
            </div>
          </div>
        </div>
      </section>
      {modalShow && (
        <ModalComponent
          show={modalShow}
          onHide={handleCloseModal}
          action={action}
          formFieldsProp={fieldProps}
          initialIdCurrent={currentExam ? currentExam.id : null}
          api={api}
          getData={getExams}
          dataForm={currentExam || {}}
        />
      )}
      <DeleteComponent
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        onConfirm={handleDeleteConfirmation}
        deleteItemID={deleteItemId}
        apiDelete={api}
      />
    </>
  );
};

export default ExamComponent;
