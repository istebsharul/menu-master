// src/components/public/HowItWorks.jsx
import React from "react";
import Section from "./Section";

export default function HowItWorks() {
  const steps = [
    { n: 1, t: "Create your menu", d: "Add items, categories, photos, and prices in minutes." },
    { n: 2, t: "Generate your QR", d: "One click to create a branded QR code for your venue." },
    { n: 3, t: "Place & share", d: "Print table tents, stickers, or share the link anywhere." },
    { n: 4, t: "Scan & view", d: "Guests scan the QR to see your latest menu instantly." },
  ];

  return (
    <Section id="how" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900">How it works</h2>
          <p className="mt-3 text-gray-600">From setup to live in under 10 minutes.</p>
        </div>
        <div className="mt-10 grid md:grid-cols-4 sm:grid-cols-2 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-9 h-9 rounded-full bg-[#0c7054] text-white grid place-items-center font-semibold">{s.n}</div>
              <h3 className="mt-3 font-semibold text-gray-900">{s.t}</h3>
              <p className="mt-2 text-sm text-gray-600">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}