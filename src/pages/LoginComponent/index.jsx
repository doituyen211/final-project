import {useState} from 'react';
import {Breadcrumb, Button, Card, Col, Container, Form, Row} from 'react-bootstrap';
import './Login.scss'; // Keep this for the custom styles you want to retain
import {FaFacebook, FaGithub, FaGoogle, FaLinkedin} from 'react-icons/fa';

const LoginComponent = () => {
    const [active, setActive] = useState(false);

    const toggleForm = () => setActive(!active);

    return (
        <>
            <section className="content-header">
                <Container fluid>
                    <Row className="mb-2">
                        <Col sm={6}>
                            <h1>Đây là Login</h1>
                        </Col>
                        <Col sm={6}>
                            <Breadcrumb className="float-sm-right">
                                <Breadcrumb.Item active>Home</Breadcrumb.Item>
                                <Breadcrumb.Item active>Quản lý môn học</Breadcrumb.Item>
                            </Breadcrumb>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="content">
                <Container fluid id="container">
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <Card className={`auth-container ${active ? 'active' : ''}`}>
                                <div
                                    className="form-container sign-up mt-4">
                                    <Card.Body className="text-center ">
                                        <h1>Create Account</h1>
                                        <div className="social-icons">
                                            <Button href="#" variant="link" className="text-decoration-none text-dark">
                                                <FaGoogle size={24}/>
                                            </Button>
                                            <Button href="#" variant="link" className="text-decoration-none text-dark">
                                                <FaFacebook size={24}/>
                                            </Button>
                                            <Button href="#" variant="link" className="text-decoration-none text-dark">
                                                <FaGithub size={24}/>
                                            </Button>
                                            <Button href="#" variant="link" className="text-decoration-none text-dark">
                                                <FaLinkedin size={24}/>
                                            </Button>
                                        </div>
                                        <span>or use your email for registration</span>
                                        <Form>
                                            <Form.Group controlId="name">
                                                <Form.Control type="text" placeholder="Name"/>
                                            </Form.Group>
                                            <Form.Group controlId="email">
                                                <Form.Control type="email" placeholder="Email"/>
                                            </Form.Group>
                                            <Form.Group controlId="password">
                                                <Form.Control type="password" placeholder="Password"/>
                                            </Form.Group>
                                            <Button variant="primary" type="submit">Sign Up</Button>
                                        </Form>
                                    </Card.Body>
                                </div>
                                <div className="form-container sign-in mt-4">
                                    <Card.Body className="text-center ">
                                        <h1>Sign In</h1>
                                        <div className="social-icons">
                                            <Button href="#" variant="link" className="text-decoration-none text-dark">
                                                <FaGoogle size={24}/>
                                            </Button>
                                            <Button href="#" variant="link" className="text-decoration-none text-dark">
                                                <FaFacebook size={24}/>
                                            </Button>
                                            <Button href="#" variant="link" className="text-decoration-none text-dark">
                                                <FaGithub size={24}/>
                                            </Button>
                                            <Button href="#" variant="link" className="text-decoration-none text-dark">
                                                <FaLinkedin size={24}/>
                                            </Button>
                                        </div>
                                        <span>or use your email password</span>
                                        <Form>
                                            <Form.Group controlId="email">
                                                <Form.Control type="email" placeholder="Email"/>
                                            </Form.Group>
                                            <Form.Group controlId="password">
                                                <Form.Control type="password" placeholder="Password"/>
                                            </Form.Group>
                                            <a href="#">Forget Your Password?</a>
                                            <Button variant="primary" type="submit">Sign In</Button>
                                        </Form>
                                    </Card.Body>
                                </div>
                                <div className="toggle-container">
                                    <div className="toggle">
                                        <div className="toggle-panel toggle-left">
                                            <h1>Welcome Back!</h1>
                                            <p>Enter your personal details to use all of site features</p>
                                            <Button variant="outline-light" onClick={toggleForm}>Sign In</Button>
                                        </div>
                                        <div className="toggle-panel toggle-right">
                                            <h1>Hello, Friend!</h1>
                                            <p>Register with your personal details to use all of site features</p>
                                            <Button variant="outline-light" onClick={toggleForm}>Sign Up</Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default LoginComponent;
