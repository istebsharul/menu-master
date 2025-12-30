import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const swipeConfidenceThreshold = 80;

const Header = ({ logo, gallery = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);

  const startAutoSlide = () => {
    clearInterval(intervalRef.current);

    if (gallery.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % gallery.length);
    }, 4000);
  };

  useEffect(() => {
    if (gallery.length) {
      setActiveIndex(0);
      startAutoSlide();
    }

    return () => clearInterval(intervalRef.current);
  }, [gallery]);

  const paginate = (direction) => {
    setActiveIndex((prev) => {
      const next = prev + direction;
      if (next < 0) return gallery.length - 1;
      if (next >= gallery.length) return 0;
      return next;
    });
    startAutoSlide();
  };

  return (
    <div className="mx-auto space-y-4">
      {/* Logo */}
      <div className="w-full flex justify-center items-center h-20 bg-[#0c7054]">
        <img src={logo} alt="Logo" className="h-16 object-contain" />
      </div>

      <div className="px-2">
        {/* Slider */}
        {gallery.length > 0 && (
          <div className="relative w-full max-w-6xl mx-auto h-48 md:h-80 overflow-hidden">
            <AnimatePresence initial={false}>
              <motion.img
                key={activeIndex}
                src={gallery[activeIndex]}
                alt="Gallery"
                className="absolute inset-0 w-full h-full object-cover rounded-xl"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.9}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;

                  if (swipe < -swipeConfidenceThreshold) paginate(1);
                  else if (swipe > swipeConfidenceThreshold) paginate(-1);
                }}
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                exit={{ x: -100 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              />
            </AnimatePresence>

            {/* Dots */}
            {gallery.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {gallery.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveIndex(idx);
                      startAutoSlide();
                    }}
                    className={`w-2 h-2 rounded-full ${idx === activeIndex ? "bg-white" : "bg-white/50"
                      }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;