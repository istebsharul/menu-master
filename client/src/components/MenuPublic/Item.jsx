import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const Item = ({ item, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 60;

  const TAG_CONFIG = {
    "Best Seller": { emoji: "⭐", label: "Best Seller" },
    "Veg": { emoji: "🟢", label: "Veg" },
    "Non Veg": { emoji: "🔴", label: "Non-Veg" },
    "Spicy": { emoji: "🌶️", label: "Spicy" },
    "Chef's Special": { emoji: "👨‍🍳", label: "Chef's Special" },
  };

  const handleClick = () => {
    if (item?.available && window.innerWidth < 768) {
      onSelect(item);
    }
  };

  return (
    <div
      className={`${!item?.available ? "grayscale cursor-not-allowed" : ""
        } w-full md:w-54 flex md:flex-col flex-row-reverse gap-4 md:gap-0 border-b md:border-none border-gray-200 pb-2 overflow-hidden`}
      aria-disabled={!item?.available}
    >
      {/* Image Section */}
      {item?.imageUrl &&
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
      }

      {/* Details Section */}
      <div className="md:flex flex-col flex-1 md:px-1 md:py-2 space-y-0.5">
        {item?.tags?.length > 0 && (
          <div className="block md:hidden flex flex-wrap gap-1">
            {item.tags.map((tag, i) => {
              const config = TAG_CONFIG[tag];
              if (!config) return null;

              return (
                <span
                  key={i}
                  className="flex items-center gap-1 border border-0.1 
                     text-xs font-semibold p-1 rounded-full"
                >
                  <span className="text-xs leading-none">
                    {config.emoji}
                  </span>
                  <span className="leading-none">
                    {config.label}
                  </span>
                </span>
              );
            })}
          </div>
        )}

        <div>
          <h3 className="md:text-lg text-lg flex font-semibold items-center">
            {item.name}
          </h3>
          <p className="text-sm text-green-700 text-[#FFB81C]">{item?.categoryId?.name}</p>
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