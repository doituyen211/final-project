import React, { useEffect, useState } from 'react';
import { Modal, Button, Table, Spinner } from 'react-bootstrap';
import { fetchClassesByProgramId, fetchSubjectsByProgramId } from '../../services/TrainingProgram';
import ReactPaginate from 'react-paginate';

const DataTableDetailComponent = ({ show, handleClose, data }) => {
    const [activeTab, setActiveTab] = useState('subjects');
    const [subjects, setSubjects] = useState([]);
    const [classes, setClasses] = useState([]);
    const [pageCount, setPageCount] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const getClasses = async (currentPage, id) => {
        try {
            setIsLoading(true)
            let response = await fetchClassesByProgramId(currentPage, id);
            if (response) {
                setClasses(response.data)
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false)
        }
    }
    const getSubjects = async (currentPage, id) => {
        try {
            setIsLoading(true);
            let response = await fetchSubjectsByProgramId(currentPage, id);
            if (response) {
                setSubjects(response.data)
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false)
        }
    }
    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);

    };
    useEffect(() => {
        if (activeTab === 'subjects') {
            getSubjects(currentPage, data.id)
        } else if (activeTab === 'classes') {
            getClasses(currentPage, data.id)
        }
    }, [activeTab, currentPage]);

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết dữ liệu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex justify-content-center mb-3">
                    <Button
                        variant={activeTab === 'subjects' ? 'primary' : 'secondary'}
                        onClick={() => setActiveTab('subjects')}
                        className="me-2"
                    >
                        Môn học
                    </Button>
                    <Button
                        variant={activeTab === 'classes' ? 'primary' : 'secondary'}
                        onClick={() => setActiveTab('classes')}
                    >
                        Lớp học
                    </Button>
                </div>

                {activeTab === 'subjects' && (
                    <div>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Tên môn học</th>
                                    <th>Thời lượng đào tạo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="2" style={{ textAlign: "center" }}>
                                            <Spinner animation="border" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </Spinner>
                                        </td>
                                    </tr>
                                ) : (
                                    subjects.map((subject, index) => (
                                        <tr key={index}>
                                            <td>{subject.name}</td>
                                            <td>{subject.time}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                        <div className='d-flex justify-content-center'>
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel=" >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={5}
                                pageCount={pageCount}
                                previousLabel="< "
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

                )}

                {activeTab === 'classes' && (
                    <>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Tên lớp học</th>
                                    <th>Sĩ số</th>
                                    <th>Thời gian bắt đầu</th>
                                    <th>Thời gian kết thúc</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="4" style={{ textAlign: "center" }}>
                                            <Spinner animation="border" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </Spinner>
                                        </td>
                                    </tr>
                                ) : (
                                    classes.map((classItem, index) => (
                                        <tr key={index}>
                                            <td>{classItem.className}</td>
                                            <td>{classItem.number}</td>
                                            <td>{classItem.timeStart}</td>
                                            <td>{classItem.endStart}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                        <div className='d-flex justify-content-center'>


                            <ReactPaginate
                                breakLabel="..."
                                nextLabel=">"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={5}
                                pageCount={pageCount}
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
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DataTableDetailComponent;
