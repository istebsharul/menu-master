// src/components/public/CTABanner.jsx
import React from "react";
import Section from "./Section";

export default function CTABanner() {
  return (
    <Section id="cta" className="bg-[#0c7054] py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold text-white">Start sharing your menu digitally today</h2>
        <p className="mt-3 text-green-100 max-w-2xl">Join restaurants that keep their menus fresh, contactless, and always up to date.</p>
        <div className="mt-6 flex gap-4">
          <a href="/signup" className="px-6 py-3 bg-white text-green-700 rounded-xl shadow hover:bg-green-50">Get Started Free</a>
          <a href="#pricing" className="px-6 py-3 border border-white/60 text-white rounded-xl hover:bg-white/10">See Pricing</a>
        </div>
      </div>
    </Section>
  );
}