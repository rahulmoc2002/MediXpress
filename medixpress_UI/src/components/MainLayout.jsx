// MainLayout.js
import React from 'react';
import Header from './header/header';
import Footer from './footer/footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

export default MainLayout;
