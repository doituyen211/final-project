import React, {useState} from 'react';
import Input from "../../../components/InputComponents";
import {addDecision} from "../service/decision";
import {useNavigate} from "react-router-dom";
import {toast, Toaster} from 'react-hot-toast';

function CreateDecision({onSuccess}) {
    const [formData, setFormData] = useState({
        manv: '',
        fullName: '',
        content: '',
        date: '',
        phone: '',
        email: '',
        hinhthuc: '',
        status: '',
        phongban: ''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    if (onSuccess) onSuccess();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.manv) newErrors.manv = 'Mã nhân viên là bắt buộc';
        if (!formData.fullName) newErrors.fullName = 'Họ tên là bắt buộc';
        if (!formData.content) newErrors.content = 'Nội dung là bắt buộc';
        if (!formData.date) newErrors.date = 'Ngày quyết định là bắt buộc';
        if (!formData.phone) newErrors.phone = 'Số điện thoại là bắt buộc';
        if (!formData.email) newErrors.email = 'Email là bắt buộc';
        if (!formData.hinhthuc) newErrors.hinhthuc = 'Hình thức là bắt buộc';
        if (!formData.status) newErrors.status = 'Trạng thái là bắt buộc';
        if (!formData.phongban) newErrors.phongban = 'Phòng ban là bắt buộc';

        return newErrors;
    };

    const handleSave = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await addDecision(formData);
            console.log("Decision added:", formData);
            toast.success("Decision added successfully!");
            setFormData({
                manv: '',
                fullName: '',
                content: '',
                date: '',
                phone: '',
                email: '',
                hinhthuc: '',
                status: '',
                phongban: ''
            });
            navigate('/DecisionList');
        } catch (error) {
            console.error("Error adding decision:", error);
            toast.error("Error adding decision.");
        }
    };

    return (
        <div className="create-decision" style={{padding: '20px', marginLeft: '-20px'}}>
            <Toaster/>
            <form className="container" style={{border: '1px solid gray', padding: '20px', borderRadius: '10px'}}
                  onSubmit={handleSave}>
                <h2>Thêm khen thưởng/kỷ luật</h2>
                <div className="row">
                    {[
                        {label: "Mã nhân viên", name: "manv", type: "text", placeholder: "Nhập mã nhân viên..."},
                        {label: "Họ tên", name: "fullName", type: "text", placeholder: "Nhập tên nhân viên..."},
                        {label: "Ngày quyết định", name: "date", type: "date"},
                        {label: "Số điện thoại", name: "phone", type: "text", placeholder: "Nhập số điện thoại..."},
                        {label: "Email address", name: "email", type: "email", placeholder: "Nhập email..."},
                        {label: "Phòng ban", name: "phongban", type: "text", placeholder: "Nhập phòng ban..."}
                    ].map(({label, name, type, placeholder}) => (
                        <div className="col-12" key={name}>
                            <div className="form-group">
                                <label>{label}</label>
                                <Input
                                    type={type}
                                    name={name}
                                    value={formData[name]}
                                    placeholder={placeholder}
                                    onChange={handleChange}
                                />
                                {errors[name] && <div className="text-danger">{errors[name]}</div>}
                            </div>
                        </div>
                    ))}
                    >>>>>>> origin/crm-hr
                    <div className="col-12">
                        <div className="form-group">
                            <label>Nội dung</label>
                            <textarea
                                className="form-control"

                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                            />
                            {errors.content && <div className="text-danger">{errors.content}</div>}
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label>Hình thức</label>
                            <select
                                className="form-control"
                                name="hinhthuc"
                                value={formData.hinhthuc}
                                onChange={handleChange}
                            >
                                <option value="">Chọn hình thức...</option>
                                <option value="Khen thưởng">Khen thưởng</option>
                                <option value="Kỷ luật">Kỷ luật</option>
                            </select>
                            {errors.hinhthuc && <div className="text-danger">{errors.hinhthuc}</div>}
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label>Trạng thái</label>
                            <select
                                className="form-control"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="">Chọn trạng thái...</option>
                                <option value="Đã xử lý">Đã xử lý</option>
                                <option value="Đang chờ">Đang chờ</option>
                            </select>
                            {errors.status && <div className="text-danger">{errors.status}</div>}
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="imageUpload">Tải lên hình ảnh:</label>
                            <input
                                type="file"
                                className="form-control-file"
                                id="imageUpload"
                                accept="image/*"
                            />
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Thêm mới</button>
            </form>
        </div>
    );
}

export default CreateDecision;
