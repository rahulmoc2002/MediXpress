

import React, { useState } from 'react';
import './add-pharmacy.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { addPharmacy } from '../services/pharmacyservices'; // Import the service function
import LoadingModal from './loading-modal';
const AddPharmacy = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [loading, setLoading] = useState(false); // State for loading
    const [errorMessage, setErrorMessage] = useState(""); // State for error message

    const [pharmacyData, setPharmacyData] = useState({
        PharmacyName: '',
        LicenseNumber: '',
        Address: '',
        City: '',
        State: '',
        PostalCode: '',
        Phonenumber: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPharmacyData({
            ...pharmacyData,
            [name]: value
        });
    };

    const handleAddPharmacy = async () => {
        setLoading(true);
        setErrorMessage("");
        try {
            await addPharmacy(pharmacyData);
            
            // Reset form fields after successful addition
            setPharmacyData({
                PharmacyName: '',
                LicenseNumber: '',
                Address: '',
                City: '',
                State: '',
                PostalCode: '',
                Phonenumber: ''
            });

            navigate('/medicine-portal');
        } catch (error) {
            console.error('Error adding pharmacy:', error);
            setErrorMessage('Failed to add pharmacy. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCloseModal = () => {
        setLoading(false);
        setErrorMessage("");
    };

    return (
        <div className="overlay-container">
            <LoadingModal show={loading || !!errorMessage} error={errorMessage} onClose={handleCloseModal} />
            <div className="form-fields">
                <h2 className="form-heading">Add Your Pharmacy Details</h2>
                <div className="row">
                    <label>Pharmacy Name<span className="required">*</span></label>
                    <input type="text" name="PharmacyName" placeholder="Pharmacy Name" value={pharmacyData.PharmacyName} onChange={handleInputChange} />
                </div>
                <div className="row">
                    <label>License Number<span className="required">*</span></label>
                    <input type="text" name="LicenseNumber" placeholder="License Number" value={pharmacyData.LicenseNumber} onChange={handleInputChange} />
                </div>
                <div className="row">
                    <label>Address<span className="required">*</span></label>
                    <input type="text" name="Address" placeholder="Address" value={pharmacyData.Address} onChange={handleInputChange} />
                </div>
                <div className="row">
                    <label>City<span className="required">*</span></label>
                    <input type="text" name="City" placeholder="City" value={pharmacyData.City} onChange={handleInputChange} />
                </div>
                <div className='row'>
                    <input type="text" name="State" placeholder="State" value={pharmacyData.State} onChange={handleInputChange} />
                </div>
                <div className="row">
                    <label>Postal Code<span className="required">*</span></label>
                    <input type="text" name="PostalCode" placeholder="Postal Code" value={pharmacyData.PostalCode} onChange={handleInputChange} />
                </div>
                <div className="row">
                    <label>Phone Number<span className="required">*</span></label>
                    <input type="text" name="Phonenumber" placeholder="Phone Number" value={pharmacyData.Phonenumber} onChange={handleInputChange} />
                </div>
                <button className="large-button-green-button" type="button" onClick={handleAddPharmacy}>Submit</button>
            </div>
        </div>
    );
};

export default AddPharmacy;
