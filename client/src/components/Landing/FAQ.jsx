// src/components/public/FAQ.jsx
import React, { useState } from "react";
import Section from "./Section";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const qa = [
    {
      q: "Do customers need to install an app?",
      a: "No. They just scan your QR code with their camera to open the menu in the browser.",
    },
    {
      q: "Can I update my menu anytime?",
      a: "Yes. Changes are live instantly—no reprints required.",
    },
    {
      q: "Can I customize branding?",
      a: "Pro plan supports custom colors, logos, and domains.",
    },
    {
      q: "Does it work offline?",
      a: "Guests need connectivity to view the latest menu. You can print a static backup QR linking to a cached PDF if needed.",
    },
  ];

  const [open, setOpen] = useState(0);

  const toggle = (i) => setOpen(open === i ? -1 : i);

  return (
    <Section id="faq" className="bg-white py-16">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-gray-600">
            Everything you need to know about MenuMaster.
          </p>
        </div>

        <div className="mt-8 divide-y divide-gray-200 border border-gray-100 rounded-2xl overflow-hidden">
          {qa.map((item, i) => (
            <div key={item.q}>
              {/* Button header */}
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-medium text-gray-900">{item.q}</span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown
                    className={`w-5 h-5 ${
                      open === i ? "text-gray-900" : "text-gray-500"
                    }`}
                  />
                </motion.div>
              </button>

              {/* Animated Answer */}
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-gray-700">{item.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}