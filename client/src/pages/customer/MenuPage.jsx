import React, { useState, useEffect } from "react";
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
  
  const { restaurant, categories, items, loading, error } = useSelector(
    (state) => state.publicMenu
  );

  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(()=>{
    console.log(categories);
  },[categories]);

  useEffect(() => {
    if (slug) {
      dispatch(fetchPublicMenu(slug));
    }
  }, [slug, dispatch]);

  // Log when restaurant changes
  useEffect(() => {
    console.log("Restaurant updated categories:", categories);
    console.log("Hlwkn",category);
  }, [category, categories]);

  useEffect(()=>{
    if(category){
      const filteredItems = items.filter((item) => item?.categoryId?.name === category);
      setFilteredItems(filteredItems);
    }else{
      setFilteredItems(items);
    }
  },[category,items]);

  if (loading) return <p className="text-center p-4">Loading menu...</p>;
  if (error) return <p className="text-center p-4 text-red-500">{error}</p>;

  return (
    <>
      {/* <Header logo={restaurant?.logo} /> */}
      <Header logo={restaurant?.logo} />
      <FeaturedItems items={items} />
      <CategoriesFilter categories={categories} setCategory={setCategory}/>
      <Items items={filteredItems} />
    </>
  );
};

export default MenuPage;
