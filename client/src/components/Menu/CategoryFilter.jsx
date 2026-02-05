import React from "react";

const CategoryFilter = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="md:p-2 text-gray-600">
      {/* Desktop Tabs */}
      <div className="hidden md:flex gap-2">
        <button
          key="All"
          onClick={() => setActiveCategory("All")}
          className={`pb-2 px-4 transform transition-all duration-300 ${activeCategory === "All"
            ? "text-[#0c7054] border-b-2 border-[#0c7054]"
            : ""}`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => setActiveCategory(cat._id)}
            className={`pb-2 px-4 transform transition-all duration-300 ${activeCategory === cat._id
              ? "text-[#0c7054] border-b-2 border-[#0c7054]"
              : ""}`}
          >
            {cat.name}
          </button>
        ))}
      </div>
  
      {/* Mobile Dropdown */}
      <div className="md:hidden">
        <select
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
          className="w-full rounded-md p-2 text-gray-700"
        >
          <option value="All">All</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CategoryFilter;