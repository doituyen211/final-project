import {useEffect, useState} from 'react';
import {Card, Col, Container, Form, Row} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './Login.scss';
import {FaFacebook, FaGithub, FaGoogle, FaLinkedin} from "react-icons/fa";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import API from "../../store/Api";
import Spinner from 'react-bootstrap/Spinner';


const LoginComponent = () => {
    const [action, setAction] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const navigate = useNavigate();
    const [errorLogin, setErrorLogin] = useState(false);
    const [successSignUp, setSuccessSignUp] = useState(false);

    const handleSignIn = (event) => {
        event.preventDefault();
        console.log("email: " + email + " password: " + password);

        axios.post(API.LOGIN, {
            username: email,
            email,
            password
        }).then(
            (res) => {

                localStorage.setItem('authToken', res.headers['authorization'] || '');
                console.log("Headers saved to local storage : " + localStorage.getItem('authToken'));
                navigate("/");
            }
        ).catch(
            (error) => {
                console.error("Error during login:", error);
                setErrorLogin(true);
            }
        );
    };
    const handleSignUp = (event) => {
        event.preventDefault();
        console.log("email: " + email + " password: " + password);

        axios.post(API.REGISTER, {
            email,
            password,
            fullName,
            "role": "USER"
        }).then(
            (res) => {
                setSuccessSignUp(true);
                setAction('');
            }
        ).catch(
            (error) => {
                console.error("Error during Sign Up:", error);
                setErrorLogin(true);
            }
        );
    }
    const handleCloseAlert = () => {
        setErrorLogin(false); // Close alert
    };

    useEffect(() => {
        if (successSignUp) {
            const timer = setTimeout(() => {
                setSuccessSignUp(false);
            }, 5000); // 5000ms = 5 seconds

            return () => clearTimeout(timer);
        }
        if (errorLogin) {
            const timer = setTimeout(() => {
                handleCloseAlert();
            }, 5000); // 5000ms = 5 seconds

            return () => clearTimeout(timer);
        }
    }, [errorLogin, successSignUp]);

    const [isSending, setIsSending] = useState(false)
    const handleForgotPassword = (event) => {
        event.preventDefault();
        console.log("email: " + email);
        setIsSending(true)
        // setAction('');
        const url = API.SENDTOEMAIL + '?email=' + email;
        axios.get(url, {
            email,
        }).then(
            (res) => {
                setIsSending(false)
                setAction('');
                //Show notice Send email successfull
            }
        ).catch(
            (error) => {
                console.error("Error during Sign Up:", error);
                setErrorLogin(true);
                setIsSending(false)
            }
        );
    }
    return (
        <>
            <Container
                fluid
                id="container"
                className="d-flex justify-content-center align-items-center"
                style={{height: '100vh'}}
            > <Row className="justify-content-center">
                <Col>
                    <Card className={`auth-container ${action}`}
                          style={{width: '50vn', height: '60vh'}}>
                        {/*Begin- SignUp Form*/}
                        <div
                            className="form-container sign-up mt-5">
                            <Card.Body className="text-center ">
                                <h1>Đăng ký</h1>
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
                                <span>hoặc sử dung email để đăng ký</span>
                                <Form onSubmit={handleSignUp}>
                                    <Row className='justify-content-center align-items-center'>
                                        <Col xs={12} md={10}>
                                            <Form.Group controlId="fullName">
                                                <Form.Control type="text" placeholder="Full Name"
                                                              value={fullName}
                                                              onChange={(e) => setFullName(e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row className='justify-content-center align-items-center'>
                                        <Col xs={12} md={10}>
                                            <Form.Group controlId="email">
                                                <Form.Control type="email" placeholder="Email"
                                                              value={email}
                                                              onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className='justify-content-center align-items-center'>
                                        <Col xs={12} md={10}>
                                            <Form.Group controlId="password">
                                                <Form.Control type="password" placeholder="Password"
                                                              value={password}
                                                              onChange={(e) => setPassword(e.target.value)}
                                                />
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
                                            >Đăng ký
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </div>
                        {/*End- SignUp Form*/}
                        {/*Begin- ForgotPassword Form*/}
                        <div
                            className="form-container forgot-password mt-5">
                            <Card.Body className="text-center ">
                                <h1>Quên mật khẩu</h1>
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
                                <span>Nhập email của bạn để khôi phục mật khẩu</span>
                                <Form onSubmit={handleForgotPassword}>
                                    <Row className='justify-content-center align-items-center'>
                                        <Col xs={12} md={10}>
                                            <Form.Group controlId="email">
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    {/*<Row className='justify-content-center align-items-center'>*/}
                                    {/*    <Col xs={12} md={10}>*/}
                                    {/*        <Form.Group controlId="password">*/}
                                    {/*            <Form.Control type="password" placeholder="Password"/>*/}
                                    {/*        </Form.Group>*/}
                                    {/*    </Col>*/}
                                    {/*</Row>*/}
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
                                            >
                                                {isSending ? (
                                                    <>
                                                        <Spinner
                                                            animation="border"
                                                            size="sm"
                                                            role="status"
                                                            aria-hidden="true"
                                                            style={{marginRight: '5px'}}
                                                        />
                                                        Đang gửi...
                                                    </>
                                                ) : (
                                                    'Quên mật khẩu'
                                                )}
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </div>
                        {/*End - ForgotPassword Form*/}
                        {/*Begin - Sign-In Form*/}
                        <div className="form-container sign-in mt-5">
                            <Card.Body className="text-center ">
                                <h1>Đăng nhập</h1>
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
                                <span>hoặc sử dụng email của bạn</span>
                                <Form onSubmit={handleSignIn}>
                                    <Row className='justify-content-center align-items-center'>
                                        <Col xs={12} md={10}>
                                            <Form.Group controlId="email-signin">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className='justify-content-center align-items-center'>
                                        <Col xs={12} md={10}>
                                            <Form.Group controlId="password-signin">
                                                <Form.Control
                                                    type="password" placeholder="Password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className='justify-content-center align-items-center'>
                                        <Button
                                            variant="link"
                                            onClick={() => setAction('forgot-password-action')}
                                            className='text-black text-decoration-none'
                                            style={{fontSize: '12px'}}
                                            size='sm'
                                        >
                                            Quên mật khẩu?
                                        </Button>
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
                                            >Đăng nhập</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </div>
                        {/*End- Sign-In Form*/}
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
                                        onClick={() => setAction('')}
                                    >Đăng nhập</Button>
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
                                        onClick={() => setAction('sign-up-action')}
                                    >
                                        Đăng ký
                                    </Button>

                                </div>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
            </Container>
            {successSignUp && (
                <Row className="position-fixed mt-5 top-0 end-0 p-3" style={{zIndex: 1050}}>
                    <div className="alert alert-success alert-dismissible fade show"
                         role="alert">
                        Sign up successful! Welcome!
                        <button type="button" className="close" aria-label="Close"
                                onClick={() => setSuccessSignUp(false)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </Row>
            )}
            {errorLogin && (
                <div className="position-fixed mt-5 top-0 end-0 p-3" style={{zIndex: 1050}}>
                    <div className="alert alert-danger alert-dismissible fade show"
                         role="alert">
                        Login failed. Please check your credentials.
                        <button type="button" className="close" aria-label="Close"
                                onClick={handleCloseAlert}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default LoginComponent;
