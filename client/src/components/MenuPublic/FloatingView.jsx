import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const FloatingView = ({ isOpen, onClose, item }) => {
  const floatingRef = useRef(null);

  // Adding state for primaryColor 
const primaryColor = useSelector((state)=> state.restaurant.primaryColor)
const restaurant = useSelector((state) => state.restaurant);



  // Detect click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (floatingRef.current && !floatingRef.current.contains(event.target)) {
        onClose(); // Close when clicked outside
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  return (
    <>
      {/* Overlay with white background & 20% opacity */}
      <div className="fixed inset-0 bg-white/20 z-40"></div>

      {/* Floating Bottom Sheet */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: isOpen ? 0 : "100%" }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed bottom-0 left-0 w-full rounded-t-2xl shadow-2xl z-50"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="w-full text-center rounded-full mb-2"
        >
          ╳
        </button>

        <div
          ref={floatingRef}
          className="flex flex-col items-center gap-4 bg-gray-100 rounded-t-2xl p-4"
        >
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full rounded-lg object-cover shadow-md"
          />
          <div className="w-full flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">
              {item.name}
            </h3>
            <p className=" font-bold" style={{ color: restaurant?.primaryColor ?? "#0b7054" }}>
              ${item.price.toFixed(2)}
              {item.price && (
                <span className="ml-2 text-gray-500 line-through text-sm">
                  ${(item.price * 1.1).toFixed(2)}
                </span>
              )}
            </p>
          </div> 
          <button onClick={onClose} className="w-full text-center p-2 rounded-xl  text-white" style={{ backgroundColor: restaurant?.primaryColor ?? "#0b7054" }}>
            Close
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default FloatingView;