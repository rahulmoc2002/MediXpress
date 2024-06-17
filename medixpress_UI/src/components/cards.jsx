import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { FaSearch, FaTags, FaBell, FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
import './cards.css';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

function Cards() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/medicines.json');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    setMessage('Added to cart!');
    setTimeout(() => setMessage(''), 2000);
  };

  const handleCardClick = () => {
    navigate('/login');
  };

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 9);

  const scrollRight = () => {
    document.querySelector('.card-container').scrollBy({ left: 200, behavior: 'smooth' });
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <div>
      <div className="thin-bar">
        <Container fluid>
          <div className="d-flex justify-content-between align-items-center">
            <div className="me-3">
              <span className="tag"><b><i>Pharmacy at your Doorsteps</i></b></span>
            </div>
            <div className="flex-grow-1 me-3">
              <Form className="d-flex">
                <Form.Control 
                  type="text" 
                  placeholder="Search Medicines" 
                  className="me-2" 
                  value={searchQuery}
                  onChange={handleSearch}
                />
                <Button variant="outline-danger"><FaSearch /></Button>
              </Form>
            </div>
            <div className="me-3 d-flex align-items-center promo-code-text">
              <FaTags className="promo-code-icon" />
            </div>
            <div className="me-3 notification-text">
              <FaBell className="notification-icon" />
            </div>
            <div>
              <button 
                variant="outline-secondary" 
                className="cart-text" 
                onClick={handleCartClick}
              >
                <FaShoppingCart /> Cart
              </button>
            </div>
          </div>
        </Container>
      </div>
      <div className="section-header">
        <h2>Essential Medicines</h2>
      </div>
      <div className="card-container-wrapper">
        <div className="card-container">
          {filteredData.map(item => (
            <div key={item.id} className="card-item" onClick={handleCardClick}>
              <Card className="card-custom">
                <Card.Img variant="top" src={item.image_url} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <div className="price-container">
                    <div className="mrp">MRP ₹{item.mrp}</div>
                    <div className="discounted-price">₹{item.discounted_price}</div>
                    <div className="discount-percentage">Save {item.discount_percentage}</div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
        <button className="scroll-button" onClick={scrollRight}>&gt;</button>
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default Cards;
