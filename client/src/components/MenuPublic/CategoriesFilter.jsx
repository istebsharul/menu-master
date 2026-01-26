import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
// import { BiSolidCategory } from "react-icons/bi";
import { useSelector } from "react-redux";

const TAG_CONFIG = {
  "Best Seller": { emoji: "⭐" },
  "Veg": { emoji: "🟢" },
  "Non Veg": { emoji: "🔴" },
  "Spicy": { emoji: "🌶️" },
  "Chef's Special": { emoji: "👨‍🍳" },
};

const CategoriesFilter = ({ categories, setCategory, selectedTags, setSelectedTags }) => {
  const scrollRef = useRef(null);
  const [active, setActive] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Adding state for primaryColor 
const primaryColor = useSelector((state)=> state.restaurant.primaryColor)
const restaurant = useSelector((state) => state.restaurant);


  useEffect(() => {
    console.log(categories);
  }, [categories]);

  useEffect(() => {
    setCategory(active?.name);
  }, [active]);

  return (
    <div className="sticky top-0 bg-white max-w-6xl mx-auto flex flex-col items-start justify-between px-4 py-4 gap-2 z-1 md:shadow-none shadow">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-2  font-bold text-xl" style={{ color: restaurant?.primaryColor ?? "#0b7054" }}>
          {/* <BiSolidCategory className="text-xl" /> */}
          <HiOutlineMenuAlt2 className="text-2xl" />

          <span className="font-light">Menu</span>
        </div>

        {/* Dropdown (Mobile) */}
        <div className="w-auto text-nowrap sm:hidden relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-full py-1 px-3 border rounded  font-medium bg-white"style={{ color: restaurant?.primaryColor ?? "#0b7054" }}
          >
            {active ? active.name : "Select Category"}
            <FaChevronDown
              className={`ml-2 transition-transform ${isOpen ? "rotate-180" : "rotate-0"
                }`}
            />
          </button>

          {isOpen && (
            <div className="absolute right-0 w-40 mt-2 bg-white border rounded-lg shadow-lg z-10">
              {/* ✅ All Categories Option */}
              <div
                onClick={() => {
                  setActive(null);
                  setIsOpen(false); 
                }}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${!active ? "font-semibold" : "text-black"
                  }`} style={{ color: restaurant?.primaryColor ?? "#0b7054" }}
                  // style={{ color:!active ? restaurant?.primaryColor ?? "#0b7054" }}
              >
                All Categories
              </div>
 
              {categories.map((cat) => (
                <div
                  key={cat._id}
                  onClick={() => {
                    setActive(cat);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${active?._id === cat._id
                    ? "text-[#0c7054] font-semibold"
                    : "text-black"
                    }`}
                >
                  {cat.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-1">
        {Object.entries(TAG_CONFIG).map(([tag, config]) => {
          const active = selectedTags.includes(tag);

          return (
            <button
              key={tag}
              onClick={() => {
                setSelectedTags((prev) =>
                  prev.includes(tag)
                    ? prev.filter((t) => t !== tag)
                    : [...prev, tag]
                );
              }}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs border transition
          ${active
                  ? "bg-[#0c7054] text-white border-[#0c7054]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-green-50"
                }`}
            >
              <span>{config.emoji}</span>
              <span>{tag}</span>
            </button>
          );
        })}

        {/* Clear Tags */}
        {selectedTags.length > 0 && (
          <button
            onClick={() => setSelectedTags([])}
            className="text-sm text-red-500 underline ml-2"
          >
            Clear
          </button>
        )}
      </div>

      <div className="relative hidden sm:block">
        <div ref={scrollRef} className="flex overflow-x-auto scrollbar-hide">
          {
            <button
              onClick={() => setActive(null)}
              className={`${active === null ? 'font-medium text-[#0c7054] border-b-2' : ''}`}>All
            </button>}
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setActive(cat)}
              className={`relative whitespace-nowrap py-2 px-4 transform transition-all duration-300 hover:bg-green-50 hover:rounded-t-xl ${active?._id === cat._id
                ? "font-medium text-[#0c7054] border-b-2"
                : "text-black"
                }`}
            >
              {cat.name}
              {active?._id === cat._id && (
                <span className="absolute bottom-0 left-0 w-full h-[1px]" style={{ backgroundColor: restaurant?.primaryColor ?? "#0b7054" }}></span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesFilter;