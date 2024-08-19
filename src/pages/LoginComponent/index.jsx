import {useState} from 'react';
import {Card, Col, Container, Form, Row} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import {FaFacebook, FaGithub, FaGoogle, FaLinkedin} from 'react-icons/fa';
import './Login.scss';

const LoginComponent = () => {
    const [active, setActive] = useState(false);

    const toggleForm = () => setActive(!active);

    return (
        <>
            <Container
                fluid
                id="container"
                className="d-flex justify-content-center align-items-center"
                style={{height: '100vh'}}
            > <Row className="justify-content-center">
                <Col>
                    <Card className={`auth-container ${active ? 'active' : ''}`}
                          style={{width: '50vn', height: '60vh'}}>
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
                                    <Row className='justify-content-center align-items-center'>
                                        <Col xs={12} md={10}>
                                            <Form.Group controlId="name">
                                                <Form.Control type="text" placeholder="Name"/>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row className='justify-content-center align-items-center'>
                                        <Col xs={12} md={10}>
                                            <Form.Group controlId="email">
                                                <Form.Control type="email" placeholder="Email"/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className='justify-content-center align-items-center'>
                                        <Col xs={12} md={10}>
                                            <Form.Group controlId="password">
                                                <Form.Control type="password" placeholder="Password"/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className='justify-content-center align-items-center'>
                                        <Col xs={12} md={10}>
                                            <Button
                                                style={{
                                                    backgroundColor: '#512da8',
                                                    color: '#fff',
                                                    fontSize: '12px',
                                                    padding: '10px 45px',
                                                    border: '1px solid transparent',
                                                    borderRadius: '8px',
                                                    fontWeight: 600,
                                                    letterSpacing: '0.5px',
                                                    textTransform: 'uppercase',
                                                    marginTop: '10px',
                                                    cursor: 'pointer',
                                                }}
                                                type="submit"
                                            >Sign Up
                                            </Button>
                                        </Col>
                                    </Row>
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
                                    <Row className='justify-content-center align-items-center'>
                                        <Col xs={12} md={10}>
                                            <Form.Group controlId="email">
                                                <Form.Control type="email" placeholder="Email"/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className='justify-content-center align-items-center'>
                                        <Col xs={12} md={10}>
                                            <Form.Group controlId="password">
                                                <Form.Control type="password" placeholder="Password"/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className='justify-content-center align-items-center'>
                                        <a href="#">Forget Your Password?</a>
                                    </Row>
                                    <Row className='justify-content-center align-items-center'>
                                        <Col xs={12} md={10}>
                                            <Button
                                                style={{
                                                    backgroundColor: '#512da8',
                                                    color: '#fff',
                                                    fontSize: '12px',
                                                    padding: '10px 45px',
                                                    border: '1px solid transparent',
                                                    borderRadius: '8px',
                                                    fontWeight: 600,
                                                    letterSpacing: '0.5px',
                                                    textTransform: 'uppercase',
                                                    marginTop: '10px',
                                                    cursor: 'pointer',
                                                }}
                                                type="submit"
                                            >Sign In</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </div>
                        <div className="toggle-container">
                            <div className="toggle">
                                <div className="toggle-panel toggle-left">
                                    <h1>Welcome Back!</h1>
                                    <p>Enter your personal details to use all of site features</p>
                                    <Button
                                        variant="outline-light"
                                        className="btn btn-outline-light text-uppercase mt-2"
                                        style={{
                                            fontSize: '12px',
                                            padding: '10px 45px',
                                            fontWeight: 600,
                                            letterSpacing: '0.5px',
                                            cursor: 'pointer'
                                        }}
                                        onClick={toggleForm}
                                    >Sign In</Button>
                                </div>
                                <div className="toggle-panel toggle-right">
                                    <h1>Hello, Friend!</h1>
                                    <p>Register with your personal details to use all of site features</p>
                                    <Button
                                        variant="outline-light"
                                        className="btn btn-outline-light text-uppercase mt-2"
                                        style={{
                                            fontSize: '12px',
                                            padding: '10px 45px',
                                            fontWeight: 600,
                                            letterSpacing: '0.5px',
                                            cursor: 'pointer'
                                        }}
                                        onClick={toggleForm}
                                    >
                                        Sign Up
                                    </Button>

                                </div>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
            </Container>
        </>
    );
};

export default LoginComponent;
