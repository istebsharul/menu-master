import React from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";

export default function Hero() {
  return (
    <Section id="top" className="bg-white">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-16 lg:pt-40 lg:pb-24 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl leading-tight">Your Menu, Instantly Digital.</h1>
          <p className="mt-4 text-lg text-gray-600">Create, update, and share your restaurant menu with a simple QR code. Customers scan & dine — no app, no hassle.</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a href="/signup" className="px-6 py-3 bg-[#0c7054] text-white rounded-xl shadow hover:bg-[#03543d]">Get Started Free</a>
            <a href="#demo" className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-[#03543d] hover:text-white">See Demo</a>
          </div>
          <div className="mt-6 flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2"><span>🕒</span><span>Real‑time updates</span></div>
            <div className="flex items-center gap-2"><span>📱</span><span>No app required</span></div>
            <div className="flex items-center gap-2"><span>🔒</span><span>Secure & reliable</span></div>
          </div>
        </div>
        {/* Visual */}
        <div className="relative">
          <motion.img
            initial={{ scale: 0.98 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
            src={image2}
            alt="MenuMaster Dashboard"
            className="rounded-2xl"
          />
          <motion.img
            initial={{ x: 20 }}
            animate={{ x: 0, y: [0, -8, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
            src={image1}
            alt="QR Menu on Phone"
            className="absolute w-40 sm:w-48 -bottom-6 -right-6 rounded-2xl"
          />
        </div>
      </div>
    </Section>
  );
}
