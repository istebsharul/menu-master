import React from "react";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";

// const featuredItems = [
//     { name: "Mandi", img: "https://t4.ftcdn.net/jpg/07/75/11/61/360_F_775116148_auR8R1TmdkuB3wKhCd1DRKrPDbebnVXN.jpg" },
//     { name: "Masala Tandoori", img: "https://www.cubesnjuliennes.com/wp-content/uploads/2022/12/Tandoori-Chicken-Recipe.jpg" },
//     { name: "Milk Cake", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFDzaduscbVLnvPZJoRYN4ewjEPAUwWV_l3g&s" },
//     { name: "Pulao", img: "https://www.indianveggiedelight.com/wp-content/uploads/2019/07/veg-pulao-featured.jpg" },
//     { name: "Biryani", img: "https://www.cubesnjuliennes.com/wp-content/uploads/2020/07/Chicken-Biryani-Recipe.jpg" },
//     { name: "Mandi", img: "https://t4.ftcdn.net/jpg/07/75/11/61/360_F_775116148_auR8R1TmdkuB3wKhCd1DRKrPDbebnVXN.jpg" },
//     { name: "Masala Tandoori", img: "https://www.cubesnjuliennes.com/wp-content/uploads/2022/12/Tandoori-Chicken-Recipe.jpg" },
//     { name: "Milk Cake", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFDzaduscbVLnvPZJoRYN4ewjEPAUwWV_l3g&s" },
//     { name: "Pulao", img: "https://www.indianveggiedelight.com/wp-content/uploads/2019/07/veg-pulao-featured.jpg" },
//     { name: "Biryani", img: "https://www.cubesnjuliennes.com/wp-content/uploads/2020/07/Chicken-Biryani-Recipe.jpg" },
// ];

const FeaturedItems = ({ featuredItems = [] }) => {
    if (!Array.isArray(featuredItems)) return null;

    // Adding state for primaryColor 
    const restaurant = useSelector((state) => state.publicMenu.restaurant);

    return (
        <div className="max-w-6xl mx-auto md:py-8">
            <div className="px-4 py-4 flex items-center gap-2  font-light text-xl" style={{ color: restaurant?.secondaryColor ?? "#0b7054" }}>
                {/* <FaHeart className="text-red-500 text-2xl"/> */}
                Recommended for You
            </div>
            <div className="overflow-hidden">
                <div className="md:px-0 px-4 flex sm:grid sm:grid-cols-3 md:grid-cols-10 gap-2 overflow-x-auto sm:overflow-visible no-scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                    {featuredItems.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center flex-shrink-0 sm:flex-shrink p-1"
                        >
                            <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded-full shadow-md hover:scale-105 transition-transform"
                            />
                            {/* <p className="w-min mt-2 text-xs font-medium w-full">{item.name}</p> */}
                            <p className=" mt-2 text-xs font-medium w-full">{item.name}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default FeaturedItems;