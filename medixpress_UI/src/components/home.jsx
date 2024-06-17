import Header from "./header/header";
import { Outlet } from "react-router-dom";
import Cards from "./cards";
import Footer from "./footer/footer";
import Banner from "./banner/banner";
const Home = () => {

    
    return (
        <div> 
            
            
           
            <Cards></Cards>
            <Banner></Banner>
            
            <Outlet>
            </Outlet>
            
            </div>
    )
}

export default Home