import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser, clearError } from "../../redux/slices/authSlice";
import { IoReturnUpBackOutline } from "react-icons/io5";


import logo from "../../assets/logo.png";
import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    businessName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };

  return (
    <div className="min-h-screen flex relative">
      <a href="/"><div className="absolute top-10 left-10 z-10 flex justify-center items-center gap-3 text-md text-[#0c7054]"><IoReturnUpBackOutline className="text-xl"/>Go Back</div></a>
      
      {/* Left: Visuals (animated, same style as Login) */}
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

      {/* Right: Form */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 bg-white">
        <div className="max-w-md w-full mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <img src={logo} alt="MenuMaster" className="w-40" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Start managing your digital menu in minutes.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="mt-1 w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm
                           focus:ring-2 focus:ring-[#0c7054] focus:border-[#0c7054] outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                Business Name
              </label>
              <input
                id="businessName"
                name="businessName"
                type="text"
                value={form.businessName}
                onChange={handleChange}
                placeholder="Your restaurant / cafe"
                className="mt-1 w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm
                           focus:ring-2 focus:ring-[#0c7054] focus:border-[#0c7054] outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="mt-1 w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm
                           focus:ring-2 focus:ring-[#0c7054] focus:border-[#0c7054] outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#0c7054] text-white font-semibold
                         hover:bg-[#03543d] focus:ring-2 focus:ring-[#0c7054] focus:ring-offset-1
                         transition disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#0c7054] font-medium cursor-pointer hover:underline"
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
