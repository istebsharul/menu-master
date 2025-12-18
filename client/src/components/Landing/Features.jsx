import React from "react";
import Section from "./Section";

export default function Features() {
  const items = [
    { icon: "⚡", title: "Instant updates", desc: "Change prices & items and go live immediately." },
    { icon: "📱", title: "QR access", desc: "Print once—customers scan to view your menu." },
    { icon: "🧑‍🍳", title: "Designed for restaurants", desc: "Categories, photos, add‑ons, availability windows." },
    { icon: "🎨", title: "Brand ready", desc: "Customize colors, logos, and domains." },
  ];
  return (
    <Section id="features" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-gray-900">Everything you need to go digital</h2>
          <p className="mt-3 text-gray-600">MenuMaster keeps your menu fresh and your guests informed—without reprints.</p>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="text-2xl">{f.icon}</div>
              <h3 className="mt-3 font-semibold text-gray-900">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}