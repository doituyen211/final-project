import React from "react";
import {Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';
import {Card, CardBody, Col, Row} from "react-bootstrap";

const DashboardSalesComponent = () => {
    const dataRevenue = [
        {month: 'Jan', revenue: 4000},
        {month: 'Feb', revenue: 3000},
        {month: 'Mar', revenue: 5000},
        {month: 'Apr', revenue: 4000},
        {month: 'May', revenue: 3000},
        {month: 'Jun', revenue: 2000},
        {month: 'Jul', revenue: 4000},
        {month: 'Aug', revenue: 3000},
        {month: 'Sep', revenue: 5000},
        {month: 'Oct', revenue: 4000},
        {month: 'Nov', revenue: 3000},
        {month: 'Dec', revenue: 6000},
    ];

    const dataNewStudents = [
        {month: 'Jan', students: 30},
        {month: 'Feb', students: 20},
        {month: 'Mar', students: 50},
        {month: 'Apr', students: 40},
        {month: 'May', students: 30},
        {month: 'Jun', students: 20},
        {month: 'Jul', students: 40},
        {month: 'Aug', students: 30},
        {month: 'Sep', students: 50},
        {month: 'Oct', students: 40},
        {month: 'Nov', students: 30},
        {month: 'Dec', students: 60},
    ];

    const totalRevenue = dataRevenue.reduce((acc, curr) => acc + curr.revenue, 0);

    return (
        <>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Dashboard</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item active">Home</li>
                                <li className="breadcrumb-item active">Dashboard</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <Row className="mt-4">
                        <Col md={6} className="mb-4">
                            <Card className="h-100 shadow-sm rounded">
                                <CardBody className="p-4 text-center">
                                    <h2 className="h4 text-dark mb-3">Tổng doanh thu từ đầu năm đến giờ</h2>
                                    <p className="h1 font-weight-bold text-primary">
                                        {`${totalRevenue.toLocaleString()} VND`}
                                    </p>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={6} className="mb-4">
                            <Card className="h-100 shadow-sm rounded">
                                <CardBody className="p-4 text-center">
                                    <div className="h5">Chưa nghĩ ra</div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="mb-4">
                            <Card className="shadow-sm rounded">
                                <CardBody>
                                    <h2 className="h4 text-dark mb-4">Doanh thu trong 12 tháng gần nhất</h2>
                                    <LineChart
                                        width={900}
                                        height={300}
                                        data={dataRevenue}
                                        margin={{top: 5, right: 30, left: 20, bottom: 5}}
                                    >
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <XAxis dataKey="month"/>
                                        <YAxis/>
                                        <Tooltip/>
                                        <Legend/>
                                        <Line type="monotone" dataKey="revenue" stroke="#8884d8"/>
                                    </LineChart>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={6} className="mb-4">
                            <Card className="shadow-sm rounded">
                                <CardBody>
                                    <h2 className="h4 text-dark mb-4">Số lượng học viên thêm mới hàng tháng</h2>
                                    <BarChart
                                        width={900}
                                        height={300}
                                        data={dataNewStudents}
                                        margin={{top: 5, right: 30, left: 20, bottom: 5}}
                                    >
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <XAxis dataKey="month"/>
                                        <YAxis/>
                                        <Tooltip/>
                                        <Legend/>
                                        <Bar dataKey="students" fill="#82ca9d"/>
                                    </BarChart>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card className="shadow-sm rounded">
                                <CardBody>
                                    <h2 className="h4 text-dark mb-4">Số lượng học viên thêm mới hàng tháng</h2>
                                    <BarChart
                                        width={900}
                                        height={300}
                                        data={dataNewStudents}
                                        margin={{top: 5, right: 30, left: 20, bottom: 5}}
                                    >
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <XAxis dataKey="month"/>
                                        <YAxis/>
                                        <Tooltip/>
                                        <Legend/>
                                        <Bar dataKey="students" fill="#82ca9d"/>
                                    </BarChart>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="shadow-sm rounded">
                                <CardBody>
                                    <h2 className="h4 text-dark mb-4">Số lượng học viên thêm mới hàng tháng</h2>
                                    <BarChart
                                        width={900}
                                        height={300}
                                        data={dataNewStudents}
                                        margin={{top: 5, right: 30, left: 20, bottom: 5}}
                                    >
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <XAxis dataKey="month"/>
                                        <YAxis/>
                                        <Tooltip/>
                                        <Legend/>
                                        <Bar dataKey="students" fill="#82ca9d"/>
                                    </BarChart>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </section>
        </>
    );
};

export default DashboardSalesComponent;
