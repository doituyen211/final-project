import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TableComponents from '../../components/TableComponents';
import PagingComponent from '../../components/PagingComponent';
import { Row, Col } from 'react-bootstrap';
import ListDecision from './ListDecision';
import CreateDecision from './CreateDecision';
import { getDecisionAll } from './service/decision';

const DecisionComponent = () => {
    const [rows, setRows] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const headerContract = ['ID', 'Mã nhân viên', 'Tên nhân viên', 'Nội dung', 'Ngày quyết định', 'Hình thức', 'Trạng thái', 'Action'];

    const fetchData = async () => {
        try {
            const data = await getDecisionAll();
            setRows(data);
            // Assuming the API returns the total pages info as well
            // Adjust according to your API response
            // setTotalPage(response.totalPages);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSuccess = () => {
        fetchData(); // Refresh the list of decisions after creation
    };

    return (
        <>
            <h3>Danh sách quyết định</h3>
            <Row className="contract-content" style={{ textAlign: 'center', padding: '5px' }}>
                <Col className='col-4' style={{ padding: '0' }}>
                    <CreateDecision onSuccess={handleSuccess} />
                </Col>
                <Col className='col-8' style={{ marginTop: '18px' }}>
                    <TableComponents headers={headerContract}>
                        <ListDecision rows={rows} />
                    </TableComponents>
                    <PagingComponent
                        totalPage={totalPage}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </Col>
            </Row>
        </>
    );
};

export default DecisionComponent;
