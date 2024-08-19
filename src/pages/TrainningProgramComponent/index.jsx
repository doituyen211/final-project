import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import SearchComponent from './ProgramFormComponents/SearchComponent';
import { fetchAllTrainingPrograms } from '../../services/TrainingProgram';
import TableDataComponent from '../../components/TableProgramComponent/ProgramTableDataComponent';
import ReactPaginate from 'react-paginate';
import ModalFormComponent from '../../components/ModalProgramComponents/ModalFormComponent';
import NotificationComponent from '../../components/NotificationComponent';
import { useLocation } from 'react-router-dom';


const TrainningProgramComponent = () => {
    const [dataTable, setDataTable] = useState([]);
    const cols = ['Tên chương trình', 'Khóa học', 'Học phí', 'Thời gian đào tạo', 'Trạng thái', '']
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const [editData, setEditData] = useState(null);
    const [searchItem, setSearchItem] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;
    useEffect(() => {
        //call api
        getAllTrainningProgram(1, searchItem);
    }, []);


    const getAllTrainningProgram = async (page, searchItem) => {
        try {
            setIsLoading(true);
            let response = await fetchAllTrainingPrograms(page, searchItem);
            if (response || response.data) {
                // console.log("DATA" + JSON.stringify(response))
                setDataTable(response);
                setTotalPages(10);

            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false)
        }

    };
    const handleClose = () => {

        setIsShowModal(false)
        setIsEditMode(false);
        setEditData(null);
        console.log(editData)

    }
    const handleUpdateTable = (data) => {
        if (isEditMode == true) {
            setDataTable(dataTable.map((item) => item.id === data.id ? data : item));
        } else {
            setDataTable([data, ...dataTable]);
        }
    }
    const handleEditProgram = (data) => {
        setIsEditMode(true)
        setEditData(data);
        setIsShowModal(true);
    };
    const handleDeleteProgramSuccess = (id) => {
        // setDataTable(dataTable.filter((item) => item.id !== id));
        getAllTrainningProgram(currentPage, searchItem);
    };
    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
        getAllTrainningProgram(+event.selected + 1, searchItem);
    };

    const handleSearch = () => {

        getAllTrainningProgram(currentPage, searchItem);

    };

    return (
        <>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Quản lý chương trình đào tạo</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Quản lý chương trình đào tạo</li>
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
                                    <div className="row align-items-center mb-3">

                                        <div className="col-md-10 d-flex align-items-center gap-3 justify-content-start">
                                            <SearchComponent
                                                searchItem={searchItem}
                                                handleSearch={handleSearch}
                                                onChange={setSearchItem}
                                            />
                                        </div>
                                        <div className="col-md-2 d-flex align-items-center justify-content-end">
                                            {currentPath === '/programs' &&
                                                <Button variant="primary btn-sm" size="lg" onClick={() => setIsShowModal(true)}>
                                                    Thêm mới
                                                </Button>
                                            }
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <TableDataComponent headers={cols}
                                                dataTable={dataTable}
                                                handleEditProgram={handleEditProgram}
                                                handleDeleteProgramSuccess={handleDeleteProgramSuccess}
                                                pathName={currentPath}
                                                isLoading={isLoading}
                                            />

                                        </div>
                                    </div>
                                    <div className="row justify-content-center mt-3">
                                        <div className="col-auto">
                                            <ReactPaginate
                                                breakLabel="..."
                                                nextLabel=">"
                                                onPageChange={handlePageClick}
                                                pageRangeDisplayed={5}
                                                pageCount={totalPages}
                                                previousLabel="<"
                                                renderOnZeroPageCount={null}
                                                pageClassName='page-item'
                                                pageLinkClassName='page-link'
                                                previousClassName='page-item'
                                                previousLinkClassName='page-link'
                                                nextClassName='page-item'
                                                nextLinkClassName='page-link'
                                                breakClassName='page-item'
                                                breakLinkClassName='page-link'
                                                containerClassName='pagination'
                                                activeClassName='active'
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div className="card-footer">

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ModalFormComponent
                show={isShowModal}
                handleClose={handleClose}
                handleUpdateTable={handleUpdateTable}
                editData={editData}
                isEditMode={isEditMode}
            />
            <NotificationComponent />


        </>
    );
};

export default TrainningProgramComponent;