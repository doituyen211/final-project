import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';

function LoginComponent() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (username, password) => {
        // Giả sử đăng nhập thành công nếu có tên người dùng và mật khẩu
        if (username && password) {
            setIsLoggedIn(true);
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <div className="Login">
            {isLoggedIn ? (
                <Logout onLogout={handleLogout} />
            ) : (
                <Login onLogin={handleLogin} />
            )}
        </div>
    );
}

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginClick = () => {
        onLogin(username, password);
    };

    return (
        <div className="container container-fluid">
            <Card>
                <div className="row p-4">
                    <div className="col-6">
                        <Form.Group controlId="formUsername">
                            <Form.Label>Tên người dùng</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tên người dùng"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Nhập mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleLoginClick}>
                            Đăng nhập
                        </Button>
                    </div>
                    <div className="col-6">
                        <Button variant="outline-danger">Đăng nhập bằng Google</Button>
                        <Button variant="outline-primary">Đăng nhập bằng Facebook</Button>
                        <Button variant="outline-dark">Đăng nhập bằng Github</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}

function Logout({ onLogout }) {
    return (
        <div className="container container-fluid">
            <Card>
                <div className="row p-4">
                    <div className="col-12">
                        <h3>Bạn đã đăng nhập thành công!</h3>
                        <Button variant="danger" onClick={onLogout}>
                            Đăng xuất
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default LoginComponent;
