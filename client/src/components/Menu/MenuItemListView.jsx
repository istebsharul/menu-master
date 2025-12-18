import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AvailabilityToggle from "./AvailabilityToggle";

const MenuItemListView = ({ item, categories, availability, onEdit, onDelete, onToggle }) => {
    const [expanded, setExpanded] = useState(false);

    const isLong = item.description?.length > 120;
    const displayText = expanded ? item.description : item.description?.slice(0, 120);

    return (
        <div className="w-full bg-white border border-gray-200 rounded-xl p-2 flex justify-between items-center hover:shadow-sm gap-4">
            {/* Image */}
            {item?.imageUrl && (
                <div className="w-20 flex-shrink-0">
                    <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full object-cover rounded"
                    />
                </div>
            )}

            {/* Name & Category */}
            <div className="flex-1 flex-col justify-center flex-shrink-0 p-1 gap-1">
                <h3 className="text-lg font-semibold truncate">{item.name}</h3>
                <div className="flex">
                    <p className="text-sm text-gray-500 truncate">
                        {categories.find((c) => c._id === item.categoryId)?.name}
                    </p>
                    {item?.tags?.length > 0 && (
                        <div className="flex justify-center items-center flex-wrap">
                            {item.tags.map((tag, i) => (
                                <label
                                    key={i}
                                    className="w-fit px-2 py-0.2 mx-2 text-xs text-white rounded-full bg-orange-500"
                                >
                                    {tag}
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Description */}
            <div className="w-1/2 text-md text-gray-600 p-2">
                {displayText}
                {!expanded && isLong && "... "}
                {isLong && (
                    <button
                        className="text-xs text-blue-600 hover:underline ml-1"
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? "Show Less" : "Show More"}
                    </button>
                )}
            </div>

            {/* Price */}
            <div className="w-20">
                <p className="text-[#0c7054] font-bold">${item.price}</p>
            </div>

            {/* Availability */}
            <div className="w-fit flex items-center justify-center gap-2 flex-shrink-0">
                <AvailabilityToggle available={availability} onToggle={onToggle} />
            </div>

            {/* Actions */}
            <div className="w-fit flex justify-end gap-2 p-2">
                <button onClick={onEdit} className="text-blue-600 hover:text-blue-800">
                    <FaEdit className="text-2xl" />
                </button>
                <button onClick={onDelete} className="text-red-600 hover:text-red-800">
                    <MdDelete className="text-2xl" />
                </button>
            </div>
        </div>
    );
};

export default MenuItemListView;


// import React, { useState } from "react";
// import { FaEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import AvailabilityToggle from "./AvailabilityToggle";

// const MenuItemListView = ({ item, categories, availability, onEdit, onDelete, onToggle }) => {
//     const [expanded, setExpanded] = useState(false);

//     const isLong = item.description?.length > 120; // adjust for list view
//     const displayText = expanded ? item.description : item.description?.slice(0, 120);

//     return (
//         <div className="w-full bg-white border border-gray-200 rounded-xl p-2 flex flex-row gap-4 items-center shadow-sm">
//             <div className="flex-1 flex gap-1">
//                 <div className="flex flex-row justify-between items-center gap-2">
//                     {item?.imageUrl && (
//                         <img
//                             src={item.imageUrl}
//                             alt={item.name}
//                             className="w-16 h-16 object-cover rounded"
//                         />
//                     )}
//                     <h3 className="font-semibold">{item.name}</h3>
//                     {item.tag && (
//                         <span className="px-2 py-0.5 text-xs rounded-full bg-[#0c7054] text-white">
//                             {item.tag}
//                         </span>
//                     )}

//                     <p className="text-sm text-gray-500">
//                         {categories.find((c) => c._id === item.categoryId)?.name}
//                     </p>

//                     <p className="text-sm text-gray-600">
//                         {displayText}
//                         {!expanded && isLong && "... "}
//                         {isLong && (
//                             <button
//                                 className="text-xs text-blue-600 hover:underline"
//                                 onClick={() => setExpanded(!expanded)}
//                             >
//                                 {expanded ? "Show Less" : "Show More"}
//                             </button>
//                         )}
//                     </p>

//                     <div className="flex items-end gap-2">
//                         <p className="text-[#0c7054] font-bold">${item.price}</p>
//                         <AvailabilityToggle available={availability} onToggle={onToggle} />
//                     </div>

//                     <div className="flex gap-2">
//                         <button onClick={onEdit} className="text-blue-600 hover:underline">
//                             <FaEdit />
//                         </button>
//                         <button onClick={onDelete} className="text-red-600 hover:underline">
//                             <MdDelete />
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MenuItemListView;