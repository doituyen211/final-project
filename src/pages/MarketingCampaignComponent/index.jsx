import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table, Row } from "react-bootstrap";
import { BsEye, BsPencil, BsTrash } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import "./index.scss";

function MarketingCampaignComponent(props) {
    const [campaigns, setCampaigns] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [campaignsPerPage] = useState(10);
    const [showModal, setShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [currentCampaign, setCurrentCampaign] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPlatform, setSelectedPlatform] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    const platforms = ["Facebook", "Google", "Instagram", "LinkedIn", "TopCV"];
    const statuses = ["Active", "Completed", "Pending"];

    useEffect(() => {
        fetch(
            "https://66ac52bcf009b9d5c731a280.mockapi.io/schedule/MarketingCampaignComponent"
        )
            .then((response) => response.json())
            .then((data) => {
                setCampaigns(data);
            })
            .catch((error) => console.error("Error fetching data: ", error));
    }, []);

    const handleShowModal = (campaign) => {
        setCurrentCampaign(campaign);
        setIsEdit(true);
        setShowModal(true);
    };

    const handleAddCampaign = () => {
        setCurrentCampaign({});
        setIsEdit(false);
        setShowModal(true);
    };

    const handleViewCampaign = (campaign) => {
        setCurrentCampaign(campaign);
        setShowViewModal(true);
    };

    const handleDeleteCampaign = (id) => {
        fetch(
            `https://66ac52bcf009b9d5c731a280.mockapi.io/schedule/MarketingCampaignComponent/${id}`,
            {
                method: "DELETE",
            }
        )
            .then(() => {
                setCampaigns(
                    campaigns.filter((campaign) => campaign.id !== id)
                );
            })
            .catch((error) =>
                console.error("Error deleting campaign: ", error)
            );
    };

    const handleSaveCampaign = () => {
        if (isEdit) {
            fetch(
                `https://66ac52bcf009b9d5c731a280.mockapi.io/schedule/MarketingCampaignComponent/${currentCampaign.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(currentCampaign),
                }
            )
                .then((response) => response.json())
                .then((updatedCampaign) => {
                    setCampaigns(
                        campaigns.map((campaign) =>
                            campaign.id === updatedCampaign.id
                                ? updatedCampaign
                                : campaign
                        )
                    );
                    setShowModal(false);
                })
                .catch((error) =>
                    console.error("Error updating campaign: ", error)
                );
        } else {
            fetch(
                "https://66ac52bcf009b9d5c731a280.mockapi.io/schedule/MarketingCampaignComponent",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(currentCampaign),
                }
            )
                .then((response) => response.json())
                .then((newCampaign) => {
                    setCampaigns([...campaigns, newCampaign]);
                    setShowModal(false);
                })
                .catch((error) =>
                    console.error("Error adding campaign: ", error)
                );
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handlePlatformChange = (event) => {
        setSelectedPlatform(event.target.value);
        setCurrentPage(0); // Reset về trang đầu tiên khi thay đổi bộ lọc
    };

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
        setCurrentPage(0); // Reset về trang đầu tiên khi thay đổi bộ lọc
    };

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const offset = currentPage * campaignsPerPage;

    const filteredCampaigns = campaigns
        .filter((campaign) =>
            campaign.ten_chien_dich
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        )
        .filter((campaign) =>
            selectedPlatform ? campaign.nen_tang_qc === selectedPlatform : true
        )
        .filter((campaign) =>
            selectedStatus ? campaign.trang_thai === selectedStatus : true
        );

    const currentCampaigns = filteredCampaigns.slice(
        offset,
        offset + campaignsPerPage
    );

    const getStatusClass = (status) => {
        switch (status) {
            case "Active":
                return "text-success mt-2 fw-bold";
            case "Completed":
                return "text-primary mt-2 fw-bold";
            case "Pending":
                return "text-warning mt-2 fw-bold ";
            default:
                return "";
        }
    };

    return (
        <>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Chiến Dịch Quảng Cáo</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">
                                    <button
                                        onClick={() =>
                                            console.log("Home clicked")
                                        }
                                    >
                                        Home
                                    </button>
                                </li>
                                <li className="breadcrumb-item active">
                                    Chiến dịch quảng cáo
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="card">
                            <div className="card-body">
                                <div className="">
                                    <p style={{ fontSize: "1.25rem" }}>
                                        Danh Sách Chiến Dịch Quảng Cáo
                                    </p>

                                    <div className="d-flex dt-entry">
                                        <div className="search-inp position-relative">
                                            <Form.Control
                                                type="text"
                                                placeholder="Tìm kiếm theo tên chiến dịch..."
                                                className="mb-3 mt-3 pr-5"
                                                value={searchTerm}
                                                onChange={handleSearch}
                                            />
                                            <Button
                                                variant="link"
                                                className="search-icon position-absolute"
                                                onClick={() =>
                                                    handleSearch({
                                                        target: {
                                                            value: searchTerm,
                                                        },
                                                    })
                                                }
                                            >
                                                <FaSearch />
                                            </Button>
                                        </div>

                                        <div className="d-flex mb-3">
                                            <Form.Select
                                                className="mb-3 mt-3  slect"
                                                value={selectedPlatform}
                                                onChange={handlePlatformChange}
                                            >
                                                <option value="">
                                                    Tất cả nền tảng
                                                </option>
                                                {platforms.map((platform) => (
                                                    <option
                                                        key={platform}
                                                        value={platform}
                                                    >
                                                        {platform}
                                                    </option>
                                                ))}
                                            </Form.Select>

                                            <Form.Select
                                                className="mb-3 mt-3 ml-4 slect"
                                                value={selectedStatus}
                                                onChange={handleStatusChange}
                                            >
                                                <option value="">
                                                    Tất cả trạng thái
                                                </option>
                                                {statuses.map((status) => (
                                                    <option
                                                        key={status}
                                                        value={status}
                                                    >
                                                        {status}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </div>

                                        <div className="mb-3 mt-3 btn-add">
                                            <Button
                                                variant="primary"
                                                onClick={handleAddCampaign}
                                            >
                                                Thêm Chiến dịch
                                            </Button>
                                        </div>
                                    </div>

                                    <Table striped bordered hover>
                                        <thead className="text-center">
                                            <tr>
                                                <th>Mã chiến dịch</th>
                                                <th>Tên chiến dịch</th>
                                                <th>Nền tảng QC</th>
                                                <th>Ngày chạy QC</th>
                                                <th>Ngày kết thúc QC</th>
                                                <th>Link bài viết</th>
                                                <th>Chi phí chiến dịch</th>
                                                <th>Trạng thái</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-center">
                                            {currentCampaigns.map(
                                                (campaign) => (
                                                    <tr key={campaign.id}>
                                                        <td>{campaign.id}</td>
                                                        <td>
                                                            {
                                                                campaign.ten_chien_dich
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                campaign.nen_tang_qc
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                campaign.ngay_bat_dau
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                campaign.ngay_ket_thuc
                                                            }
                                                        </td>
                                                        <td>
                                                            <a
                                                                href={
                                                                    campaign.link_bai_viet
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                Xem...
                                                            </a>
                                                        </td>
                                                        <td>
                                                            {
                                                                campaign.chi_phi_qc
                                                            }
                                                        </td>
                                                        <td
                                                            className={getStatusClass(
                                                                campaign.trang_thai
                                                            )}
                                                        >
                                                            {
                                                                campaign.trang_thai
                                                            }
                                                        </td>
                                                        <td>
                                                            <Button
                                                                variant="link"
                                                                className="me-2"
                                                                onClick={() =>
                                                                    handleViewCampaign(
                                                                        campaign
                                                                    )
                                                                }
                                                            >
                                                                <BsEye className="text-secondary" />
                                                            </Button>
                                                            <Button
                                                                variant="link"
                                                                className="me-2"
                                                                onClick={() =>
                                                                    handleShowModal(
                                                                        campaign
                                                                    )
                                                                }
                                                            >
                                                                <BsPencil className="text-primary" />
                                                            </Button>
                                                            <Button
                                                                variant="link"
                                                                onClick={() =>
                                                                    handleDeleteCampaign(
                                                                        campaign.id
                                                                    )
                                                                }
                                                            >
                                                                <BsTrash className="text-danger" />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </Table>

                                    <ReactPaginate
                                        previousLabel={"Trước"}
                                        nextLabel={"Sau"}
                                        breakLabel={"..."}
                                        pageCount={Math.ceil(
                                            filteredCampaigns.length /
                                                campaignsPerPage
                                        )}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={handlePageClick}
                                        containerClassName={
                                            "pagination justify-content-center"
                                        }
                                        pageClassName={"page-item"}
                                        pageLinkClassName={"page-link"}
                                        previousClassName={"page-item"}
                                        previousLinkClassName={"page-link"}
                                        nextClassName={"page-item"}
                                        nextLinkClassName={"page-link"}
                                        breakClassName={"page-item"}
                                        breakLinkClassName={"page-link"}
                                        activeClassName={"active"}
                                        forcePage={currentPage}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modal thêm/sửa chiến dịch */}
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {isEdit ? "Sửa chiến dịch" : "Thêm chiến dịch mới"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="campaignName">
                            <Form.Label>Tên chiến dịch</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tên chiến dịch"
                                value={currentCampaign.ten_chien_dich || ""}
                                onChange={(e) =>
                                    setCurrentCampaign({
                                        ...currentCampaign,
                                        ten_chien_dich: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>

                        <Row>
                            <div className="col-6 mt-3">
                                <Form.Group controlId="campaignPlatform">
                                    <Form.Label>Nền tảng QC</Form.Label>
                                    <Form.Select
                                        value={
                                            currentCampaign.nen_tang_qc || ""
                                        }
                                        onChange={(e) =>
                                            setCurrentCampaign({
                                                ...currentCampaign,
                                                nen_tang_qc: e.target.value,
                                            })
                                        }
                                        className="w-100"
                                    >
                                        <option value="">Chọn nền tảng</option>
                                        {platforms.map((platform) => (
                                            <option
                                                key={platform}
                                                value={platform}
                                            >
                                                {platform}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group controlId="campaignStartDate">
                                    <Form.Label className="mt-3">
                                        Ngày chạy QC
                                    </Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={
                                            currentCampaign.ngay_bat_dau || ""
                                        }
                                        onChange={(e) =>
                                            setCurrentCampaign({
                                                ...currentCampaign,
                                                ngay_bat_dau: e.target.value,
                                            })
                                        }
                                    />
                                </Form.Group>

                                <Form.Group controlId="campaignEndDate">
                                    <Form.Label className="mt-3">
                                        Ngày kết thúc QC
                                    </Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={
                                            currentCampaign.ngay_ket_thuc || ""
                                        }
                                        Row
                                        onChange={(e) =>
                                            setCurrentCampaign({
                                                ...currentCampaign,
                                                ngay_ket_thuc: e.target.value,
                                            })
                                        }
                                    />
                                </Form.Group>
                            </div>

                            <div className="col-6 mt-3">
                                <Form.Group controlId="campaignName">
                                    <Form.Label>Link Bài Viết</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập link bài viết"
                                        value={
                                            currentCampaign.link_bai_viet || ""
                                        }
                                        onChange={(e) =>
                                            setCurrentCampaign({
                                                ...currentCampaign,
                                                link_bai_viet: e.target.value,
                                            })
                                        }
                                    />
                                </Form.Group>

                                <Form.Group controlId="campaignName">
                                    <Form.Label className="mt-3">
                                        Chi Phí Chiến Dịch
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập chi phí"
                                        value={currentCampaign.chi_phi_qc || ""}
                                        onChange={(e) =>
                                            setCurrentCampaign({
                                                ...currentCampaign,
                                                chi_phi_qc: e.target.value,
                                            })
                                        }
                                    />
                                </Form.Group>

                                <Form.Group controlId="campaignStatus">
                                    <Form.Label className="mt-3">
                                        Trạng thái
                                    </Form.Label>
                                    <Form.Select
                                        value={currentCampaign.trang_thai || ""}
                                        onChange={(e) =>
                                            setCurrentCampaign({
                                                ...currentCampaign,
                                                trang_thai: e.target.value,
                                            })
                                        }
                                        className="w-100"
                                    >
                                        <option value="">
                                            Chọn trạng thái
                                        </option>
                                        {statuses.map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowModal(false)}
                    >
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleSaveCampaign}>
                        {isEdit ? "Lưu thay đổi" : "Thêm chiến dịch"}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal xem chiến dịch */}
            <Modal
                show={showViewModal}
                onHide={() => setShowViewModal(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết chiến dịch</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        <strong>Tên chiến dịch:</strong>{" "}
                        {currentCampaign.ten_chien_dich}
                    </p>
                    <p>
                        <strong>Nền tảng QC:</strong>{" "}
                        {currentCampaign.nen_tang_qc}
                    </p>
                    <p>
                        <strong>Ngày chạy QC:</strong>{" "}
                        {currentCampaign.ngay_bat_dau}
                    </p>
                    <p>
                        <strong>Ngày kết thúc QC:</strong>{" "}
                        {currentCampaign.ngay_ket_thuc}
                    </p>
                    <p>
                        <strong>Link Bài Viết QC:</strong>{" "}
                        <a
                            href={currentCampaign.link_bai_viet}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {currentCampaign.link_bai_viet}
                        </a>
                    </p>
                    <p>
                        <strong>Chi phí chiến dịch:</strong>{" "}
                        {currentCampaign.chi_phi_qc}
                    </p>
                    <p>
                        <strong>Trạng thái:</strong>{" "}
                        {currentCampaign.trang_thai}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowViewModal(false)}
                    >
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MarketingCampaignComponent;
