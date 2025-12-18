import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AdminLayout from '../layout/AdminLayout';
import DashboardHome from '../pages/admin/DashboardHome';
import MenuPage from '../pages/admin/AdminMenuPage';
import ProfilePage from '../pages/admin/ProfilePage';
import QRPage from '../pages/admin/QRPage';

const AdminRoutes = (
  <Route element={<PrivateRoute requireAdmin={true} />}>
    <Route path="/dashboard" element={<AdminLayout />}>
      <Route index element={<DashboardHome />} />
      <Route path="menu" element={<MenuPage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="qr" element={<QRPage />} />
    </Route>
  </Route>
);

export default AdminRoutes;
