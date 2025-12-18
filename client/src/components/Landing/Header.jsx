import React from "react";
import logo from "../../assets/logo.png";

export default function Header() {
  return (
    <header className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-gray-100 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
        <a href="#top" className="flex items-center space-x-2">
          <img className="w-40" src={logo} alt="Logo" />
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {["features","how","showcase","pricing","faq"].map(id => (
            <a
              key={id}
              href={`#${id}`}
              className="text-gray-600 hover:text-[#0c7054] transition-all duration-200 transform hover:-translate-y-1 hover:scale-105 hover:font-semibold"
            >
              {id === "how" ? "How it works" : id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a href="/login" className="text-gray-600 hover:text-[#0c7054] text-sm">Log in</a>
          <a href="/signup" className="px-4 py-2 bg-[#0c7054] text-white rounded-xl shadow hover:bg-[#0c7054] text-sm">Get Started</a>
        </div>
      </div>
    </header>
  );
}
