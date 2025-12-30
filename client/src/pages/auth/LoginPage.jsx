import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, clearError } from "../../redux/slices/authSlice";
import { IoReturnUpBackOutline } from "react-icons/io5";

import logo from "../../assets/logo.png";
import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // handle error
  useEffect(() => {
    if (error) {
      alert("Hello",error); // replace with toast later
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="min-h-screen flex relative">
     <a href="/"><div className="absolute top-10 left-10 z-10 flex justify-center items-center gap-3 text-md text-[#0c7054]"><IoReturnUpBackOutline className="text-xl"/>Go Back</div></a>
      {/* Left: Visuals */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gray-50 relative overflow-hidden">
        <motion.img
          initial={{ scale: 0.95 }}
          animate={{ y: [0, -12, 0] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          src={image2}
          alt="Dashboard Preview"
          className="rounded-2xl w-3/4"
        />
        <motion.img
          initial={{ x: 20 }}
          animate={{ x: 0, y: [0, -10, 0] }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          src={image1}
          alt="Mobile QR Menu"
          className="absolute w-40 sm:w-48 bottom-10 right-10 rounded-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 bg-white">
        <div className="max-w-md w-full mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <img src={logo} alt="MenuMaster" className="w-40" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-bold text-gray-900">Welcome back 👋</h2>
          <p className="mt-2 text-sm text-gray-600">
            Log in to access your digital menu dashboard.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm 
                 focus:ring-2 focus:ring-[#0c7054] focus:border-[#0c7054] outline-none"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm 
                 focus:ring-2 focus:ring-[#0c7054] focus:border-[#0c7054] outline-none"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="flex justify-between items-center text-sm">
              <span
                onClick={() => navigate("/forgot-password")}
                className="text-[#0c7054] cursor-pointer hover:underline"
              >
                Forgot password?
              </span>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#0c7054] text-white font-semibold 
              hover:bg-[#03543d] focus:ring-2 focus:ring-[#0c7054] focus:ring-offset-1 
              transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600 text-center">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-[#0c7054] font-medium cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginUser, clearError } from '../../redux/slices/authSlice';
// import { useNavigate } from 'react-router-dom';

// const LoginPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user, loading, error } = useSelector((state) => state.auth);

//   const [form, setForm] = useState({ email: '', password: '' });

//   useEffect(() => {
//     if (user) {
//       navigate('/dashboard'); // Redirect if logged in
//     }
//     console.log(user);
//   }, [user, navigate]);

//   useEffect(() => {
//     if (error) {
//       alert(error); // Or use toast notification
//       dispatch(clearError());
//     }
//   }, [error, dispatch]);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(loginUser(form));
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded shadow-md w-full max-w-sm"
//       >
//         <h2 className="text-xl font-semibold mb-4">Login</h2>

//         <input
//           type="email"
//           name="email"
//           value={form.email}
//           onChange={handleChange}
//           placeholder="Email"
//           className="w-full mb-3 p-2 border rounded"
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           value={form.password}
//           onChange={handleChange}
//           placeholder="Password"
//           className="w-full mb-3 p-2 border rounded"
//           required
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
//         >
//           {loading ? 'Logging in...' : 'Login'}
//         </button>

//         <div className="text-sm mt-4 text-center">
//           <span
//             onClick={() => navigate('/forgot-password')}
//             className="text-blue-500 cursor-pointer hover:underline"
//           >
//             Forgot Password?
//           </span>
//         </div>

//         <div className="text-sm mt-2 text-center">
//           Don't have an account?{' '}
//           <span
//             onClick={() => navigate('/register')}
//             className="text-blue-500 cursor-pointer hover:underline"
//           >
//             Register
//           </span>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;