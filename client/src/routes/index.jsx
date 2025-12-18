import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicRoutes from './Authentication';
import AdminRoutes from './Admin';
import CustomerRoutes from './Customer';
import LandingPage from '../pages/LandingPage';

const Router = () => (
  <Routes>
    {/* Public routes */}
    {PublicRoutes}

    {/* Admin routes: require admin auth */}
    {AdminRoutes}

    {/* Customer routes */}
    {CustomerRoutes}

    {/* {Homepage} */}
    <Route path='/' element={<LandingPage/>}/>

    {/* Optional: catch-all 404 page */}
    <Route path="*" element={<div>Page Not Found</div>} />
  </Routes>
);

export default Router;
