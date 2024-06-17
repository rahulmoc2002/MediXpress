import axios from "axios";
//function to get all medicines.
export const getAllMedicines = async (medicine) => {
    try {
      const response = await axios.get('http://localhost:8080/gateway/Medicine/GetAllMedicines');
      return response.data;
    } catch (error) {
      console.error('Error fetching medicines:', error);
      throw error;
    }
  };
  
  //function to add medicines
  export const addMedicine = async (medicineData) => {
    try {
      const pharmacyId = localStorage.getItem("pharmacyId");
      const pharmacyName = localStorage.getItem("pharmacyname");
      const newMedicineData = {
        ...medicineData,
        PharmacyId: pharmacyId,
        PharmacyName: pharmacyName
      };
      await axios.post('http://localhost:8080/gateway/Medicine/Create', newMedicineData);
    } catch (error) {
      console.error('Error adding medicine:', error);
      throw error;
    }
  };
  //function to fetchbymedicines
  export const fetchMedicinesByPharmacyId = async () => {
    try {
      const pharmacyid = localStorage.getItem("pharmacyId");
      const response = await axios.get(`http://localhost:8080/gateway/Medicine/GetMedicineByPharmacyId/${pharmacyid}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching medicines:', error);
      throw error;
    }
  };
  
  export const updateMedicineStatus = async (id) => {
    
        
    try {
      await axios.put(`http://localhost:8080/api/Medicine/Edit/${id}`);
    } catch (error) {
      console.error('Error updating medicine status:', error);
      throw error;
    }
  };