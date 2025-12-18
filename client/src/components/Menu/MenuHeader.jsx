import React from "react";
import { FaList } from "react-icons/fa";
import { BsFillGrid3X3GapFill } from "react-icons/bs";

const MenuHeader = ({ view, setView }) => {
  return (
    <div className="flex items-center justify-between gap-4 p-4">
      <h1 className="text-lg font-semibold">Menu</h1>
      <div className="flex hidden md:block space-x-2">
        {/* Grid Button */}
        <button
          onClick={() => setView("grid")}
          className={`p-2 rounded-lg border ${
            view === "grid" ? "border-[#0c7054] text-[#0c7054]" : "border-gray-300 text-gray-600"
          }`}
        >
          <BsFillGrid3X3GapFill />
        </button>

        {/* List Button */}
        <button
          onClick={() => setView("list")}
          className={`p-2 rounded-lg border ${
            view === "list" ? "border-[#0c7054] text-[#0c7054]" : "border-gray-300 text-gray-600"
          }`}
        >
          <FaList />
        </button>
      </div>
    </div>
  );
};

export default MenuHeader;
