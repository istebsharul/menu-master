// src/components/public/Section.jsx
import React from "react";

const Section = ({ id, className = "", children }) => (
  <section id={id} className={`scroll-mt-16 ${className}`}>
    {children}
  </section>
);

export default Section;