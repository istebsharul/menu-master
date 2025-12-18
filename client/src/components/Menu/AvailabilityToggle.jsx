import React from "react";

const AvailabilityToggle = ({ available, onToggle }) => {
  return (
    <div
      onClick={onToggle}
      className={`relative w-20 h-7 flex items-center rounded-full px-1 cursor-pointer transition-colors duration-300 ${
        available ? "bg-green-600" : "bg-red-600"
      }`}
    >
      <span
        className={`w-full flex absolute ${
          available ? "justify-start px-2" : "justify-end px-4"
        } text-[9px] font-medium text-white`}
      >
        {available ? "Available" : "Sold Out"}
      </span>
      <div
        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          available ? "translate-x-13" : "translate-x-0"
        }`}
      />
    </div>
  );
};

export default AvailabilityToggle;