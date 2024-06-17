import React from 'react';
import './banner.css';
import { Link } from 'react-router-dom';

const Banner = ({ topColor, bottomColor }) => {
  const containerStyle = {
    background: `linear-gradient(to bottom, ${topColor}, ${topColor} 50%, ${bottomColor} 50%, ${bottomColor})`
  };

  return (
    <>
      <div className="banner-container" style={containerStyle}>
        <div className="top-half" style={{ backgroundColor: topColor }}>
          <div className="banner-text">
            <h1>Pharmacy at your<br />DoorStep</h1>
            <Link to="./Login"><button className="explore-button"><b>Shop Now</b></button></Link>
            
          </div>
          <img 
            src="https://cdni.iconscout.com/illustration/premium/thumb/efficient-courier-service-delivers-online-store-pharmacy-orders-promptly-9784962-7992653.png?f=webp" 
            alt="Delivery"
            className="delivery-image"
          />

        </div>
        
        <div className="bottom-half" style={{ backgroundColor: bottomColor }}></div>
        <div className="bottom-half-one" style={{ backgroundColor: bottomColor }}></div>
      </div>
    </>
  );
};

export default Banner;
