import React, {useState} from 'react';
import {Button, Card, Container, Form} from 'react-bootstrap';
import './ResetPassword.scss';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function ResetPasswordComponent() {
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Password: " + password + " Re-Password: " + rePassword);

        const queryParams = new URLSearchParams(window.location.search);
        const path = API.RESETPASSWORD + '?token=' + queryParams.get('token');

        console.log("Current Path: " + path);

        axios.post(path, {
            "newPassword": password
        }).then(
            (res) => {
                console.log("Đổi mật khẩu thành công!");
                navigate("./login");
            }
        ).catch(
            (error) => {
                console.error("Error during password reset:", error);
            }
        );
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
            <Card className="card-container" style={{width: '100%', maxWidth: '400px'}}>
                <Card.Body>
                    <Card.Title className="text-center">Nhập mật khẩu mới của bạn</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Mật khẩu mới</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Nhập mật khẩu mới"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicRePassword">
                            <Form.Label>Xác nhận mật khẩu</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Xác nhận mật khẩu"
                                value={rePassword}
                                onChange={(e) => setRePassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-100 mt-3"
                        >
                            Đổi mật khẩu
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ResetPasswordComponent;
