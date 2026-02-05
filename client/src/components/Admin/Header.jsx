import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { FiBell, FiUser, FiLogOut, FiChevronDown } from 'react-icons/fi';
import logo from '../../assets/logo.png';

const DashboardHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Get initials if name exists
  const getInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    console.log(user);
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <header className="w-full bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-gray-100 w-full top-0 z-50">
      <div className="w-full md:h-auto h-18 mx-auto md:px-2 md:py-2 2xl:py-1 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => navigate('/dashboard')}
          className="md:w-1/9 2xl:w-1/12 w-1/2 flex items-center space-x-2 cursor-pointer pl-4"
        >
          <img src={logo} />
        </div>

        {/* Right Actions */}
        {user && (
          <div className="flex items-center gap-5 mr-5">

            {/* Notifications */}
            <button className="relative text-gray-600 hover:text-[#0c7054] transition ">
              <FiBell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative border-l border-gray-300 pl-4" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-gray-700 hover:text-[#0c7054] transition"
              >
                {user?.logo ? ( 
                  <img
                    src={user.logo}
                    alt="Logo"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full grid place-items-center bg-[#0c7054] text-white">
                    {getInitials(user?.businessName || user?.email)}
                  </div>
                )}
                <span className="hidden sm:inline">{user.name || user.email}</span>
                <FiChevronDown
                  className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  size={16}
                />
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-lg py-1 z-50">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50 w-full text-left"
                  >
                    <FiLogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;