// App.js
import React, { useState } from 'react';
import './index.css'; // Import file CSS đã tạo
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Form } from 'react-bootstrap';

function LoginComponent() {
    const [isActive, setIsActive] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleRegisterClick = () => {
        setIsActive(true);
    };

    const handleLoginClick = () => {
        setIsActive(false);
    };

    const handleLogin = (username, password) => {
        if (username && password) {
            setIsLoggedIn(true);
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <div className={`container ${isActive ? "active" : ""}`}>
            {isLoggedIn ? (
                <Logout onLogout={handleLogout} />
            ) : (
                <>
                    <div className="form-container sign-up">
                        <SignUpForm />
                    </div>
                    <div className="form-container sign-in">
                        <SignInForm onLogin={handleLogin} />
                    </div>
                    <TogglePanel
                        handleLoginClick={handleLoginClick}
                        handleRegisterClick={handleRegisterClick}
                    />
                </>
            )}
        </div>
    );
}

function SignUpForm() {
    return (
        <form>
            <h1>Create Account</h1>
            <div className="social-icons">
                <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
                <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="button">Sign Up</button>
        </form>
    );
}

function SignInForm({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginClick = () => {
        onLogin(username, password);
    };

    return (
        <form>
            <h1>Sign In</h1>
            <div className="social-icons">
                <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
                <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for login</span>
            <input type="email" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <a href="#">Forget Your Password?</a>
            <button type="button" onClick={handleLoginClick}>Sign In</button>
        </form>
    );
}

function TogglePanel({ handleLoginClick, handleRegisterClick }) {
    return (
        <div className="toggle-container">
            <div className="toggle">
                <div className="toggle-panel toggle-left">
                    <h1>Welcome Back!</h1>
                    <p>Enter your personal details to use all of the site's features</p>
                    <button className="hidden" id="login" onClick={handleLoginClick}>Sign In</button>
                </div>
                <div className="toggle-panel toggle-right">
                    <h1>Hello, Friend!</h1>
                    <p>Register with your personal details to use all of the site's features</p>
                    <button className="hidden" id="register" onClick={handleRegisterClick}>Sign Up</button>
                </div>
            </div>
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
