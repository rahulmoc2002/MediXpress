


import React, { useState } from 'react';
import { Col, Form, Row, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { addUser } from '../../services/user.service';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import LoadingModal from '../loading-modal';

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const validationSchema = Yup.object().shape({
        UserName: Yup.string().required('First name is required'),
        Email: Yup.string().email('Invalid email format').required('Email is required'),
        Password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        Roles: Yup.string().oneOf(['Customer', 'Seller'], 'Invalid role').required('Role is required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        setLoading(true);
        setErrorMessage("");
        try {
            const res = await addUser(values);
            if (res.status) {
                navigate("/Login");
            } else {
                setErrorMessage("Username or email already exists");
            }
        } catch (err) {
            console.error(err);
            setErrorMessage("An error occurred during registration. Please try again later.");
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    const handleCloseModal = () => {
        setLoading(false);
        setErrorMessage("");
    };

    return (
        <Container className="mt-5" style={{ backgroundColor: "#f0f0f0", borderRadius: "10px", padding: "20px", width: "400px", marginBottom: "50px" }}>
            <LoadingModal show={loading || !!errorMessage} error={errorMessage} onClose={handleCloseModal} />
            <h1 className="logo-text">
                <span style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '1.8rem',
                    fontWeight: 'bold',
                    color: '#613385'
                }}>
                    MediXpress Register
                </span>
            </h1>
            <Formik
                initialValues={{ UserName: "", Email: "", Password: "", Roles: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, handleSubmit }) => (
                    <Form className='mt-4' onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Col>
                                <label htmlFor="UserName">First Name<span className="required">*</span></label>
                                <Field name='UserName' type="text" placeholder="First Name" className="form-control" />
                                <ErrorMessage name="UserName" component="div" className="text-danger" />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <label htmlFor="Email">Email<span className="required">*</span></label>
                                <Field name='Email' type='email' placeholder='Email' className="form-control" />
                                <ErrorMessage name="Email" component="div" className="text-danger" />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <label htmlFor="Password">Password<span className="required">*</span></label>
                                <Field name='Password' type="password" placeholder="Password" className="form-control" />
                                <ErrorMessage name="Password" component="div" className="text-danger" />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <label htmlFor="Roles">Role<span className="required">*</span></label>
                                <Field as="select" name='Roles' className="form-control">
                                    <option value="">Select Role</option>
                                    <option value="Customer">Customer</option>
                                    <option value="Seller">Seller</option>
                                </Field>
                                <ErrorMessage name="Roles" component="div" className="text-danger" />
                            </Col>
                        </Row>
                        <div className="d-grid gap-2">
                            <Button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ backgroundColor: "#613385", borderRadius: "20px" }}>Register</Button>
                        </div>
                        <div className="register-link">
                            <p>Already have an account? <Link to="/login">Login Here</Link></p>
                        </div>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}

export default Register;
