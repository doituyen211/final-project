import React, {useState} from 'react';
import '../Contract.scss';
import {CSVLink} from "react-csv";
import SearchComponents from "../../../components/SearchComponents";
import ButtonComponents from "../../../components/ButtonComponents";
import {format} from 'date-fns';
import {toast} from "react-toastify";
import Papa from 'papaparse';

const ContractTitleComponents = ({contracts, onSearch, onAddContract}) => {
    const [dataExport, setDataExport] = useState([]);
    const [importData, setImportData] = useState([]); // useState để lưu trữ dữ liệu nhập

    const handleSearch = (searchTerm) => {
        const searchValue = searchTerm.toLowerCase();

        const filteredContracts = contracts.filter(contract => {
            const employeeId = contract.employeeId ? contract.employeeId.toLowerCase() : '';
            const contractType = contract.contractType ? contract.contractType.toLowerCase() : '';
            const salary = contract.salary ? contract.salary.toString().toLowerCase() : '';
            const startDate = contract.startDate ? contract.startDate.toLowerCase() : '';
            const endDate = contract.endDate ? contract.endDate.toLowerCase() : '';
            const status = contract.status ? (contract.status ? 'active' : 'inactive') : '';

            return (
                employeeId.includes(searchValue) ||
                contractType.includes(searchValue) ||
                salary.includes(searchValue) ||
                startDate.includes(searchValue) ||
                endDate.includes(searchValue) ||
                status.includes(searchValue)
            );
        });

        onSearch(filteredContracts);
    };

    // Xử lí click button import file :
    const handleImportClick = () => {
        document.getElementById('import').click();
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            return format(date, "HH:mm:ss/dd:MM:yyyy");
        } catch {
            return '';
        }
    };

    // Export file csv theo header :
    const getContractExport = () => {
        return new Promise((resolve) => {
            let result = [];
            if (contracts && contracts.length > 0) {
                result.push(["ID", "Mã nhân viên", "Loại hợp đồng", "Mức lương", "Ngày bắt đầu", "Ngày kết thúc", "Trạng thái", "Ngày tạo", "Ngày cập nhật", "Ảnh"]);
                contracts.forEach((item) => {
                    let arr = [];
                    arr[0] = item.id;
                    arr[1] = item.employeeId;
                    arr[2] = item.contractType;
                    arr[3] = item.salary;
                    arr[4] = item.startDate;
                    arr[5] = item.endDate;
                    arr[6] = item.status ? 'Active' : 'Inactive';
                    arr[7] = formatDate(item.created_at);  // Format created_at
                    arr[8] = formatDate(item.updated_at);  // Format updated_at
                    arr[9] = item.files ? item.files.map(file => file.name).join('; ') : '';
                    result.push(arr);
                });
                setDataExport(result);
            }
            resolve();
        });
    };

    // Hàm chuyển đổi dữ liệu từ file CSV thành định dạng hợp lệ
    const addContractFromFile = async (data, handleAddContract) => {
        const now = new Date();

        // Chuyển đổi từng bản ghi trong dữ liệu CSV
        for (const item of data) {
            const contract = {
                employeeId: item['Mã nhân viên'] || '',
                contractType: item['Loại hợp đồng'] || '',
                salary: item['Mức lương'] || '',
                startDate: format(new Date(item['Ngày bắt đầu']), 'yyyy-MM-dd') || '',
                endDate: format(new Date(item['Ngày kết thúc']), 'yyyy-MM-dd') || '',
                files: [], // Giả sử không có tệp đính kèm từ file CSV
                created_at: now.toISOString(),
                updated_at: now.toISOString()
            };

            try {
                await handleAddContract(contract);
            } catch (error) {
                console.error('Có lỗi xảy ra khi thêm hợp đồng:', error);
            }
        }
    };

    const validateData = (data) => {
        console.log(data);
        const newErrors = [];
        const employeeIds = contracts.map(contract => contract.employeeId);

        data.forEach((item, index) => {
            const rowIndex = index + 1;  // Số hàng trong dữ liệu nhập

            // Kiểm tra mã nhân viên
            const employeeId = item["Mã nhân viên"]?.trim(); // Sử dụng tên trường đúng
            if (!employeeId) {
                newErrors.push(`Hàng ${rowIndex}: Mã nhân viên không được để trống.`);
            } else if (employeeId.length !== 10) {
                newErrors.push(`Hàng ${rowIndex}: Mã nhân viên phải là 10 ký tự.`);
            } else if (employeeIds.includes(employeeId)) {
                newErrors.push(`Hàng ${rowIndex}: Mã nhân viên đã tồn tại.`);
            }

            // Kiểm tra loại hợp đồng
            const contractType = item["Loại hợp đồng"]?.trim();
            if (!contractType) {
                newErrors.push(`Hàng ${rowIndex}: Loại hợp đồng không được để trống.`);
            }

            // Kiểm tra mức lương
            const salary = Number(item["Mức lương"]?.replace(/\./g, '').replace(/,/g, ''));
            if (isNaN(salary) || salary <= 0) {
                newErrors.push(`Hàng ${rowIndex}: Mức lương phải là số dương.`);
            }
            // Kiểm tra trạng thái
            const status = item["Trạng thái"]?.trim();
            if (!status || (status.toLowerCase() !== 'active')) {
                newErrors.push(`Hàng ${rowIndex}: Trạng thái phải là 'Active'`);
            }

            // Kiểm tra ngày bắt đầu
            const startDate = item["Ngày bắt đầu"]?.trim();
            if (!startDate) {
                newErrors.push(`Hàng ${rowIndex}: Ngày bắt đầu không được để trống.`);
            }

            // Kiểm tra ngày kết thúc
            const endDate = item["Ngày kết thúc"]?.trim();
            if (!endDate) {
                newErrors.push(`Hàng ${rowIndex}: Ngày kết thúc không được để trống.`);
            } else if (new Date(startDate) > new Date(endDate)) {
                newErrors.push(`Hàng ${rowIndex}: Ngày kết thúc phải sau ngày bắt đầu.`);
            }
        });

        return newErrors;
    };

    // Sử dụng papa để import dữ liệu
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: async (results) => {
                    const {data} = results;
                    const validationErrors = validateData(data);
                    if (validationErrors.length > 0) {
                        validationErrors.forEach(error => toast.error(error));
                    } else {
                        await addContractFromFile(data, onAddContract);
                        toast.success('Dữ liệu nhập thành công.');
                    }
                },
                error: (error) => {
                    console.error('Error parsing file:', error);
                    toast.error('Có lỗi xảy ra khi xử lý tệp.');
                }
            });
        }
    };

    return (
        <div className="row contract-tittle d-flex justify-content-between align-items-center">
            <div className="col-sm-6">
                <h2>DANH SÁCH HỢP ĐỒNG</h2>
            </div>
            <div className="action-button col-sm-6 d-flex justify-content-end align-items-center">
                <SearchComponents onSearch={handleSearch}/>
                <ButtonComponents
                    className='btn btn-success align-items-center'
                    onClick={handleImportClick}
                >
                    <i className="fas fa-file-excel"></i>
                </ButtonComponents>
                <input id='import' type='file' hidden onChange={handleFileChange}/>
                <CSVLink
                    data={dataExport}
                    asyncOnClick={true}
                    onClick={getContractExport}
                    filename={"List-Contract.csv"}
                    className="btn btn-danger align-items-center"
                >
                    <i className="fas fa-file-export"></i>
                </CSVLink>
            </div>
        </div>
    );
};

export default ContractTitleComponents;
