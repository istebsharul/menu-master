// src/components/public/ProductShowcase.jsx
import React from "react";
import Section from "./Section";
import image1 from "../../assets/image1.png";

export default function ProductShowcase() {
  const dash = "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600&auto=format&fit=crop";

  return (
    <Section id="showcase" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">See MenuMaster in action</h2>
          <p className="mt-3 text-gray-600">A clean dashboard for owners. A fast, app‑free experience for guests.</p>
          <ul className="mt-6 space-y-3 text-gray-700">
            <li>• Drag‑and‑drop sections & items</li>
            <li>• Photo galleries & dietary badges</li>
            <li>• Schedule items for brunch, lunch, dinner</li>
            <li>• Print‑ready QR codes</li>
          </ul>
          <a href="#demo" className="inline-block mt-6 px-5 py-3 rounded-xl bg-[#0c7054] text-white hover:bg-[#03543d]">Watch 60s demo</a>
        </div>
        <div className="relative">
          <img src={dash} alt="Dashboard UI" className="rounded-2xl shadow-xl" />
          <img src={image1} alt="Mobile Menu" className="absolute w-40 sm:w-48 -bottom-6 -right-6" />
        </div>
      </div>
    </Section>
  );
}