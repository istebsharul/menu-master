// src/components/public/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl grid place-items-center bg-[#0c7054] text-white text-sm font-bold">MM</div>
            <span className="font-semibold text-gray-900">MenuMaster</span>
          </div>
          <p className="mt-3 text-sm text-gray-600">Digital menus with instant updates and QR access.</p>
        </div>
        <div>
          <div className="font-semibold text-gray-900">Product</div>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li><a href="#features" className="hover:text-[#0c7054]">Features</a></li>
            <li><a href="#how" className="hover:text-[#0c7054]">How it works</a></li>
            <li><a href="#pricing" className="hover:text-[#0c7054]">Pricing</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-gray-900">Company</div>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-[#0c7054]">About</a></li>
            <li><a href="#" className="hover:text-[#0c7054]">Contact</a></li>
            <li><a href="#" className="hover:text-[#0c7054]">Careers</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-gray-900">Legal</div>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-[#0c7054]">Privacy</a></li>
            <li><a href="#" className="hover:text-[#0c7054]">Terms</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-gray-500">© {new Date().getFullYear()} MenuMaster. All rights reserved.</div>
    </footer>
  );
}