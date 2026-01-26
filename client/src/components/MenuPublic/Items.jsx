import React, { useState } from "react";
import Item from "./Item"; // FoodCard component
import CategoriesFilter from "./CategoriesFilter";
import FloatingView from "./FloatingView";

const dummyItems = [
  {  
    image:
      "https://t4.ftcdn.net/jpg/07/75/11/61/360_F_775116148_auR8R1TmdkuB3wKhCd1DRKrPDbebnVXN.jpg",
    title: "Spicy Mexican Tacos",
    description:
      "Crispy corn tortillas filled with seasoned meat, fresh veggies, and tangy salsa for the perfect Mexican street-style taste.",
    badge: "",
    originalPrice: 9.99,
    discountedPrice: 7.99,
    rating: 4.5,  
    reviews: 60,  
    isTrending: false,
  }, 
  {
    image:
      "https://rppizzeria.com/web/image/product.template/75/image_1024?unique=0e417c7",
    title: "Cheese Burst Pizza",
    description:
      "Deliciously baked pizza loaded with mozzarella and stuffed crust cheese that oozes with every bite.",
    badge: "Best Seller",
    originalPrice: 15.99,
    discountedPrice: 12.99,
    rating: 4.8,
    reviews: 120,
    isTrending: true,
  },
  {
    image:
      "https://www.cubesnjuliennes.com/wp-content/uploads/2022/12/Tandoori-Chicken-Recipe.jpg",
    title: "Masala Tandoori",
    description:
      "Juicy chicken marinated in rich Indian spices, roasted to perfection in a traditional clay oven.",
    badge: "Hot Deal",
    originalPrice: 18.99,
    discountedPrice: 14.99,
    rating: 4.7,
    reviews: 150,
    isTrending: true,
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFDzaduscbVLnvPZJoRYN4ewjEPAUwWV_l3g&s",
    title: "Milk Cake",
    description:
      "Traditional Indian sweet made with thickened milk, sugar, and a hint of cardamom for a melt-in-mouth delight.",
    badge: "New",
    originalPrice: 9.99,
    discountedPrice: 7.49,
    rating: 4.5,
    reviews: 85,
    isTrending: false,
  },
  {
    image:
      "https://www.indianveggiedelight.com/wp-content/uploads/2019/07/veg-pulao-featured.jpg",
    title: "Veg Pulao",
    description:
      "Aromatic basmati rice cooked with fresh vegetables and Indian spices for a wholesome and light meal.",
    badge: "",
    originalPrice: 12.99,
    discountedPrice: 10.49,
    rating: 4.3,
    reviews: 65,
    isTrending: false,
  },
  {
    image:
      "https://www.cubesnjuliennes.com/wp-content/uploads/2020/07/Chicken-Biryani-Recipe.jpg",
    title: "Hyderabadi Biryani",
    description:
      "Fragrant long-grain rice layered with marinated chicken, caramelized onions, and saffron for a royal feast.",
    badge: "Most Liked",
    originalPrice: 20.99,
    discountedPrice: 16.99,
    rating: 4.9,
    reviews: 200,
    isTrending: true,
  },
];

// {
//     "_id": "688e39f5ae83d1356edf078e",
//     "userId": "688defe98c32930a70f0e87b",
//     "categoryId": "688f3e227f623c399b96e01e",
//     "name": "Paneer Tikka",
//     "description": "Paneer Tikka, also known as Paneer Soola or Chhena Soola, is a beloved Indian appetizer and snack. ",
//     "price": 200,
//     "imageUrl": "https://res.cloudinary.com/dllddjxkf/image/upload/v1755962447/menu-items/jlhqsfwlilxswt89il1m.jpg",
//     "available": true,
//     "createdAt": "2025-08-02T16:16:53.408Z",
//     "__v": 0
// }

const Items = ({items}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = (item) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 p-4">
        {items.map((item, index) => (
          <Item key={index} item={item} onSelect={handleSelect} />
        ))}
      </div>
        
      {/* Only ONE floating view */}
      <FloatingView
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        item={selectedItem}
      />  
    </>
  );
};

export default Items;