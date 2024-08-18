import React, {useState} from 'react';
import '../Position.scss';
import {CSVLink} from "react-csv";
import SearchComponents from "../../../components/SearchComponents";
import ButtonComponents from "../../../components/ButtonComponents";

const PositionTitleComponents = ({position, onSearch}) => {
    const [dataExport, setDataExport] = useState([]);
    const handleSearch = (searchTerm) => {
        const searchValue = searchTerm.toLowerCase();

        const filteredPosition = position.filter(position => {
            const positionId = position.positionId ? position.employeeId.toLowerCase() : '';
            const departmentType = position.departmentType ? position.departmentType.toLowerCase() : '';

            const startDate = position.startDate ? position.startDate.toLowerCase() : '';
            const endDate = position.endDate ? position.endDate.toLowerCase() : '';
            const status = position.status ? (position.status ? 'active' : 'inactive') : '';

            return (
                positionId.includes(searchValue) ||
                
                departmentType.includes(searchValue) ||
                startDate.includes(searchValue) ||
                endDate.includes(searchValue) ||
                status.includes(searchValue)
            );
        });

        onSearch(filteredPosition);
    };

    const handleImportClick = () => {
        document.getElementById('import').click();
    };
    const getPositionExport = (even, done) => {
        let result = [];
        if (position && position.length > 0) {
            result.push(["ID Chức Vụ", "Tên Chức Vụ", "Ngày bắt đầu", "Ngày kết thúc", "Trạng thái"]);
            position.map((item, index) => {
                let arr = [];
                arr[0] = item.id;
                arr[1] = item.positionId;
                arr[2] = item.positionName;
                arr[3] = item.departmentType;
                arr[4] = item.status;
                arr[5] = item.startDate;
                arr[6] = item.endDate;
               
                result.push(arr);
            });
            setDataExport(result);
            done();
        }
    };


    return (
        <div className="row position-tittle d-flex justify-content-between align-items-center">
            <div className="col-sm-6">
                <h2>DANH SÁCH CHỨC VỤ</h2>
            </div>
            <div className="action-button col-sm-6 d-flex justify-content-end align-items-center">
                <SearchComponents onSearch={handleSearch}/>
                <ButtonComponents
                    className='btn btn-success align-items-center'
                    onClick={handleImportClick}
                >
                    <i className="fas fa-file-excel"></i>
                </ButtonComponents>
                <input id='import' type='file' hidden/>

                <CSVLink
                    data={dataExport}
                    asyncOnClick={true}
                    onClick={getPositionExport}
                    filename={"List-Position.csv"}
                    className="btn btn-danger align-items-center"
                >
                    <i className="fas fa-file-export"></i>
                </CSVLink>
            </div>
        </div>
    );
};

export default PositionTitleComponents;