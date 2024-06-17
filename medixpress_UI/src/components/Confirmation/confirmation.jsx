import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import 'bootstrap/dist/css/bootstrap.min.css';

const Confirmation = () => {
  // Animation for the checkmark
  const checkmarkStyle = useSpring({
    to: { opacity: 1, transform: 'scale(1)' },
    from: { opacity: 0, transform: 'scale(0.3)' },
    delay: 200, // Delay in ms
  });

  // Animation for the text
  const textStyle = useSpring({
    to: { opacity: 1, transform: 'translateY(0)' },
    from: { opacity: 0, transform: 'translateY(20px)' },
    delay: 500, // Starts after the checkmark appears
  });

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-auto">
          <animated.div style={checkmarkStyle}>
            <div className="text-success display-1">
              <i className="bi bi-check-circle-fill"></i>
            </div>
          </animated.div>
          <animated.div style={textStyle}>
            <h1 className="text-success">Order Placed Successfully!</h1>
            <p className="lead">Thank you for your purchase. Your order is being processed.</p>
          </animated.div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
