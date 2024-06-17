import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FaHeartbeat, FaMobileAlt, FaUsers, FaThumbsUp } from 'react-icons/fa';
import './aboutus.css';
import Header from '../header/header';

function AboutUs() {
  return (
    <div className="about-us" >
      
      <Container fluid className="about-us-container">
        <Row className="justify-content-center">
          <Col md={10}>
            <h1 className="about-us-title">About MediXpress</h1>
            <p className="about-us-description">
              MediXpress is a cutting-edge medical app dedicated to providing quick and reliable access to pharmaceutical services at your doorstep. Our mission is to simplify the way you manage your health by offering a seamless experience for ordering medicines and accessing health information.
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
          <Col md={5} className="mb-4">
            <Card className="about-us-card">
              <Card.Body>
                <FaHeartbeat className="about-us-icon" />
                <Card.Title>Our Mission</Card.Title>
                <Card.Text>
                  To ensure everyone has access to the medicines they need, with a focus on convenience, affordability, and reliability.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={5} className="mb-4">
            <Card className="about-us-card">
              <Card.Body>
                <FaMobileAlt className="about-us-icon" />
                <Card.Title>Innovative Technology</Card.Title>
                <Card.Text>
                  Leveraging the latest in website technology to bring you a user-friendly platform for all your medical needs.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col md={5} className="mb-4">
            <Card className="about-us-card">
              <Card.Body>
                <FaUsers className="about-us-icon" />
                <Card.Title>Community Focused</Card.Title>
                <Card.Text>
                  Building a community of health-conscious individuals and providing resources to help you live a healthier life.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={5} className="mb-4">
            <Card className="about-us-card">
              <Card.Body>
                <FaThumbsUp className="about-us-icon" />
                <Card.Title>Customer Satisfaction</Card.Title>
                <Card.Text>
                  Our top priority is your satisfaction. We strive to deliver exceptional service and support.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
      </Container>
    </div>
  );
}

export default AboutUs;
