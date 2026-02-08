import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword, clearError } from "../../redux/slices/authSlice";
import { IoReturnUpBackOutline } from "react-icons/io5";


import logo from "../../assets/logo.png";
import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";

export default function ResetPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams(); // Reset token from URL
  const { loading, error, message } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ password: "", confirmPassword: "" });

  useEffect(() => {
    if (error) {  
      alert(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (message) {
      alert(message);
      dispatch(clearMessage());
      navigate("/login");
    }
  }, [message, navigate]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match");
    }
    dispatch(resetPassword({ token, password: form.password }));
  };

  return (
    <div className="min-h-screen flex relative">
      <a href="/"><div className="absolute top-10 left-10 z-10 flex justify-center items-center gap-3 text-md text-[#0c7054]"><IoReturnUpBackOutline className="text-xl" />Go Back</div></a>

      {/* Left visuals */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gray-50 relative overflow-hidden">
        <motion.img
          initial={{ scale: 0.95 }}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
          src={image2}
          alt="Dashboard Preview"
          className="rounded-2xl w-3/4"
        />
        <motion.img
          initial={{ x: 20 }}
          animate={{ x: 0, y: [0, -10, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
          src={image1}
          alt="Mobile QR Menu"
          className="absolute w-40 sm:w-48 bottom-10 right-10 rounded-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
      </div>

      {/* Right: Reset Password Form */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 bg-white">
        <div className="max-w-md w-full mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <img src={logo} alt="MenuMaster" className="w-40" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your new password below.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="mt-1 w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm
                           focus:ring-2 focus:ring-[#0c7054] focus:border-[#0c7054] outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="mt-1 w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm
                           focus:ring-2 focus:ring-[#0c7054] focus:border-[#0c7054] outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#0c7054] text-white font-semibold
                         hover:bg-[#03543d] focus:ring-2 focus:ring-[#0c7054] focus:ring-offset-1
                         transition disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { resetPassword, clearError, clearMessage } from '../../redux/slices/authSlice';
// import { useParams, useNavigate } from 'react-router-dom';

// const ResetPasswordPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { token } = useParams();
//   const { loading, error, message } = useSelector((state) => state.auth);

//   const [form, setForm] = useState({ password: '', confirmPassword: '' });

//   useEffect(() => {
//     if (error) {
//       alert(error);
//       dispatch(clearError());
//     }
//   }, [error, dispatch]);

//   useEffect(() => {
//     if (message) {
//       alert(message);
//       dispatch(clearMessage());
//       navigate('/login');
//     }
//   }, [message, dispatch, navigate]);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (form.password !== form.confirmPassword) {
//       alert('Passwords do not match!');
//       return;
//     }
//     dispatch(resetPassword({ token, password: form.password }));
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded shadow-md w-full max-w-sm"
//       >
//         <h2 className="text-xl font-semibold mb-4">Reset Password</h2>

//         <input
//           type="password"
//           name="password"
//           value={form.password}
//           onChange={handleChange}
//           placeholder="New Password"
//           className="w-full mb-3 p-2 border rounded"
//           required
//         />

//         <input
//           type="password"
//           name="confirmPassword"
//           value={form.confirmPassword}
//           onChange={handleChange}
//           placeholder="Confirm Password"
//           className="w-full mb-3 p-2 border rounded"
//           required
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600 disabled:opacity-50"
//         >
//           {loading ? 'Resetting...' : 'Reset Password'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ResetPasswordPage;