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
      </div>
    </div>
  );
};

export default Header;