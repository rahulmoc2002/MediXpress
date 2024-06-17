import axios from "axios";
export const addPharmacy = async (pharmacyData) => {
    try {
      const userId = localStorage.getItem("userId");
      const pharmacyDataWithUser = { ...pharmacyData, UserId: userId };
      const response = await axios.post('http://localhost:8080/gateway/Pharmacy/AddPharmacy', pharmacyDataWithUser, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
      });
      localStorage.setItem("pharmacyId",response.data.pharmacyId);
      localStorage.setItem("pharmacyname",response.data.pharmacyName)
      return response.data;
    } catch (error) {
      console.error('Error adding pharmacy:', error);
      throw error;
    }
  };