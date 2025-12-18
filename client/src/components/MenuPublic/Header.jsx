import React, { useState, useEffect } from "react";
import { FaStar, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

const images = [
  "https://media.istockphoto.com/id/922783734/photo/assorted-indian-recipes-food-various.jpg?s=612x612&w=0&k=20&c=p8DepvymWfC5j7c6En2UsQ6sUM794SQMwceeBW3yQ9M=",
  "https://static.vecteezy.com/system/resources/thumbnails/038/970/612/small/ai-generated-chicken-biryani-in-a-shiny-silver-bowl-spicy-curry-and-aromatic-flavors-authentic-indian-food-serving-fancy-food-in-a-restaurant-photo.jpg",
  "https://i.ytimg.com/vi/XVxGnN_7Htc/hq720.jpg",
  "https://bonmasala.com/wp-content/uploads/2022/06/chicken-reshmi-kabab-1.jpg",
];

const reviews = [
  {
    text: "Food tastes great! Everything I’ve ordered has been so good.",
    name: "Wasim A.",
    date: "26/05/2024",
    stars: 4,
  },
  {
    text: "Tried Special keema naan, Afghani chicken, n rolls. It's a tiny gem of a place.",
    name: "Asif I.",
    date: "02/01/2025",
    stars: 4,
  },
  {
    text: "Chicken biryani is delicious!! The best one in town, literally must try.",
    name: "A.M. Khan",
    date: "17/11/2024",
    stars: 5,
  },
];

const Header = ({logo}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-slide carousel every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto space-y-4">
      {/* Logo */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="w-full flex justify-center items-center h-20 bg-[#0c7054]"
      >
        <img
          className="h-16"
          src={logo}
          alt="Logo"
        />
      </motion.div>

      <div className="max-w-6xl mx-auto md:space-y-4 space-y-2">
        {/* Banner Images */}
        <div className="w-full md:h-72 flex md:gap-2 gap-1 px-4">
          <div className="w-3/5">
            {/* Big Left Image */}
            <img
              src="https://media.istockphoto.com/id/922783734/photo/assorted-indian-recipes-food-various.jpg?s=612x612&w=0&k=20&c=p8DepvymWfC5j7c6En2UsQ6sUM794SQMwceeBW3yQ9M="
              alt="Food 1"
              className="h-full object-cover w-full md:rounded-l-4xl rounded-l-2xl"
            />
          </div>

          <div className="h-full flex-1 flex-col">
            <div className="w-full h-1/2">
              {/* Top Right Large Image */}
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/038/970/612/small/ai-generated-chicken-biryani-in-a-shiny-silver-bowl-spicy-curry-and-aromatic-flavors-authentic-indian-food-serving-fancy-food-in-a-restaurant-photo.jpg"
                alt="Food 2"
                className="w-full h-full w-full object-cover md:rounded-tr-4xl rounded-tr-2xl"
              />
            </div>

            <div className="flex w-full h-1/2 md:pt-2 pt-1">
              {/* Bottom Right Small Images */}
              <img
                src="https://i.ytimg.com/vi/XVxGnN_7Htc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBtTnVFTI-L8F_vuE8rWcxWV8vBLw"
                alt="Food 3"
                className="h-full w-1/2 md:pr-1 object-cover"
              />
              <img
                src="https://bonmasala.com/wp-content/uploads/2022/06/chicken-reshmi-kabab-1.jpg"
                alt="Food 4"
                className="h-full w-1/2 pl-1 object-cover md:rounded-br-4xl rounded-br-2xl"
              />
            </div>
          </div>
        </div>


        {/* Info & Rating */}
        <div className="flex md:flex-row flex-col-reverse md:space-x-4 gap-3 md:gap-0 px-4">
          <div className="h-full bg-white w-full">
            <div className="py-6 px-4 border border-[#0c7054] rounded-2xl shadow">
              <h2 className="md:pb-4 md:text-4xl text-xl font-bold text-[#0c7054]">
                Where Flavor meets Comfort
              </h2>
              <p className="mt-2 md:text-sm text-xs text-gray-600">
                Arsalan Restaurant brings you authentic Mughlai & Indian
                delicacies, crafted with tradition and taste. From biryanis to
                kebabs, every dish is cooked with love.
              </p>
            </div>

            <div className="mt-3 bg-[#0c7054] border rounded-2xl md:px-4 px-2 md:py-3 py-2">
              <h1 className="text-lg font-bold text-white">Search your Cravings</h1>
              <div className="flex items-center rounded-xl bg-white mt-2">
                <FaSearch className="ml-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Chicken Biryani..."
                  className="w-full px-3 md:py-4 py-2 bg-transparent placeholder-gray-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Rating & Reviews */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="bg-white md:p-6 p-4 border border-[#0c7054] rounded-2xl shadow flex flex-col gap-3"
          >
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-4xl font-bold text-brown-700">4.6</h2>
              <div className="flex text-yellow-500 mt-1">
                {[...Array(4)].map((_, i) => (
                  <FaStar key={i} />
                ))}
                <FaStar className="text-gray-300" />
              </div>
            </div>

            {/* Dynamic Reviews */}
            <div className="text-xs text-gray-700 space-y-2">
              {reviews.map((review, idx) => (
                <div key={idx}>
                  <p>{review.text}</p>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    {review.name} | {review.date} |{" "}
                    {[...Array(review.stars)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-500" />
                    ))}
                  </span>
                </div>
              ))}
              <button className="text-xs text-brown-700 hover:underline">
                Show more →
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Header;


// import React from "react";
// import { FaStar, FaSearch } from "react-icons/fa";

// const Header = () => {
//   return (
//     <div className="mx-auto space-y-4">
//       <div className="w-full flex justify-center items-center h-20 bg-[#0c7054]">
//         <img className="h-20" src="https://arsalanrestaurants.com/wp-content/uploads/2024/09/Arsalan-gold-logo-01-01.png" />
//       </div>

//       <div className="max-w-6xl mx-auto md:space-y-4 space-y-2">
//         {/* Banner Images */}
//         <div className="w-full md:h-72 flex md:gap-2 gap-1 px-4">
//           <div className="w-3/5">
//             {/* Big Left Image */}
//             <img
//               src="https://media.istockphoto.com/id/922783734/photo/assorted-indian-recipes-food-various.jpg?s=612x612&w=0&k=20&c=p8DepvymWfC5j7c6En2UsQ6sUM794SQMwceeBW3yQ9M="
//               alt="Food 1"
//               className="h-full object-cover w-full md:rounded-l-4xl rounded-l-2xl"
//             />
//           </div>

//           <div className="h-full flex-1 flex-col">
//             <div className="w-full h-1/2">
//               {/* Top Right Large Image */}
//               <img
//                 src="https://static.vecteezy.com/system/resources/thumbnails/038/970/612/small/ai-generated-chicken-biryani-in-a-shiny-silver-bowl-spicy-curry-and-aromatic-flavors-authentic-indian-food-serving-fancy-food-in-a-restaurant-photo.jpg"
//                 alt="Food 2"
//                 className="w-full h-full w-full object-cover md:rounded-tr-4xl rounded-tr-2xl"
//               />
//             </div>

//             <div className="flex w-full h-1/2 md:pt-2 pt-1">
//               {/* Bottom Right Small Images */}
//               <img
//                 src="https://i.ytimg.com/vi/XVxGnN_7Htc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBtTnVFTI-L8F_vuE8rWcxWV8vBLw"
//                 alt="Food 3"
//                 className="h-full w-1/2 md:pr-1 object-cover"
//               />
//               <img
//                 src="https://bonmasala.com/wp-content/uploads/2022/06/chicken-reshmi-kabab-1.jpg"
//                 alt="Food 4"
//                 className="h-full w-1/2 pl-1 object-cover md:rounded-br-4xl rounded-br-2xl"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Info & Rating */}
//         <div className="flex md:flex-row flex-col-reverse md:space-x-4 gap-3 md:gap-0 px-4">
//           {/* Description */}
//           <div className="h-full bg-white">
//             <div className="py-6 px-4 border border-[#0c7054] rounded-2xl">
//               <h2 className="md:pb-4 md:pt-2 md:text-4xl text-xl font-bold text-[#0c7054]">
//                 Where Flavor meets Comfort
//               </h2>
//               <p className="mt-2 md:text-sm text-xs text-gray-600">
//                 Located in the downtown neighborhood of Mumbai, Shadab Restaurant
//                 and Bakery offers a variety of Indian cuisine, focusing on vibrant
//                 and hearty dishes. Guests can enjoy a selection of North Indian mains
//                 such … <span className="text-brown-700 font-semibold">More</span>
//               </p>
//             </div>
//             {/* Search */}
//             <div className="w-full flex flex-col mt-3 bg-[#0c7054] border rounded-2xl md:px-4 px-2 md:py-3 py-2">
//               <div className="py-1 text-white">
//                 <h1 className="text-lg font-bold py-2">Search for your Cravings</h1>
//               </div>
//               <div className="flex justify-center items-center rounded-xl bg-white">
//                 <FaSearch className="ml-4" />
//                 <input
//                   type="text"
//                   placeholder="Chicken Biryani..."
//                   className="w-full px-3 md:py-4 py-2 bg-transparent placeholder-black/40 outline-none"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Rating */}
//           <div className="bg-white md:p-6 p-4 border border-[#0c7054] rounded-2xl shadow flex md:flex-col items-center gap-2">
//             <div className="flex flex-col justify-center items-center">
//               <h2 className="text-4xl font-bold text-brown-700">4.6</h2>
//               <div className="flex text-yellow-500 mt-1">
//                 {[...Array(4)].map((_, i) => (
//                   <FaStar key={i} />
//                 ))}
//                 <FaStar className="text-gray-800" /> {/* half star */}
//               </div>
//             </div>
//             <div className="w-full flex flex-col items-end md:mt-3 text-xs text-gray-700 space-y-1">
//               <p>
//                 "Food tastes great! Everything I’ve ordered has been so good."
//                 <br />
//                 <span className="text-xs text-gray-500 flex items-center">Wasim A. | 26/05/2024 |  {[...Array(4)].map((_, i) => (<FaStar key={i} />))}</span>
//               </p>
//               <p>
//                 "Tried Special keema naan, Afghani chicken, n rolls. It's a tiny gem of a place."
//                 <br />
//                 <span className="text-xs text-gray-500 flex items-center">Asif I. | 02/01/2025 | {[...Array(4)].map((_, i) => (<FaStar key={i} />))}</span>
//               </p>
//               <p className="hidden md:block">
//                 "Chicken biryani is delicious!! The best one in town, literally must try also try refreshments."
//                 <br />
//                 <span className="text-xs text-gray-500 flex items-center">A.M. Khan | 17/11/2024 | {[...Array(4)].map((_, i) => (<FaStar key={i} />))}</span>
//               </p>
//               <button className="md:mt-3 text-xs text-brown-700 hover:underline">
//                 Show more →
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;
