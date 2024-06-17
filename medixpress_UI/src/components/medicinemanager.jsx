// MedicineManagement.js
import React, { useState, useEffect } from 'react';
import './seller-dashboard.css';
import './medicine-magager.css';
import { addMedicine, fetchMedicinesByPharmacyId, updateMedicineStatus } from '../services/medicineservice';
import axios from 'axios';
const MedicineManagement = () => {
    const [medicines, setMedicines] = useState([]);
    const [medicineForm, setMedicineForm] = useState({
        MedName: '',
        MedDescription: '',
        MedPower: '',
        MedStatus: 'available',
        MedCost: '',
        MedImage: '',
        CategoryId: ''
    });

    const handleMedicineChange = (e) => {
        setMedicineForm({
            ...medicineForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddMedicine = async (e) => {
        e.preventDefault();
        try {
            await addMedicine(medicineForm);
            fetchMedicines();
            setMedicineForm({
                MedName: '',
                MedDescription: '',
                MedPower: '',
                MedStatus: 'available',
                MedCost: '',
                MedImage: '',
                PharmacyId:'',
                CategoryId: ''
            });
        } catch (error) {
            console.error('Error adding medicine:', error);
        }
    };

    const handleUpdateMedicine = async (e) => {
        const id = e.target.value;
        const updatedMedicine = medicines.find(m => m.id === parseInt(id));
        updatedMedicine.MedStatus = e.target.name === 'Available' ? 'available' : 'sold out';
        try {
            await axios.put(`http://localhost:8080/gateway/Medicine/Edit/${id}`, updatedMedicine);
            fetchMedicines();
        } catch (error) {
            console.error('Error updating medicine status:', error);
        }
    };

    const fetchMedicines = async () => {
        try {
            const data = await fetchMedicinesByPharmacyId();
            setMedicines(data);
        } catch (error) {
            console.error('Error fetching medicines:', error);
        }
    };

    useEffect(() => {
        fetchMedicines();
    }, []);

    return (
        <div className="medicine-management">
            <h2>Medicine Management</h2>
            <form onSubmit={handleAddMedicine} className="medicine-form">
                <input
                    type="text"
                    name="MedName"
                    value={medicineForm.MedName}
                    onChange={handleMedicineChange}
                    placeholder="Medicine Name *"
                    required
                />
                <input
                    type="text"
                    name="MedDescription"
                    value={medicineForm.MedDescription}
                    onChange={handleMedicineChange}
                    placeholder="Medicine Description *"
                    required
                />
                <input
                    type="number"
                    name="MedPower"
                    value={medicineForm.MedPower}
                    onChange={handleMedicineChange}
                    placeholder="Medicine Power *"
                    required
                />
                <input
                    type="text"
                    name="CategoryId"
                    value={medicineForm.CategoryId}
                    onChange={handleMedicineChange}
                    placeholder="Category ID *"
                    required
                />
                <select
                    name="MedStatus"
                    value={medicineForm.MedStatus}
                    onChange={handleMedicineChange}
                >
                    <option value="available">Available</option>
                    <option value="sold out">Sold Out</option>
                </select>

                <input
                    type="text"
                    name="MedCost"
                    value={medicineForm.MedCost}
                    onChange={handleMedicineChange}
                    placeholder="Med Cost *"
                    required
                />
                <input
                    type="text"
                    name="MedImage"
                    value={medicineForm.MedImage}
                    onChange={handleMedicineChange}
                    placeholder="Med Image *"
                    required
                />

                <button type="submit">Add Medicine</button>
            </form>

            <h2>Medicine List</h2>
            <table className="medicine-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Power (mg)</th>
                        <th>Status</th>
                        <th>Pharmacy Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {medicines.map((medicine) => (
                        <tr key={medicine.id}>
                            <td>{medicine.medName}</td>
                            <td>{medicine.medDescription}</td>
                            <td>{medicine.medPower}mg</td>
                            <td>{medicine.medStatus}</td>
                            <td>{localStorage.getItem("pharmacyName")}</td>
                            <td>
                                <button name="Available" value={medicine.id} onClick={handleUpdateMedicine}>Available</button>
                                <button name="Sold Out" value={medicine.id} onClick={handleUpdateMedicine}>Sold Out</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MedicineManagement;
