import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
// import { BiSolidCategory } from "react-icons/bi";

const CategoriesFilter = ({ categories, setCategory }) => {
  const scrollRef = useRef(null);
  const [active, setActive] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  useEffect(() => {
    setCategory(active?.name);
  }, [active]);

  return (
    <div className="max-w-6xl mx-auto flex flex-col items-start justify-between px-4 py-4 gap-2">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-2 text-[#0c7054] font-bold text-xl">
          {/* <BiSolidCategory className="text-xl" /> */}
          <HiOutlineMenuAlt2 className="text-2xl" />

          <span className="font-light">Menu</span>
        </div>

        {/* Dropdown (Mobile) */}
        <div className="w-auto text-nowrap sm:hidden relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-full py-1 px-3 border rounded text-[#0c7054] font-medium bg-white"
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
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${!active ? "text-[#0c7054] font-semibold" : "text-black"
                  }`}
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
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#0c7054]"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 
      <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide p-1">
        <button
          onClick={() => setActive(null)}
          className="flex flex-col items-center gap-1 group"
        >
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full border transition ${active === null ? "border-[#0c7054] scale-110" : ""
              }`}
          >
            <span className="text-sm font-semibold">All</span>
          </div>
          <span
            className={`text-xs ${active === null ? "text-[#0c7054] font-semibold" : "text-gray-600"
              }`}
          >
            All
          </span>
        </button>

        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => setActive(cat)}
            className="flex flex-col items-center gap-1 group"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className={`w-12 h-12 p-1 rounded-full object-cover transition ${active?._id === cat._id
                  ? "border border-[#0c7054] scale-110"
                  : "border-gray-300 group-hover:scale-105"
                }`}
            />
            <span
              className={`text-xs transition ${active?._id === cat._id
                  ? "text-[#0c7054] font-semibold"
                  : "text-gray-600"
                }`}
            >
              {cat.name}
            </span>
          </button>
        ))}
      </div> */}
    </div>

    // <div className="max-w-6xl mx-auto flex flex-col items-start justify-between px-4 py-4 gap-2">
    //   {/* Left Menu Icon & Title */}
    //   <div className="flex items-center gap-2 text-[#0c7054] font-bold text-xl">
    // <HiOutlineMenuAlt2 className="text-2xl" />
    //     <span>Menu</span>
    //   </div>

    //   {/* Scrollable Categories (Desktop & Tablet) */}
    // <div className="relative hidden sm:block">
    //   <div ref={scrollRef} className="flex overflow-x-auto scrollbar-hide">
    //     {
    //       <button
    //         onClick={() => setActive(null)}
    //         className={`${active === null ? 'font-medium text-[#0c7054] border-b-2' : ''}`}>All
    //       </button>}
    //     {categories.map((cat) => (
    //       <button
    //         key={cat._id}
    //         onClick={() => setActive(cat)}
    //         className={`relative whitespace-nowrap py-2 px-4 transform transition-all duration-300 hover:bg-green-50 hover:rounded-t-xl ${active?._id === cat._id
    //           ? "font-medium text-[#0c7054] border-b-2"
    //           : "text-black"
    //           }`}
    //       >
    //         {cat.name}
    //         {active?._id === cat._id && (
    //           <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#0c7054]"></span>
    //         )}
    //       </button>
    //     ))}
    //   </div>
    // </div>

    // {/* Dropdown (Mobile) */}
    // <div className="w-full sm:hidden relative">
    //   <button
    //     onClick={() => setIsOpen(!isOpen)}
    //     className="flex items-center justify-between w-full py-2 px-4 border rounded-md shadow-sm text-[#0c7054] font-semibold bg-white"
    //   >
    //     {active ? active.name : "Select Category"}
    //     <FaChevronDown
    //       className={`ml-2 transition-transform ${isOpen ? "rotate-180" : "rotate-0"
    //         }`}
    //     />
    //   </button>

    //   {isOpen && (
    //     <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-10">
    //       {/* ✅ All Categories Option */}
    //       <div
    //         onClick={() => {
    //           setActive(null);
    //           setIsOpen(false);
    //         }}
    //         className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${!active ? "text-[#0c7054] font-semibold" : "text-black"
    //           }`}
    //       >
    //         All Categories
    //       </div>

    //       {categories.map((cat) => (
    //         <div
    //           key={cat._id}
    //           onClick={() => {
    //             setActive(cat);
    //             setIsOpen(false);
    //           }}
    //           className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${active?._id === cat._id
    //             ? "text-[#0c7054] font-semibold"
    //             : "text-black"
    //             }`}
    //         >
    //           {cat.name}
    //         </div>
    //       ))}
    //     </div>
    //   )}
    // </div>
    // </div>
  );
};

export default CategoriesFilter;