import React, { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import InputComponents from "../../../components/InputComponents";

// Component để thêm hợp đồng mới
const ContractForm = ({ onSubmit, contracts }) => {
    const [formData, setFormData] = useState({
        employeeId: '',
        contractType: '',
        salary: '',
        startDate: '',
        endDate: '',
        files: [],
        created_at: '',
        updated_at: ''
    });

    const [errors, setErrors] = useState({});

    // useEffect để thiết lập thời gian hiện tại khi form được tải
    useEffect(() => {
        const now = new Date().toISOString().slice(0, 16);
        setFormData(prevState => ({
            ...prevState,
            created_at: now,
            updated_at: now
        }));
    }, []);

    // Hàm xử lý thay đổi dữ liệu form
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        const now = new Date().toISOString().slice(0, 16);
        if (files) {
            setFormData({
                ...formData,
                [name]: Array.from(files),
                updated_at: now
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
                updated_at: now
            });
        }
    };

    // Hàm kiểm tra dữ liệu form
    const validate = () => {
        const newErrors = {};
        if (!formData.employeeId) {
            newErrors.employeeId = 'Mã nhân viên không được để trống';
        } else if (formData.employeeId.length !== 10) {
            newErrors.employeeId = 'Mã nhân viên phải là 10 ký tự';
        } else if (contracts.some(contract => contract.employeeId === formData.employeeId)) {
            newErrors.employeeId = 'Mã nhân viên đã tồn tại';
        }

        if (!formData.contractType) newErrors.contractType = 'Loại hợp đồng không được để trống';

        if (!formData.salary || isNaN(Number(formData.salary.replace(/\./g, ''))) || Number(formData.salary.replace(/\./g, '')) <= 0)
            newErrors.salary = 'Mức lương phải là số dương';

        if (!formData.startDate) newErrors.startDate = 'Ngày bắt đầu không được để trống';

        if (!formData.endDate) newErrors.endDate = 'Ngày kết thúc không được để trống';
        if (new Date(formData.startDate) > new Date(formData.endDate))
            newErrors.endDate = 'Ngày kết thúc phải sau ngày bắt đầu';

        return newErrors;
    };

    // Hàm xử lý khi form được submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            onSubmit({
                ...formData,
                status: true
            });
            const now = new Date().toISOString().slice(0, 16);
            setFormData({
                employeeId: '',
                contractType: '',
                salary: '',
                startDate: '',
                endDate: '',
                files: [],
                created_at: now,
                updated_at: now
            });
            setErrors({});
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Mã nhân viên</label>
                <InputComponents
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    disabled={false}
                />
                {errors.employeeId && <div className="text-danger">{errors.employeeId}</div>}
            </div>

            <div className="form-group">
                <label>Loại hợp đồng</label>
                <select
                    name="contractType"
                    value={formData.contractType}
                    onChange={handleChange}
                    className="form-control"
                >
                    <option value="">-- Chọn loại hợp đồng --</option>
                    <option value="fulltime">Full-time (Toàn thời gian)</option>
                    <option value="parttime">Part-time (Bán thời gian)</option>
                    <option value="freelance">Freelance (Làm việc tự do)</option>
                    <option value="intern">Internship (Thực tập)</option>
                    <option value="seasonal">Seasonal (Theo mùa vụ)</option>
                </select>
                {errors.contractType && <div className="text-danger">{errors.contractType}</div>}
            </div>
            <div className="form-group">
                <label>Mức lương</label>
                <NumericFormat
                    className="form-control"
                    name="salary"
                    value={formData.salary}
                    thousandSeparator="."
                    decimalSeparator=","
                    onValueChange={(values) => {
                        const { value } = values;
                        setFormData({
                            ...formData,
                            salary: value,
                            updated_at: new Date().toISOString().slice(0, 16)
                        });
                    }}
                />
                {errors.salary && <div className="text-danger">{errors.salary}</div>}
            </div>
        
            <div className="form-group">
                <label>Ngày bắt đầu</label>
                <InputComponents
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                />
                {errors.startDate && <div className="text-danger">{errors.startDate}</div>}
            </div>
            <div className="form-group">
                <label>Ngày kết thúc</label>
                <InputComponents
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                />
                {errors.endDate && <div className="text-danger">{errors.endDate}</div>}
            </div>
            <div className="form-group">
                <label>Hồ sơ hợp đồng</label>
                <InputComponents
                    type="file"
                    name="files"
                    onChange={handleChange}
                    className="form-control"
                    multiple
                    accept=".doc,.docx,.xls,.xlsx,.pdf"
                />
                {formData.files.length > 0 && (
                    <ul className="list-group mt-2">
                        {formData.files.map((file, index) => (
                            <li key={index} className="list-group-item">
                                {file.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <button type="submit" className="btn btn-primary">Thêm hợp đồng</button>
        </form>
    );
};

export default ContractForm;
