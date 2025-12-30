import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AvailabilityToggle from "./AvailabilityToggle";

const MenuItemCard = ({ item, categories, availability, onEdit, onDelete, onToggle }) => {
  const [expanded, setExpanded] = useState(false);
  const [nameExpanded, setNameExpanded] = useState(false);

  // Helper function to check if description is long
  const itemNameLong = item.name?.length > 20;
  const displayItemName = nameExpanded ? item.name : item.name?.slice(0, 20);
  const isLong = item.description?.length > 80; // adjust length as per need
  const displayText = expanded ? item.description : item.description?.slice(0, 80);

  const TAG_CONFIG = {
    "Best Seller": { emoji: "⭐", label: "Best Seller" },
    "Veg": { emoji: "🟢", label: "Veg" },
    "Non Veg": { emoji: "🔴", label: "Non-Veg" },
    "Spicy": { emoji: "🌶️", label: "Spicy" },
    "Chef's Special": { emoji: "👨‍🍳", label: "Chef's Special" },
  };

  return (
    <div className="max-w-lg w-full bg-white rounded-xl border border-gray-200 md:p-4 p-2 flex gap-2 items-start shadow-inner">
      {item?.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.name}
          className="md:w-1/3 w-1/3 h-full object-cover rounded"
        />
      )}

      <div className="w-1/2 flex flex-col flex-1 justify-between">
        <div>
          {item?.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {item.tags.map((tag, i) => {
                const config = TAG_CONFIG[tag];
                if (!config) return null;

                return (
                  <span
                    key={i}
                    className="flex items-center gap-1 text-xs border px-2 py-0.5 rounded-full"
                    title={config.label}
                  >
                    <span className="text-xs">{config.emoji}</span>
                    <span>{config.label}</span>
                  </span>
                );
              })}
            </div>
          )}

          <div className="flex justify-between items-center">
            <div>
              <h3 className="md:text-lg text-md font-semibold text-nowrap">{displayItemName}{!nameExpanded && itemNameLong && "... "}</h3>
              {item.tag && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-[#0c7054] text-white">
                  {item.tag}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button onClick={onEdit} className="text-blue-600 hover:underline">
                <FaEdit className="text-lg" />
              </button>
              <button onClick={onDelete} className="text-red-600 hover:underline">
                <MdDelete className="text-lg" />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            {categories.find((c) => c._id === item.categoryId)?.name}
          </p>

          {/* Description with Show More / Less */}
          <p className="md:text-sm text-xs text-gray-600 mt-1">
            {displayText}
            {!expanded && isLong && "... "}
            {isLong && (
              <button
                className="text-xs text-blue-600 mt-1 hover:underline"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "Show Less" : "Show More"}
              </button>
            )}
          </p>
        </div>

        <div className="flex justify-between items-center md:mt-1">
          <p className="text-[#0c7054] font-bold">${item.price}</p>
          <AvailabilityToggle available={availability} onToggle={onToggle} />
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
