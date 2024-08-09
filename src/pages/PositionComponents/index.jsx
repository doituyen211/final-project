// src/components/PositionComponents.js
import React, { useEffect, useState } from 'react';
import './Position.scss';
import TableComponents from "../../components/TableComponents";
import TableBodyComponents from "../../components/TableBodyComponents";
import PositionForm from "./PositionFormComponents";
import PositionViewComponents from "./PositionViewComponents";
import PositionEditComponents from "./PositionEditComponents";
import PagingComponent from "../../components/PagingComponent";
import { format } from 'date-fns';
import ConfirmationComponents from "../../components/ConfirmationComponents";
import { NumericFormat } from 'react-number-format';
import PositionTitleComponents from "./PositionTittleComponents";
import {addPosition, deletePosition, fetchPosition, updatePosition} from "./PositionService/positionService";
import {toast} from "react-toastify";
import {Col, Container, Row} from "react-bootstrap";

const itemsPerPage = 10;

const PositionComponents = () => {
    const [position, setPosition] = useState([]);
    const [filteredPosition, setFilteredPosition] = useState([]);
    const [viewModalShow, setViewModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const headerPosition = ['ID chức vụ', 'Tên chức vụ', 'Phòng Ban', 'Ngày bắt đầu', 'Ngày kết thúc', 'Trạng thái'];

    useEffect(() => {
        loadPosition();
    }, []);

    const loadPosition = async () => {
        try {
            const positionData = await fetchPosition();
            setPosition(positionData);
            setFilteredPosition(positionData);
            setTotalPage(Math.ceil(positionData.length / itemsPerPage));
        
        } catch (error) {
            toast.error('Có lỗi xảy ra khi lấy dữ liệu hợp đồng!');
        }
    };

    const handleSearch = (filtered) => {
        const sortedFiltered = filtered.sort((a, b) => b.status - a.status);
        setFilteredPosition(sortedFiltered);
        setTotalPage(Math.ceil(sortedFiltered.length / itemsPerPage));
        setCurrentPage(1);
    };

    const handleAddPosition = async (newPosition) => {
        try {
            const addedPosition = await addPosition(newPosition);
            const updatedPosition = [...position, addedPosition].sort((a, b) => b.status - a.status);
            setPosition(updatedPosition);
            setFilteredPosition(updatedPosition);
            setTotalPage(Math.ceil(updatedPosition.length / itemsPerPage));
            setCurrentPage(Math.ceil(updatedPosition.length / itemsPerPage));
            toast.success('Thêm chức vụ thành công!');
        } catch (error) {

        }            toast.error('Có lỗi xảy ra khi thêm chức vụ!');
    };

    const handleSaveEdit = async (updatedPosition) => {
        try {
            const savedPosition = await updatePosition(updatedPosition);
            const updatedPositionList = position.map(pos =>
                pos.id === savedPosition.id ? savedPosition : pos
            ).sort((a, b) => b.status - a.status);
            setPosition(updatedPositionList);
            setFilteredPosition(updatedPositionList);
            setTotalPage(Math.ceil(updatedPositionList.length / itemsPerPage));
            setEditModalShow(false);
            toast.success('Cập nhật thành công hợp đồng!');
        } catch (error) {
            toast.error('Có lỗi xảy ra khi cập nhật hợp đồng!');
        }
    };

    const handleDelete = async (id) => {
        try {
            const deletedPosition = await deletePosition(id);
            const updatedPosition = position.filter(pos => pos.id !== id).sort((a, b) => b.status - a.status);
            setPosition(updatedPosition);
            setFilteredPosition(updatedPosition);
            setTotalPage(Math.ceil(updatedPosition.length / itemsPerPage));
            setDeleteModalShow(false);
            toast.success('Xóa thành công hợp đồng!');
        } catch (error) {
            toast.error('Có lỗi xảy ra khi xóa hợp đồng!');
        }
    };

    const handleDeleteConfirm = () => {
        if (selectedPosition) {
            handleDelete(selectedPosition.id);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const formatDate = (dateString) => {
        return dateString ? format(new Date(dateString), 'dd/MM/yyyy') : '';
    };

    const handleView = (position) => {
        setSelectedPosition(position);
        setViewModalShow(true);
    };

    const handleEdit = (position) => {
        setSelectedPosition(position);
        setEditModalShow(true);
    };

    const rows = filteredPosition.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(position => ({
        data: [
            position.IDchucvu, // ID should match the property name in your JSON
            position.Position_Name, // Use correct property name
            position.departmentType,
            <NumericFormat
                value={position.salary || 0} // Ensure salary is defined
                displayType={'text'}
                thousandSeparator="."
                decimalSeparator=","
                prefix=""
                renderText={value => value}
            />,
            formatDate(position.startDate), // Ensure these match your JSON properties
            formatDate(position.endDate),
            position.status ? 'Active' : 'Inactive',
        ],
        actions: [
            {
                className: 'btn-info',
                icon: 'fa-eye',
                onClick: () => handleView(position)
            },
            {
                className: 'btn-warning',
                icon: 'fa-pen',
                onClick: () => handleEdit(position)
            },
            ...(position.status ? [{
                className: 'btn-danger',
                icon: 'fa-trash',
                onClick: () => {
                    setSelectedPosition(position);
                    setDeleteModalShow(true);
                }
            }] : [])
        ]
    }));

    return (
        <Container fluid className="Position-list">
            <PositionTitleComponents onSearch={handleSearch} position={position}/>
            <Row className="Position-content">
                <Col xs={12} md={4}>
                    <h3>Thêm Chức Vụ</h3>
                    <PositionForm onSubmit={handleAddPosition} position={position}/>
                </Col>
                <Col xs={12} md={8}>
                    <TableComponents headers={headerPosition}>
                        <TableBodyComponents rows={rows} />
                    </TableComponents>
                    <PagingComponent
                        totalPage={totalPage}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </Col>
            </Row>
            <PositionViewComponents
                show={viewModalShow}
                handleClose={() => setViewModalShow(false)}
                position={selectedPosition}
            />
            <PositionEditComponents
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                position={selectedPosition}
                onSave={handleSaveEdit}
            />
            <ConfirmationComponents
                show={deleteModalShow}
                handleClose={() => setDeleteModalShow(false)}
                onConfirm={handleDeleteConfirm}
                message="Bạn có chắc chắn muốn xóa chức vụ này?"
            />
        </Container>
    );
};

export default PositionComponents;