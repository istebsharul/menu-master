import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicMenu } from "../../redux/slices/publicMenuSlice";

// import Header from "../../components/MenuPublic/Header";
import Header from "../../components/MenuPublic/Header2";
import FeaturedItems from "../../components/MenuPublic/FeaturesItems";
import CategoriesFilter from "../../components/MenuPublic/CategoriesFilter";
import Items from "../../components/MenuPublic/Items";

const MenuPage = () => { 
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [category, setCategory] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  const { restaurant, categories, items, loading, error } = useSelector(
    (state) => state.publicMenu
  );


  const [filteredItems, setFilteredItems] = useState(items);
  const [bestSeller, setBestSeller] = useState();

  const bestSellerCarouselData = useMemo(() => {
    return items
      .filter(dish => dish.tags?.includes("Best Seller"))
      .map(dish => ({
        id: dish._id,
        name: dish.name,
        imageUrl: dish.imageUrl,
      }));
  }, [items]);

  //  FOR Dynamic TITLE
  // useEffect(() => {
  //   if (restaurant?.businessName) {
  //     document.title = restaurant.businessName;
  //   } else {
  //     document.title = "Menu Master";
  //   }
  // }, [restaurant]);

  useEffect(() => {
    if (restaurant?.businessName) {
      setTimeout(() => {
        document.title = restaurant.businessName;
      }, 0);
    }
  }, [restaurant]);




  // useEffect(() => {
  //   document.title = restaurant?.name || "Menu Master";
  // }, [restaurant]); 

  useEffect(() => {
    setBestSeller(bestSellerCarouselData);

  }, [bestSellerCarouselData]);

  useEffect(() => {
    if (slug) {
      dispatch(fetchPublicMenu(slug));
    }
  }, [slug, dispatch]);

  useEffect(() => {
    let result = items;

    // Category filter
    if (category) {
      result = result.filter(
        (item) => item?.categoryId?.name === category
      );
    }

    // Tags filter (MULTI)
    if (selectedTags.length > 0) {
      result = result.filter((item) =>
        selectedTags.every((tag) => item?.tags?.includes(tag))
      );
    }

    setFilteredItems(result);
  }, [category, selectedTags, items]);


  if (loading) return <p className="text-center p-4">Loading menu...</p>;
  if (error) return <p className="text-center p-4 text-red-500">{error}</p>;

  return (
    <>
      {/* <Header logo={restaurant?.logo} /> */}
      <Header logo={restaurant?.logo} gallery={restaurant?.gallery} />
      <FeaturedItems featuredItems={bestSeller} />
      <CategoriesFilter
        categories={categories}
        setCategory={setCategory}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
      <Items items={filteredItems} />
    </>
  );
};

export default MenuPage;
