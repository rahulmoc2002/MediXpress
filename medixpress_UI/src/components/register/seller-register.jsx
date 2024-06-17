// SellerRegisterPage.js
import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import axios from 'axios';
import './register.css';
const SellerRegisterPage = () => {
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        PharmacyName: Yup.string().required('Pharmacy Name is required'),
        
        LicenseNumber: Yup.number().required('License Number is required'),
        Address: Yup.string().required('Address is required'),
        City: Yup.string().required('City is required'),
        State: Yup.string().required('State is required'),
        PostalCode: Yup.number().required('Postal Code is required'),
        PhoneNumber: Yup.number().required('Phone Number is required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post('http://localhost:5027/api/Pharmacy', values);
            if (response) {
                alert("Registration Successful");
                navigate("/Login");
            } else {
                alert("User Not registered");
            }
        } catch (error) {
            console.error("Error registering seller:", error);
            alert("Error registering seller");
        }
        setSubmitting(false);
    };

    return (
        <Container className="mt-5">
            <h1>Register as Seller</h1>
            <Formik
                initialValues={{
                    PharmacyName: '',
                    
                    LicenseNumber: '',
                    Address: '',
                    City: '',
                    State: '',
                    PostalCode: '',
                    PhoneNumber: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Pharmacy Name</Form.Label>
                                <Field name="PharmacyName" type="text" className="form-control" />
                                <ErrorMessage name="PharmacyName" component="div" className="text-danger" />
                            </Form.Group>
                            
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>License Number</Form.Label>
                                <Field name="LicenseNumber" type="text" className="form-control" />
                                <ErrorMessage name="LicenseNumber" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Address</Form.Label>
                                <Field name="Address" type="text" className="form-control" />
                                <ErrorMessage name="Address" component="div" className="text-danger" />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>City</Form.Label>
                                <Field name="City" type="text" className="form-control" />
                                <ErrorMessage name="City" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>State</Form.Label>
                                <Field name="State" type="text" className="form-control" />
                                <ErrorMessage name="State" component="div" className="text-danger" />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Postal Code</Form.Label>
                                <Field name="PostalCode" type="text" className="form-control" />
                                <ErrorMessage name="PostalCode" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Phone Number</Form.Label>
                                <Field name="PhoneNumber" type="text" className="form-control" />
                                <ErrorMessage name="PhoneNumber" component="div" className="text-danger" />
                            </Form.Group>
                        </Row>
                        <Button type="submit" className="btn btn-primary" disabled={isSubmitting}>Register</Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}

export default SellerRegisterPage;
