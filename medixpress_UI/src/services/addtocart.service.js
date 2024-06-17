// src/services/addtocart.js

let cart = [];

export const addItemToCart = (item) => {
  return new Promise((resolve, reject) => {
    try {
      cart.push(item);
      resolve(item);
    } catch (error) {
      reject(error);
    }
  });
};

export const getCartItems = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve(cart);
    } catch (error) {
      reject(error);
    }
  });
};

export const removeItemFromCart = (id) => {
    return new Promise((resolve, reject) => {
      try {
        cart = cart.filter(item => item.id !== id);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };