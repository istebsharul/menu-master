// src/components/public/Pricing.jsx
import React, { useState } from "react";
import Section from "./Section";

export default function Pricing() {
  const [selectedPlanId, setSelectedPlanId] = useState(1); // Correct state variable

  const plans = [
    {
      id: 1,
      name: "Starter Plan",
      price: "$9/mo",
      features: [
        "Free 1 Month Trial",
        "Digital Menu with QR Code",
        "Basic Menu Management (Add/Edit/Delete)",
        "Mobile-Friendly Design",
        "Customer Feedback Form",
        "Email Support",
      ],
    },
    {
      id: 2,
      name: "Growth Plan",
      price: "$29/mo",
      features: [
        "Everything in Starter +",
        "Unlimited Menu Categories & Items",
        "Upload Images for Menu Items",
        "Daily/Weekly Specials Highlight",
        "Analytics (Top Viewed Dishes)",
        "Priority Email + Chat Support",
      ],
    },
    {
      id: 3,
      name: "Premium Plan",
      price: "$49/mo",
      features: [
        "Everything in Growth +",
        "Multi-Branch Management",
        "Custom Branding & Logo Integration",
        "Advanced Sales & Order Analytics",
        "Table Reservations & Pre-Orders",
        "24/7 Priority Support",
      ],
    },
  ];

  return (
    <Section id="pricing" className="w-full py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <h2 className="text-4xl font-bold text-center mb-4">Choose Your Plan</h2>
        <p className="text-center text-gray-600 mb-12">
          Starter plans include a{" "}
          <span className="font-semibold text-[#0c7054]">Free 1-Month Trial</span>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl shadow-lg p-8 bg-white border ${
                plan.id === selectedPlanId
                  ? "border-[#0c7054] scale-105"
                  : "border-gray-200"
              } transition-transform duration-300 hover:scale-105`}
            >
              <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6 text-[#0c7054]">{plan.price}</p>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <span className="text-green-500 mr-2">✔</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setSelectedPlanId(plan.id)}
                className={`w-full py-3 rounded-xl font-semibold transition ${
                  plan.id === selectedPlanId
                    ? "bg-[#0c7054] text-white hover:bg-[#0c7054]"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                Start Free Trial
              </button>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
