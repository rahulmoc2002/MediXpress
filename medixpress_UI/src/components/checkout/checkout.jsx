





import React, { useState } from 'react';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { FaHome, FaUser } from 'react-icons/fa'; 
import ordersService from '../../services/orders.service';
import './checkout.css';

function Checkout() {
  const { cartItems, calculateTotal } = useCart();
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    flatNo: '',
    state: '',
    pincode: '',
  });
  const [loading, setLoading] = useState(false); // State to manage loading

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleConfirmOrder = async () => {
    const orderData = {
      Total: calculateTotal(),
      Fullname: shippingInfo.fullName,
      Address: shippingInfo.address,
      State: shippingInfo.state,
      Flatno: shippingInfo.flatNo,
      Pincode: parseInt(shippingInfo.pincode, 10),
      userId: localStorage.getItem("userId"),
    };

    try {
      setLoading(true); // Show preloader
      await ordersService.createOrder(orderData);
      // Redirect to Razorpay payment gateway
      redirectToRazorpay();
    } catch (error) {
      console.error('Failed to create order:', error);
    } finally {
      setLoading(false); // Hide preloader
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const redirectToRazorpay = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      console.error('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const options = {
      key: 'rzp_test_aZGveIZwIKj5Jp',
      amount: calculateTotal() * 100,
      currency: 'INR',
      name: 'Pharmacy',
      description: 'Order Payment',
      handler: function (response) {
        console.log('Payment successful!', response);
        navigate('/order-confirmation');
      },
      prefill: {
        name: shippingInfo.fullName,
        email: 'test@example.com',
        contact: '9346116602',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="checkout-page">
      {loading && (
        <div className="preloader">
          <div className="spinner"></div>
        </div>
      )}
      <div className={`thin-bar ${loading ? 'loading' : ''}`}>
        <Container fluid>
          <div className="d-flex justify-content-between align-items-center">
            <div className="me-3">
              <span className="tag"><b><i>Pharmacy at your Doorsteps</i></b></span>
            </div>
            <div className="ms-auto d-flex align-items-center">
              <button onClick={() => navigate('/myprofile')} className="icon-button me-3">
                <FaUser /> Profile
              </button>
              <button className="dash-text icon-button" onClick={() => navigate('/buyer-dashboard')}>
                <FaHome /> My Dashboard
              </button>
            </div>
          </div>
        </Container>
      </div>
      <div className={`checkout-content ${loading ? 'loading' : ''}`}>
        <div className="checkout-container">
          <div className="order-summary">
            <h2>Order Summary</h2>
            <ul>
              {cartItems.map((item, index) => (
                <li key={index} className="order-item">
                  <img src={item.medImage} alt={item.medName} className="order-item-image" />
                  <div className="item-details">
                    <span>{item.medName}</span>
                    <span>₹{item.medCost}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="total-box">
              <h3>Total: ₹{calculateTotal()}</h3>
            </div>
          </div>
          <div className="shipping-form">
            <h2>Delivery Address</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="fullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" name="fullName" value={shippingInfo.fullName} onChange={handleChange} required />
              </Form.Group>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" name="address" value={shippingInfo.address} onChange={handleChange} required />
              </Form.Group>
              <Form.Group controlId="flatNo">
                <Form.Label>Flat No.</Form.Label>
                <Form.Control type="text" name="flatNo" value={shippingInfo.flatNo} onChange={handleChange} required />
              </Form.Group>
              <Form.Group controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control type="text" name="state" value={shippingInfo.state} onChange={handleChange} required />
              </Form.Group>
              <Form.Group controlId="pincode">
                <Form.Label>Pincode</Form.Label>
                <Form.Control type="text" name="pincode" value={shippingInfo.pincode} onChange={handleChange} required />
              </Form.Group>
              <Button variant="success" className="checkout-button" onClick={handleConfirmOrder}>
                Confirm Order
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
