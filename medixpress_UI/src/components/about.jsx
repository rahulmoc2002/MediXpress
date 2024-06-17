import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Header from './header/header';

const About = () => {
  const { id } = useParams();
  const [medicineDetails, setMedicineDetails] = useState(null);

  useEffect(() => {
    const fetchMedicineDetails = async () => {
      try {
        const response = await fetch(`/medicines.json`); // Adjust the path to your JSON file
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const selectedMedicine = data.find(medicine => medicine.id === parseInt(id)); // Find the medicine with the matching id
        setMedicineDetails(selectedMedicine);
      } catch (error) {
        console.error('Error fetching medicine details:', error);
      }
    };

    fetchMedicineDetails();
  }, [id]);

  return (
    <div className="container" >
      <Header />
      {medicineDetails && (
        <div className="medicine-details">
          <div className="medicine-header">
            <h2>{medicineDetails.name}</h2>
            <h2>{medicineDetails.name}</h2>
            {/* You can adjust the display of other details here */}
            <p className="description">Description: {medicineDetails.description}</p>
            <img src={medicineDetails.image_url} alt={medicineDetails.name} />
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
