import React from 'react';
import { useNavigate } from 'react-router-dom';
import './seller-dashboard.css';

const SellerDashboard = () => {
    const navigate = useNavigate();

    const navigateToAddPharmacy = () => {
        navigate('/add-pharmacy'); 
    };

    return (
        <div className="seller-dashboard">
            <div className="banner">
                <div className="banner-text-seller">
                    Welcome to the Seller Dashboard
                </div>
                <button className="banner-button" onClick={navigateToAddPharmacy}>
                    Register Your Pharmacy Today
                </button>
            </div>
        </div>
    );
};

export default SellerDashboard;