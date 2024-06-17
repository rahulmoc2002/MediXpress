

import { createContext } from "react";
import axios from "axios";

 export const UserContext= createContext({
    isLoggedIn:false,    
     setisLoggedIn:()=>{}
 })
 export const SellerContext=createContext({
    isLoggedIn:false,
     setisLoggedIn:()=>{}
 })
