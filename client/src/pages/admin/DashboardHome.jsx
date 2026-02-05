import React from 'react';
import { FaUtensils, FaUser, FaQrcode, FaClipboardList } from 'react-icons/fa';

const DashboardHome = () => {
  return (
    <div className="w-full h-full p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Menu Items */}
        <div className="bg-white p-4 rounded-xl shadow flex items-center space-x-4">
          <FaUtensils className="text-3xl text-blue-500" />
          <div>
            <h2 className="text-lg font-semibold">Menu Items</h2>
            <p className="text-gray-500">Manage your menu items</p>
          </div>
        </div>

        {/* Categories */}  
        <div className="bg-white p-4 rounded-xl shadow flex items-center space-x-4">
          <FaClipboardList className="text-3xl text-green-500" />
          <div>
            <h2 className="text-lg font-semibold">Categories</h2>
            <p className="text-gray-500">Organize your categories</p>
          </div>
        </div>

        {/* Profile */}
        <div className="bg-white p-4 rounded-xl shadow flex items-center space-x-4">
          <FaUser className="text-3xl text-purple-500" />
          <div>
            <h2 className="text-lg font-semibold">Profile</h2>
            <p className="text-gray-500">Edit your store info</p>
          </div>
        </div>

        {/* QR Code */}
        <div className="bg-white p-4 rounded-xl shadow flex items-center space-x-4">
          <FaQrcode className="text-3xl text-pink-500" />
          <div>
            <h2 className="text-lg font-semibold">QR Code</h2>
            <p className="text-gray-500">View store QR code</p>
          </div>
        </div>
      </div>

      {/* Optional: Add analytics widgets or recent activity */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Analytics Overview</h2>
        <div className="bg-white p-6 rounded-xl shadow text-center text-gray-400">
          📊 Analytics widgets will be added here.
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;