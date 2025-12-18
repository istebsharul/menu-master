// src/pages/LandingPage.jsx
import React from "react";
import Header from "../components/Landing/Header";
import Hero from "../components/Landing/Hero";
import Features from "../components/Landing/Features";
import HowItWorks from "../components/Landing/HowItWorks";
import ProductShowcase from "../components/Landing/ProductShowcase";
import Testimonials from "../components/Landing/Testimonials";
import Pricing from "../components/Landing/Pricing";
import FAQ from "../components/Landing/FAQ";
import CTABanner from "../components/Landing/CTABanner";
import Footer from "../components/Landing/Footer";

export default function LandingPage() {
  return (
    <div className="bg-white text-gray-900">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <ProductShowcase />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTABanner />
      <Footer />
    </div>
  );
}