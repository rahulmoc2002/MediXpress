import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './components/home';
import Login from './components/Login/Login';
import Register from './components/register/register';
import Dashboard from './components/dashboard';
import Cards from './components/cards';
import About from './components/about';
import BuyerDashboard from './components/buyer-dashboard';
import AboutUs from './components/aboutus/aboutus';
import Banner from './components/banner/banner';
import SellerRegister from './components/register/seller-register';
import Cart from './components/cart/cart';
import Checkout from './components/checkout/checkout';
import Confirmation from './components/Confirmation/confirmation';
import ContactUs from './components/contactus/contactus';
import SellerDashboard from './components/seller-dashboard';
import AddPharmacy from './components/add-pharmacy';
import MedicineManagement from './components/medicinemanager';
import Profile from './components/myprofile';
import DummyPaymentGateway from './components/payment';
const routes = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'cards',
        element: <Cards />,
      },
      {
        path: '/medicine/:id',
        element: <About />,
      },
      {
        path: 'buyer-dashboard',
        element: <BuyerDashboard />,
      },
      {
        path: 'aboutus',
        element: <AboutUs />,
      },
      {
        path: 'banner',
        element: <Banner />,
      },
      {
        path: 'seller-register',
        element: <SellerRegister />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        path: 'order-confirmation',
        element: <Confirmation />,
      },
      {
        path: 'contact-us',
        element: <ContactUs />,
      },
      {
        path: 'Seller-Dashboard',
        element: <SellerDashboard />,
      },
      {
        path: 'add-pharmacy',
        element: <AddPharmacy />,
      },
      {
        path: 'medicine-portal',
        element: <MedicineManagement />,
      },
      {
        path: 'myprofile',
        element: <Profile></Profile>
      },
      {
        path: 'payment',
        element: <DummyPaymentGateway></DummyPaymentGateway>
      }
    ],
  },
]);

export default routes;
