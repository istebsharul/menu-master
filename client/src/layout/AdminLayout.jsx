import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { FaHome, FaUtensils, FaUser, FaQrcode, FaBars } from "react-icons/fa";
import { TbLayoutSidebarRightCollapse, TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import Header from "../components/Admin/Header";

const HEADER_HEIGHT = 56; // Tailwind h-16 = 64px

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(true); // Sidebar collapsed by default

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="">
        <Header />
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col sm:flex-row overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`hidden sm:flex flex-col justify-between items-center transition-all duration-300`}
          style={{
            width: collapsed ? "3rem" : "9rem",
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          }}
        >
          {/* Nav Items */}
          <nav className="flex flex-col gap-2 py-4">
            <IconButton to="/dashboard" icon={FaHome} text="Dashboard" collapsed={collapsed} />
            <IconButton to="/dashboard/menu" icon={FaUtensils} text="Menu" collapsed={collapsed} />
            <IconButton to="/dashboard/qr" icon={FaQrcode} text="QR Codes" collapsed={collapsed} />
            <IconButton to="/dashboard/profile" icon={FaUser} text="Profile" collapsed={collapsed} />
          </nav>

          {/* Toggle Button at Bottom */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full p-3 text-gray-700 hover:text-[#0c7054] transition-colors flex justify-end "
          >
            {collapsed ? (
              <TbLayoutSidebarRightCollapse size={24} />
            ) : (
              <TbLayoutSidebarLeftCollapse size={24} />
            )}
          </button>
        </aside>
        {/* Main Content */}
        <main
          className="w-full h-full flex-1 overflow-auto bg-gray-50 text-gray-900 m-0"
          style={{
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          }}
        >
          <Outlet />
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-[#0c7054] text-white shadow-lg flex justify-around py-2 z-50">
          <IconButton to="/dashboard" icon={FaHome} collapsed={true} />
          <IconButton to="/dashboard/menu" icon={FaUtensils} collapsed={true} />
          <IconButton to="/dashboard/qr" icon={FaQrcode} collapsed={true} />
          <IconButton to="/dashboard/profile" icon={FaUser} collapsed={true} />
        </nav>
      </div>
    </div>
  );
};

// Sidebar & Mobile Nav icon button
const IconButton = ({ to, icon: Icon, text, collapsed }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-lg transition-colors text-lg group 
         ${isActive ? "text-[#0c7054] font-semibold" : "text-gray-700"} hover:text-[#0c7054]`
      }
    >
      <Icon className="text-inherit" /> {/* Inherit parent's color */}
      {!collapsed && <span className="text-inherit text-sm">{text}</span>}
    </NavLink>
  );
};


export default AdminLayout;


// import React from "react";
// import { Outlet, NavLink } from "react-router-dom";
// import { FaHome, FaUtensils, FaUser, FaQrcode } from "react-icons/fa";
// import Header from "../components/admin/Header";

// const HEADER_HEIGHT = 64; // Tailwind h-16 = 64px

// const AdminLayout = () => {
//   return (
//     <div className="min-h-screen flex flex-col bg-gray-900">
//       {/* Header */}
//       <div className="h-16">
//         <Header />
//       </div>

//       {/* Main Layout */}
//       <div className="flex-1 flex flex-col sm:flex-row overflow-hidden">
//         {/* Sidebar for Desktop & Tablet */}
//         <aside
//           className="hidden sm:flex sm:w-16 sm:m-2 bg-gray-800 text-white rounded-2xl shadow-md 
//                      flex-col items-center justify-center"
//           style={{
//             height: `calc(100vh - ${HEADER_HEIGHT}px - 16px)`, // minus top+bottom margin (m-2 = 16px)
//           }}
//         >
//           <nav className="flex flex-col gap-6 items-center py-4">
//             <IconButton to="/dashboard" icon={<FaHome />} />
//             <IconButton to="/dashboard/menu" icon={<FaUtensils />} />
//             <IconButton to="/dashboard/qr" icon={<FaQrcode />} />
//             <IconButton to="/dashboard/profile" icon={<FaUser />} />
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main
//           className="flex-1 overflow-auto sm:rounded-l-2xl bg-gray-800"
//           style={{
//             height: `calc(100vh - ${HEADER_HEIGHT}px - 56px)`, // 56px for mobile nav
//           }}
//         >
//           <Outlet />
//         </main>

//         {/* Mobile Bottom Navigation */}
//         <nav
//           className="sm:hidden fixed bottom-0 left-0 right-0 bg-gray-800 text-white shadow-lg flex justify-around py-2 z-50"
//         >
//           <IconButton to="/dashboard" icon={<FaHome />} />
//           <IconButton to="/dashboard/menu" icon={<FaUtensils />} />
//           <IconButton to="/dashboard/qr" icon={<FaQrcode />} />
//           <IconButton to="/dashboard/profile" icon={<FaUser />} />
//         </nav>
//       </div>
//     </div>
//   );
// };

// // Sidebar & Mobile Nav icon button
// const IconButton = ({ to, icon }) => {
//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         `p-3 rounded-lg hover:bg-gray-700 transition-colors text-xl flex justify-center items-center ${isActive ? "bg-gray-700" : ""
//         }`
//       }
//     >
//       {icon}
//     </NavLink>
//   );
// };

// export default AdminLayout;