import axios from "axios";
import { accounturl } from "../config/url.config";


// const apiurl="http://localhost:5217/api/Accounts/register";
const apiurl2="http://localhost:5217/api/Accounts/all";

export const addUser = (user) => {
    console.log(user);
   // return axios.post(apiurl+"register", user);
   return axios.post(accounturl+"register",user);
}


export const validateuser = (user) => {
    return axios.get(apiurl2,user);

}
const accountApiUrl = "http://localhost:8080/gateway/Accounts";

// Function to fetch all accounts (users and sellers)
export const fetchAllAccounts = async () => {
    try {
        const response = await axios.get(`${accountApiUrl}/all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return { users: [], sellers: [] };
    }
};

// Function to login user
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${accountApiUrl}/login`, { email, password });
        return response.data;
    } catch (error) {
        console.error('Error during login process:', error);
        throw error;
    }
};
