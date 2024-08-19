import React, {useState} from 'react';
import {Button, Col, Form, ListGroup, Row} from 'react-bootstrap';
import {FaPlus, FaTimes} from 'react-icons/fa'; // Import Plus and Times icons

function AssignDataForm(props) {
    const [employees, setEmployees] = useState([]);
    const [distributionMethod, setDistributionMethod] = useState('random');
    const [fromDay, setFromDay] = useState('');
    const [toDay, setToDay] = useState('');
    const [selectAll, setSelectAll] = useState(false); // State for "Tất cả nhân viên" checkbox

    // Example staff array
    const staffArray = ['John Doe', 'Jane Smith', 'Emily Davis'];

    const addEmployee = () => {
        const newEmployee = `Nhân viên ${employees.length + 1}`;
        setEmployees([...employees, newEmployee]);
    };

    const removeEmployee = (index) => {
        const updatedEmployees = employees.filter((_, i) => i !== index);
        setEmployees(updatedEmployees);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            fromDay,
            toDay,
            distributionMethod,
            employees,
        };
        console.log(formData);
    };

    return (
        <>
            <div className="container-fluid fullscreen">
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="Form.ControlFromDay">
                                <Form.Label>Nhập Ngày bắt đầu</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={fromDay}
                                    onChange={(e) => setFromDay(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="Form.ControlToDay">
                                <Form.Label>Ngày kết thúc</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={toDay}
                                    onChange={(e) => setToDay(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Radio button: Chia đều dữ liệu */}
                    <hr/>
                    <Form.Group className="mb-3">
                        <Form.Label>Phương pháp chia dữ liệu</Form.Label>
                        <div>
                            <Form.Check
                                type="radio"
                                label="Ngẫu nhiên"
                                name="distributionMethod"
                                value="random"
                                checked={distributionMethod === 'random'}
                                onChange={(e) => setDistributionMethod(e.target.value)}
                            />
                            <Form.Check
                                type="radio"
                                label="Theo thứ tự"
                                name="distributionMethod"
                                value="sequential"
                                checked={distributionMethod === 'sequential'}
                                onChange={(e) => setDistributionMethod(e.target.value)}
                            />
                        </div>
                    </Form.Group>

                    <hr/>
                    <Row className="align-items-center">
                        <Col>
                            <h5>Danh sách nhân viên được chia</h5>
                        </Col>
                        <Col xs="auto">
                            <Form.Check
                                type="checkbox"
                                label="Tất cả nhân viên"
                                checked={selectAll}
                                onChange={(e) => setSelectAll(e.target.checked)}
                            />
                        </Col>
                        <Col xs="auto">
                            <Button
                                variant="link"
                                onClick={addEmployee}
                                disabled={selectAll} d
                            >
                                <FaPlus className={selectAll ? "text-secondary" : "text-primary"}/>
                            </Button>
                        </Col>
                    </Row>
                    <ListGroup className="mt-3">
                        {employees.map((employee, index) => (
                            <ListGroup.Item key={index} className="d-flex align-items-center justify-content-between">
                                <span>{employee}</span>
                                <div className="d-flex align-items-center">
                                    <Form.Select className="ms-3" style={{width: '200px'}}>
                                        {staffArray.map((staff, i) => (
                                            <option key={i} value={staff}>
                                                {staff}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Button
                                        variant="link"
                                        onClick={() => removeEmployee(index)}
                                        className="ms-2 text-danger"
                                    >
                                        <FaTimes/>
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                    <Row className="mt-5">
                        <Button variant="success" type="submit">
                            Submit
                        </Button>
                    </Row>
                </Form>
            </div>
        </>
    );
}

export default AssignDataForm;
