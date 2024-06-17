



import React from 'react';
import { useCart } from '../CartContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './cart.css';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { FaHome, FaUser } from 'react-icons/fa'; // Import necessary icons

function Cart() {
  const { cartItems, removeFromCart, updateCartItem, calculateTotal } = useCart();
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  const handleRemove = (item) => {
    removeFromCart(item);
  };

  const handleIncreaseQuantity = (item) => {
    const updatedItem = { ...item, quantity: (item.quantity || 1) + 1 };
    updateCartItem(updatedItem);
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      updateCartItem(updatedItem);
    }
  };

  const handleProfileClick = () => {
    navigate('/myprofile'); 
  };

  const handleDashClick = () => {
    navigate('/buyer-dashboard');
  }

  return (
    <div className="cart-page">
      <div className="thin-bar">
        <Container fluid>
          <div className="d-flex justify-content-between align-items-center">
            <div className="me-3">
              <span className="tag"><b><i>Pharmacy at your Doorsteps</i></b></span>
            </div>
            <div className="me- profile-item">
              <button onClick={handleProfileClick} className="icon-button">
                <FaUser /> Profile
              </button>
            </div>
            <div>
              <button
                className="dash-text icon-button"
                onClick={handleDashClick}
              >
                <FaHome /> My Dashboard
              </button>
            </div>
          </div>
        </Container>
      </div>
      <div className="cart-content">
        <div className="cart-container">
          <h2>Your Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div className="cart-items-grid">
              {cartItems.map((item, index) => (
                <Card key={index} className="cart-item-card">
                  <Card.Img variant="top" src={item.medImage} className="cart-item-image" />
                  <Card.Body>
                    <Card.Title>{item.medName}</Card.Title>
                    <Card.Text>
                      From: <b>{item.pharmacyName}</b>
                    </Card.Text>
                    <div className="price-container">
                      <div className="cost-quantity-container">
                        <div className="discounted-price">₹{item.medCost}</div>
                        <div className="quantity-control">
                          <button onClick={() => handleDecreaseQuantity(item)}>-</button>
                          <span>{item.quantity || 1}</span>
                          <button onClick={() => handleIncreaseQuantity(item)}>+</button>
                        </div>
                      </div>
                    </div>
                    <Button variant="danger" onClick={() => handleRemove(item)}>
                      Remove from Cart
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
          <div className="total-amount">Total Amount: ₹{calculateTotal()}</div>
          <Button variant="success" className="checkout-button" onClick={handleProceedToCheckout}>
            Proceed to Checkout
          </Button>
        </div>
      </div>
     
    </div>
  );
}

export default Cart;

