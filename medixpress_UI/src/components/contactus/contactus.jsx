// src/components/ContactUs.js

import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './contactus.css';

function ContactUs() {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      alert(`Thank you! We will contact you at ${email}`);
      setEmail('');
    }

    setValidated(true);
  };

  return (
    <Container fluid className="contact-us-container">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h2 className="text-center mb-4 contact-us-heading">Contact Us</h2>
          <div className="company-info text-center mb-4">
            <p><strong>MediXpress</strong></p>
            <p>Online Pharmacy Portal</p>
            <p>Email: <a href="mailto:info@medixpress.com">info@medixpress.com</a></p>
            <p>Phone: <a href="tel:+919876345678">+91 98763 45678</a></p>
            <p>Location: Bellandur, Bengaluru, Karnataka</p>
          </div>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label><b>Enter Email to get in touch</b></Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" className="custom-submit-button">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ContactUs;
