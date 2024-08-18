import React from "react";

function DetailDecision({ decision }) {
    return (
        <div>
            <h5>Chi Tiết Quyết Định</h5>
            <table className="table">
                <thead>
                    <tr>
                        <th>Thông tin</th>
                        <th>Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>ID:</td>
                        <td>{decision.id}</td>
                    </tr>
                    <tr>
                        <td>Mã nhân viên:</td>
                        <td>{decision.manv}</td>
                    </tr>
                    <tr>
                        <td>Tên:</td>
                        <td>{decision.name}</td>
                    </tr>
                    <tr>
                        <td>Nội dung:</td>
                        <td>{decision.content}</td>
                    </tr>
                    <tr>
                        <td>Ngày:</td>
                        <td>{decision.date}</td>
                    </tr>
                    <tr>
                        <td>Hình thức:</td>
                        <td>{decision.hinhthuc}</td>
                    </tr>
                    <tr>
                        <td>Trạng thái:</td>
                        <td>{decision.status}</td>
                    </tr>
                    {decision.address && (
                        <tr>
                            <td>Địa chỉ:</td>
                            <td>{decision.address}</td>
                        </tr>
                    )}
                    {decision.phone && (
                        <tr>
                            <td>Số điện thoại:</td>
                            <td>{decision.phone}</td>
                        </tr>
                    )}
                    {decision.img && (
                        <tr>
                            <td>Hình ảnh:</td>
                            <td>
                                <img
                                    src={decision.img}
                                    alt="Image"
                                    style={{ maxWidth: '200px' }}
                                />
                            </td>
                        </tr>
                    )}
                    {decision.phong_ban && (
                        <tr>
                            <td>Phòng ban:</td>
                            <td>{decision.phong_ban}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default DetailDecision;
    