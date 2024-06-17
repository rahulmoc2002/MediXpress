// Header.js
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import './header.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { AuthContext } from '../authcontext';


function Header() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [location, setLocation] = useState("Fetching location...");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then(response => response.json())
            .then(data => {
              if (data && data.address) {
                const { city, suburb, town, village, postcode } = data.address;
                const locationName = `${suburb || village || town || ''}, ${city || ''} ${postcode || ''}`.trim();
                setLocation(locationName || "Location not found");
              } else {
                setLocation("Location not found");
              }
            })
            .catch(error => {
              setLocation("Error fetching location");
              console.error("Error fetching location:", error);
            });
        },
        (error) => {
          setLocation("Location access denied");
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container fluid>
        <Navbar.Brand href="/" className="logo-text">
          <span style={{ 
            fontFamily: 'Montserrat, sans-serif', 
            fontSize: '1.8rem', 
            fontWeight: 'bold', 
            color: '#613385' 
          }}>
            MediXpress
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <div className="ms-auto d-flex align-items-center">
            <div className="address" style={{ marginLeft: '-20px', marginRight: '20px' }}>
              <FaMapMarkerAlt className="location-icon" />
              <span>{location}</span>
            </div>
            <Link to="/"><button className="custom-button me-2"><b>Home</b></button></Link>
            <Link to="/aboutus"><button className="custom-button me-2"><b>About Us</b></button></Link>
            <Link to="/contact-us"><button className="custom-button me-2"><b>Contact Us</b></button></Link>
            <Nav>
              {isLoggedIn ? (
                <Link className='custom-button login-signup-button me-2' onClick={logout} to="/">Logout</Link>
              ) : (
                <Link className='custom-button login-signup-button me-2'  to="/login">Login/Sign Up</Link>
              )}
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
