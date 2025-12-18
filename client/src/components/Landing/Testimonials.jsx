// src/components/public/Testimonials.jsx
import React from "react";
import Section from "./Section";

export default function Testimonials() {
  const items = [
    {
      name: "Anita R.", role: "Owner, Spice Route",
      quote: "We update our specials daily. No reprints, no fuss—guests love the QR.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop",
    },
    {
      name: "Marco D.", role: "GM, Osteria 21",
      quote: "Setup took five minutes and our staff stopped answering menu calls.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop",
    },
    {
      name: "Priya S.", role: "Cafe Founder",
      quote: "Photos + badges improved upsells. Customers actually read our menu now.",
      avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=256&auto=format&fit=crop",
    },
  ];

  return (
    <Section id="testimonials" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900">Loved by modern restaurants</h2>
          <p className="mt-3 text-gray-600">From cafes to fine dining—owners trust MenuMaster.</p>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {items.map((t) => (
            <div key={t.name} className="rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-gray-900">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
              </div>
              <p className="mt-4 text-gray-700">“{t.quote}”</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}