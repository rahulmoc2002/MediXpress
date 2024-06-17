import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { FaSearch, FaTags, FaBell, FaShoppingCart, FaEye , FaUser , FaHome} from 'react-icons/fa'; // Import FaEye icon
import axios from 'axios';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import Header from './header/header';
import './buyer-dashboard.css';
import Footer from './footer/footer';

const BuyerDashboard = ({ username }) => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null); 
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8080/gateway/Medicine/GetAllMedicines');
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

  const togglePopup = (item) => {
    setSelectedItem(item === selectedItem ? null : item);
  };

  const filteredData = data.filter(item =>
    item.medName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollRight = () => {
    document.querySelector('.bd-card-container').scrollBy({ left: 200, behavior: 'smooth' });
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleProfileClick = () => {
    navigate('/myprofile'); 
  };

  const handleDashClick=()=>{
    navigate('/buyer-dashboard');
  }

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
                    className="me-2 search-input"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                  <Button variant="outline-Danger"><FaSearch /></Button>
                </Form>
              </div>
              <div className="me-3">
              <button onClick={handleProfileClick} className="icon-button">
                <FaUser /> Profile
              </button></div>
              <div>
                <button
                  variant="outline-secondary"
                  className="dash-text"
                  onClick={handleDashClick}
                >
                  <FaHome /> My Dashboard
                </button>
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
        <Container fluid className="my-container">
          <div className="bd-card-container">
            {filteredData.map(item => (
              
<Card key={item.id} className="bd-card-item bd-card-custom">
  <div className="bd-med-image-container">
    {/* Move the button inside the image container */}
    <button className="bd-view-details-button" onClick={() => togglePopup(item)}>
      <FaEye />
    </button>
    <Card.Img variant="top" src={item.medImage} className="bd-med-image" />
    <span className="bd-discount-tag">10% OFF</span>
    <span className="bd-med-cost-on-image">₹{item.medCost} / Tablet</span>
  </div>
  <Card.Body>
    <Card.Title className="bd-med-name">{item.medName}</Card.Title>
    <Card.Text className="bd-med-power">Power: {item.medPower}mg</Card.Text>
    <h6>Delivering you From:</h6>
    <Card.Text className="bd-med-pharmacy-name">{item.pharmacyName}</Card.Text>
    <button
      className="bd-add-to-cart-button"
      onClick={() => handleAddToCart(item)}
    >
      Add to Cart
    </button>
  </Card.Body>
  {/* Popup */}
  {selectedItem === item && (
    <div className="bd-popup">
      <div className="bd-popup-content">
        <h4>Description</h4>
        <p>{item.medDescription}</p>
        <button className="bd-close-popup" onClick={() => togglePopup(item)}>
          Close
        </button>
      </div>
    </div>
  )}
</Card>




            ))}
          </div>
        </Container>
        {message && <div className="bd-message">{message}</div>}
      </div>
      
  );
}

export default BuyerDashboard;


