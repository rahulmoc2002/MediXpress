import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';

import routes from './myroute';
import { CartProvider } from './components/CartContext';
import { useState } from 'react';
import { AuthProvider } from './components/authcontext';
function App() {
  const [logstatus, setLostatus] = useState(false)
  return (
    <>
     <AuthProvider>
      <CartProvider>
        
        <RouterProvider router={routes} />
        
      </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
