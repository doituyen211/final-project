import React, {useState} from 'react';
import FormInput from "../../../components/FormInputComponents";
import InputComponents from "../../../components/InputComponents";

const PersonnelForm = ({onSubmit, personnels}) => {
    const [formData, setFormData] = useState({
        id: '',
        positionId: '',
        allowanceId: '',
        qualificationId: '',
        contractId: '',
        employeeId: '',
        employeeName: '',
        positionName: '',
        contractName: '',
        date: '',
        address: '',
        gender: '',
        email: '',
        phoneNumber: '',
        departmentName: '',
        qualificationName: '',
        CCCD: '',
        status: true,
        image: [],
        startDate: '',
        endDate: ''

    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name, value, files} = e.target;
        if (files) {
            setFormData({
                ...formData,
                [name]: Array.from(files) // Chuyển đổi file thành một mảng
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const validate = () => {
        const newErrors = {};
        const isNumber = value => /^\d+$/.test(value);
        const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!formData.employeeId) {
            newErrors.employeeId = 'Mã nhân viên không được để trống';
        } else if (formData.employeeId.length !== 10) {
            newErrors.employeeId = 'Mã nhân viên phải là 10 ký tự';
        } else if (personnels.some(personnel => personnel.employeeId === formData.employeeId)) {
            newErrors.employeeId = 'Mã nhân viên đã tồn tại';
        }

        if (!formData.employeeName) newErrors.employeeName = 'Tên nhân viên không được để trống';

        if (!formData.CCCD) {
            newErrors.CCCD = 'CCCD không được để trống';
        } else if (!isNumber(formData.CCCD)) {
            newErrors.CCCD = 'CCCD chỉ được chứa số';
        } else if (formData.CCCD.length !== 12) {
            newErrors.CCCD = 'CCCD phải là 12 ký tự';
        } else if (personnels.some(personnel => personnel.CCCD === formData.CCCD)) {
            newErrors.CCCD = 'CCCD đã tồn tại';
        }
        if (!formData.position || formData.position === "--Chọn chức vụ--") {
            newErrors.position = 'Chức vụ không được để trống';
        }
        if (!formData.departmentName) newErrors.departmentName = 'Tên Phòng ban không được để trống';
        if (!formData.address) newErrors.address = 'Địa chỉ không được để trống';
        if (!formData.gender || formData.gender === "--Chọn giới tính--") {
            newErrors.gender = 'Giới tính không được để trống';
        }

        if (!formData.phoneNumber) {
            newErrors.phoneNumber = 'Số điện thoại không được để trống';
        } else if (!isNumber(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Số điện thoại chỉ được chứa số';
        } else if (formData.phoneNumber.length !== 10) {
            newErrors.phoneNumber = 'Số điện thoại phải là 10 ký tự';
        }
        if (!formData.qualificationName) {
            newErrors.qualificationName = 'Bằng cấp không được để trống';
        }
        if (!formData.email) {
            newErrors.email = 'Email không được để trống';
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }
        if (!formData.date) {
            newErrors.date = 'Ngày sinh không được để trống';
        }
        if (!formData.startDate) newErrors.startDate = 'Ngày bắt đầu không được để trống';

        if (!formData.endDate) newErrors.endDate = 'Ngày kết thúc không được để trống';
        if (new Date(formData.startDate) > new Date(formData.endDate))
            newErrors.endDate = 'Ngày kết thúc phải sau ngày bắt đầu';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            // Kiểm tra dữ liệu hình ảnh trước khi gọi onSubmit
            const validImages = formData.image.every(file => file instanceof File);
            if (validImages) {
                onSubmit({
                    ...formData,
                    status: true
                });
                setFormData({
                    id: '',
                    positionId: '',
                    allowanceId: '',
                    qualificationId: '',
                    contractId: '',
                    employeeId: '',
                    employeeName: '',
                    positionName: '',
                    departmentName: '',
                    contractName: '',
                    date: '',
                    address: '',
                    gender: '',
                    email: '',
                    phoneNumber: '',
                    CCCD: '',
                    qualificationName: '',
                    status: true,
                    image: [],
                    startDate: '',
                    endDate: ''
                });
                setErrors({});
            } else {
                setErrors({image: 'Hình ảnh không hợp lệ'});
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormInput
                label="Mã nhân viên"
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                error={errors.employeeId}
            />
            <FormInput
                label="Tên nhân viên"
                type="text"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleChange}
                error={errors.employeeName}
            />
            <div className="form-group">
                <label>Chức vụ</label>
                <select
                    name="positionName"
                    value={formData.positionName}
                    onChange={handleChange}
                    className="form-control"
                >
                    <option value="">--Chọn chức vụ--</option>
                    <option value="Giám đốc">Giám đốc</option>
                    <option value="Trưởng phòng">Trưởng phòng</option>
                    <option value="Nhân viên chính thức">Nhân viên chính thức</option>
                    <option value="Nhân viên thử việc">Nhân viên thử việc</option>
                </select>
                {errors.positionName && <div className="text-danger">{errors.positionName}</div>}
            </div>
            <FormInput
                label="Phòng ban"
                type="text"
                name="departmentName" // Đảm bảo name khớp với tên trong state
                value={formData.departmentName}
                onChange={handleChange}
                error={errors.departmentName}
            />
            <FormInput
                label="Ngày sinh"
                type="date"
                name="date" // Đảm bảo name khớp với tên trong state
                value={formData.date}
                onChange={handleChange}
                error={errors.date}
            />
            <FormInput
                label="Địa chỉ"
                type="text"
                name="address" // Đảm bảo name khớp với tên trong state
                value={formData.address}
                onChange={handleChange}
                error={errors.address}
            />
            <div className="form-group">
                <label>Giới tính</label>
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="form-control"
                >
                    <option value="">--Chọn giới tính--</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                </select>
                {errors.gender && <div className="text-danger">{errors.gender}</div>}
            </div>
            <FormInput
                label="Email"
                type="text"
                name="email" // Đảm bảo name khớp với tên trong state
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
            />
            <FormInput
                label="Số điện thoại"
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                error={errors.phoneNumber}
            />
            <FormInput
                label="CCCD"
                type="text"
                name="CCCD"
                value={formData.CCCD}
                onChange={handleChange}
                error={errors.CCCD}
            />
            <FormInput
                label="Bằng cấp"
                type="text"
                name="qualificationName"
                value={formData.qualificationName}
                onChange={handleChange}
                error={errors.qualificationName}
            />
            <div className="form-group">
                <label>Ngày bắt đầu</label>
                <InputComponents
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    error={errors.startDate}
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
                    error={errors.endDate}
                />
                {errors.endDate && <div className="text-danger">{errors.endDate}</div>}
            </div>
            <div className="form-group">
                <label>Image</label>
                <input
                    type="file"
                    name="image"
                    multiple
                    onChange={handleChange}
                    className="form-control"
                    accept=".jpg,.png"
                />
                {formData.image.length > 0 && (
                    <ul className="list-group mt-2">
                        {formData.image.map((image, index) => (
                            <li key={index} className="list-group-item">
                                {image.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <button type="submit" className="btn btn-primary">Thêm nhân viên</button>
        </form>
    );
};

export default PersonnelForm;
