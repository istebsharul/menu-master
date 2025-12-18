import React from 'react';
import { Route } from 'react-router-dom';
import CustomerMenuPage from '../pages/customer/MenuPage';

const CustomerRoutes = (
  <>
    <Route path="/menu/:storeId" element={<CustomerMenuPage />} />
    <Route path="/s/:slug" element={<CustomerMenuPage />} />
  </>
);

export default CustomerRoutes;
