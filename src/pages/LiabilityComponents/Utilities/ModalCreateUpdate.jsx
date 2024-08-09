import React, {useEffect, useState} from "react";
import {liabilityFields, studentFields} from "./Field";
import Button from "react-bootstrap/Button";


const ModalCreateUpdate = ({liability, isNew, onSave}) => {
    const [localLiability, setLocalLiability] = useState({});
    useEffect(() => {
        if (isNew) {
            setLocalLiability({
                student_Id: '',
                student_name: '',
                address: '',
                email: '',
                phone_Number: '',
                debt: '',
                period_debt: '',
                status: '',
                course_id: '',
                personnel_id: '',
                note: '',
                create_date: '',
                update_date: ''
            });
        } else {
            setLocalLiability(liability || {});
        }
    }, [liability, isNew]);
    const handleChange = (e) => {
        const {id, value} = e.target;
        setLocalLiability((prev) => ({...prev, [id]: value}));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting:", localLiability);
        if (onSave) {
            console.log("Submitting:", localLiability);
            onSave(localLiability);
        }
    };
    const renderFields = (fields) => {
        return fields.map((field, index) => {
            return (
                <div className="form-group title_info" key={index}>
                    <label htmlFor={field.id} className="title_Student">{field.label}</label>
                    <input type={field.type} id={field.id} className="form-control input    "
                           value={localLiability[field.id] || ""}
                           onChange={handleChange}
                    />
                </div>
            )
        });
    }
    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="card col-6">
                            <h5 className="info_Student">Thông tin học viên</h5>
                            <div className="list_info_Student">
                                {renderFields(studentFields)}
                            </div>
                        </div>
                        <div className="card col-6">
                            <h5 className="info_Liability">Học phí phải trả</h5>
                            <div className="list_info_Liability">
                                {renderFields(liabilityFields)}
                            </div>
                        </div>
                    </div>
                    {isNew && (
                        <Button type="submit" className="btn-primary">Thêm mới</Button>
                    )}
                </form>

            </div>
        </>
    )
}
export default ModalCreateUpdate;

