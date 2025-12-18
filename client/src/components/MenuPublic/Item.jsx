import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const Item = ({ item, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 60;

  const handleClick = () => {
    if (item?.available && window.innerWidth < 768) {
      onSelect(item);
    }
  };

  return (
    <div
      className={`${
        !item?.available ? "grayscale cursor-not-allowed" : ""
      } w-full md:w-54 flex md:flex-col flex-row-reverse gap-4 md:gap-0 border-b md:border-none border-gray-200 pb-2 overflow-hidden`}
      aria-disabled={!item?.available}
    >
      {/* Image Section */}
      <div
        className={`relative ${!item?.available ? "pointer-events-none" : ""}`}
        onClick={handleClick}
      >
        <img
          src={item.imageUrl}
          alt={item.name}
          className="md:w-full md:h-48 w-32 h-32 object-cover rounded-xl"
        />

        {!item?.available && (
          <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-semibold rounded-xl">
            Out of Stock 
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className="md:flex flex-col flex-1 md:px-1 md:py-2 space-y-1">
        {item?.tags && item.tags.length > 0 && (
          <span className="block md:hidden w-fit bg-orange-500 text-white text-xs font-semibold px-2 py-0.2 rounded-full">
            #{item.tags}
          </span>
        )}

        <div>
          <h3 className="md:text-lg text-lg flex font-semibold items-center">
            {item.name}
          </h3>
          <p className="text-sm">{item?.categoryId?.name}</p>
          <p className="text-xs text-gray-700">
            {item.description?.length > maxLength
              ? isExpanded
                ? item.description
                : `${item.description.slice(0, maxLength)}...`
              : item.description}

            {item.description?.length > maxLength && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="ml-1 text-[#0c7054] font-semibold"
              >
                {isExpanded ? "Show less" : "Show more"}
              </button>
            )}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 text-sm">
            {item.price && (
              <span className="line-through text-gray-400">
                ${(item.price * 1.1).toFixed(2)}
              </span>
            )}
            <span className="font-bold text-black">${item.price}</span>
          </div>

          {item?.rating && (
            <div className="flex items-center text-xs text-gray-700">
              <FaStar className="text-yellow-500 mr-1" />
              <span className="font-medium">{item.rating}</span>
              <span className="ml-1 text-gray-500">({item.reviews})</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Item;