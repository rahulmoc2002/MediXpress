// service/order.service.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/gateway/Orders';

const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Create`, orderData);
    localStorage.setItem("address",response.data.Address);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

const getOrdersByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/GetOrdersByUserId/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders by user ID:', error);
    throw error;
  }
};

export default {
  createOrder,
  getOrdersByUserId,
};
