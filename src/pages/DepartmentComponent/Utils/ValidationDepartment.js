
import { toast } from 'react-toastify';


export const validateDepartmentForm = (formValue, departments, editingDepartmentId) => {
    const errors = {};
    const departmentNames = departments
        .filter(dep => dep.id !== editingDepartmentId)
        .map((dep) => dep.departmentName.toLowerCase());


    if (!formValue.departmentName) {
        errors.departmentName = "Tên phòng ban không được bỏ trống.";
        toast.error("Phòng ban không được bỏ trống")
    } else if (departmentNames.includes(formValue.departmentName.toLowerCase())) {
        errors.departmentName = "Tên phòng ban đã tồn tại.";
        toast.error("Phòng ban đã tồn tại")
    }
    if (!formValue.description) {
        errors.description = "Mô tả không được bỏ trống.";
    }
    if (!formValue.status) {
        errors.status = "Trạng thái không được bỏ trống.";
    }
    if (!formValue.createDate) {
        errors.createDate = "Ngày tạo không được bỏ trống.";
    }
    // if (!formValue.updateDate) {
    //     errors.updateDate = "Ngày cập nhật không được bỏ trống.";
    // } else {
    //     const createDate = new Date(formValue.createDate);
    //     const updateDate = new Date(formValue.updateDate);
    //     if (updateDate < createDate) {
    //         errors.updateDate = "Ngày cập nhật không được nhỏ hơn ngày tạo.";
    //     }
    // }
    return errors;
};