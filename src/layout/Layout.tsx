import React from 'react';
import { Outlet } from 'react-router-dom';  
import Header from './header/Header';
import Footer from './footer/Footer';

const Layout: React.FC = () => {  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1, padding: '1.5rem' }}>
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
