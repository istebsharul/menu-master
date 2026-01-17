import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  addCategory,
  updateCategory,
  deleteCategory,
  toggleMenuAvailability,
  toggleMenuAvailabilityOptimistic,
} from "../../redux/slices/menuSlice";

import MenuHeader from "./MenuHeader";
import CategoryFilter from "./CategoryFilter";
import SortActions from './SortAction';
import MenuItemCard from "./MenuItemCard";
import MenuItemEditor from "./MenuItemEditor";
import MenuItemListView from "./MenuItemListView";
import MenuItemEditorListView from "./MenuItemEditorListView";
import AddNewDropdown from "./AddNewDropdown";
import ManageCategoryModal from "./ManageCategoryModal";

const Menu = () => {
  const dispatch = useDispatch();
  const { categories, menuItems, loading, error } = useSelector(
    (state) => state.menu
  );

  const [view, setView] = useState('grid');
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTags, setActiveTags] = useState([]); // array instead of string
  const [availability, setAvailability] = useState({});
  const [sortBy, setSortBy] = useState("default");
  const [openCategoryModal, setOpenCategoryModal] = useState(false);

  // Editing state
  const [editingId, setEditingId] = useState(null);
  const [isNewItem, setIsNewItem] = useState(false);
  const [editRow, setEditRow] = useState({
    categoryId: "",
    name: "",
    price: "",
    tags: [],
    description: "",
    imageUrl: "",
    available: true,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchMenuItems());
  }, [dispatch]);

  useEffect(() => {
    if (menuItems) {
      setAvailability(
        Object.fromEntries(menuItems.map((item) => [item._id, item.available]))
      );
      console.log(menuItems);
    }
  }, [menuItems]);

  // Frontend validation function
  const validateForm = () => {
    const newErrors = {};

    if (!editRow.name?.trim()) {
      newErrors.name = true;
    }
    if (!editRow.categoryId) {
      newErrors.categoryId = true;
    }
    if (!editRow.price) {
      newErrors.price = true;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // const toggleAvailability = (id, item) => {
  //   dispatch(
  //     updateMenuItem({
  //       id,
  //       updatedData: { ...item, available: !item.available },
  //     })
  //   );
  // };
  const toggleAvailability = (id, item) => {
    // ⚡ Optimistic update
    dispatch(toggleMenuAvailabilityOptimistic(id));

    // 🔄 Backend sync
    dispatch(
      toggleMenuAvailability({
        id,
        available: !item.available,
      })
    )
      .unwrap()
      .catch(() => {
        // 🔁 Rollback if API fails
        dispatch(toggleMenuAvailabilityOptimistic(id));
      });
  };

  const handleSaveItem = () => {
    const isValid = validateForm();

    if (!isValid) {
      toast.error("Category, name and price are required");
      return; //  backend hit stop
    }

    const formData = new FormData();

    console.log(editRow);
    formData.append("name", editRow.name);
    formData.append("price", editRow.price);
    formData.append("description", editRow.description);
    formData.append("categoryId", editRow.categoryId);
    formData.append("available", editRow.available);
    formData.append("tags", editRow.tags);

    console.log(formData);

    if (editRow.imageUrl instanceof File) {
      formData.append("file", editRow.imageUrl);
    }

    if (isNewItem) {
      dispatch(addMenuItem(formData));
      console.log("New Item", formData);
    } else {
      console.log(formData);
      dispatch(updateMenuItem({ id: editingId, updatedData: formData }));
    }

    resetEditState();
  };

  const handleCancelEdit = () => resetEditState();

  const handleEdit = (item) => {
    console.log(item._id);
    setEditingId(item._id);
    setIsNewItem(false);
    setEditRow({
      categoryId: item.categoryId,
      name: item.name,
      price: item.price,
      tags: item.tags,
      description: item.description,
      imageUrl: item.imageUrl,
      available: item.available,
    });
  };

  const handleAddNewItem = () => {
    if (editingId) return;
    setEditingId("new");
    setIsNewItem(true);
    setEditRow({
      categoryId: "",
      name: "",
      price: "",
      description: "",
      imageUrl: "",
      available: true,
    });
  };

  const resetEditState = () => {
    setEditingId(null);
    setIsNewItem(false);
    setEditRow({
      categoryId: "",
      name: "",
      price: "",
      description: "",
      imageUrl: "",
      available: true,
    });
    setPreviewImage(null);
  };

  const handleDeleteItem = (item) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${item.name}"?`
    );
    if (confirmDelete) {
      dispatch(deleteMenuItem(item._id));
    }
  };


  // Sorting logic
  const sortedItems = [...menuItems].sort((a, b) => {
    if (sortBy === "price_low_high") return a.price - b.price;
    if (sortBy === "price_high_low") return b.price - a.price;
    if (sortBy === "name_asc") return a.name.localeCompare(b.name);
    if (sortBy === "name_desc") return b.name.localeCompare(a.name);
    return 0;
  });

  const filteredItems =
    activeCategory === "All"
      ? sortedItems
      : sortedItems.filter((item) => item.categoryId === activeCategory);

  return (
    <div className="w-full shadow-inner bg-gray-50 min-h-screen-[14px]">
      {/* Header */}
      <MenuHeader view={view} setView={setView} />

      {/* Categories + Sort */}
      <div className="px-2 flex justify-between items-center text-gray-600">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <div className="flex justify-between items-center gap-4">
          <SortActions
            sortBy={sortBy}
            setSortBy={setSortBy}
            handleAddNewItem={handleAddNewItem}
          />
          {/* <button
            onClick={handleAddNewItem}
            className="px-4 py-1 border border-[#0c7054] text-[#0c7054] rounded-lg"
          >
            + Add new
          </button> */}
          <AddNewDropdown
            onAddItem={handleAddNewItem}
            onAddCategory={() => setOpenCategoryModal(true)}
          />
          <ManageCategoryModal
            isOpen={openCategoryModal}
            onClose={() => setOpenCategoryModal(false)}
            categories={categories}
            onCreate={(data) => dispatch(addCategory(data))}
            onUpdate={(data) => dispatch(updateCategory(data))}
            onDelete={(id) => dispatch(deleteCategory(id))}
          />
        </div>
      </div>

      {/* Menu Items */}
      <div className={`w-full md:p-2 p-3 ${view == 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2' : 'space-y-2'}`}>

        {/* Add new item form */}
        {view === "grid" && isNewItem && editingId === "new" && (
          <MenuItemEditor
            editRow={editRow}
            categories={categories}
            setEditRow={setEditRow}
            handleSaveItem={handleSaveItem}
            handleCancelEdit={handleCancelEdit}
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
            errors={errors}
          />
        )}

        {/* Add new item form */}
        {view === "list" && isNewItem && editingId === "new" && (
          <MenuItemEditorListView
            editRow={editRow}
            categories={categories}
            setEditRow={setEditRow}
            handleSaveItem={handleSaveItem}
            handleCancelEdit={handleCancelEdit}
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
            errors={errors}
          />
        )}

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredItems.length === 0 ? (
          <p className="text-gray-500">No items found</p>
        ) : (
          filteredItems.map((item) => {
            const isEditing = editingId === item._id;
            return view === 'list' ? (
              <div key={item._id} className="h-fit">
                {/* List view component goes here */}
                {isEditing ? (
                  <MenuItemEditorListView
                    editRow={editRow}
                    categories={categories}
                    setEditRow={setEditRow}
                    handleSaveItem={handleSaveItem}
                    handleCancelEdit={handleCancelEdit}
                    previewImage={previewImage}
                    setPreviewImage={setPreviewImage}
                  />
                ) : (
                  <MenuItemListView
                    item={item}
                    categories={categories}
                    availability={availability[item._id]}
                    onEdit={() => handleEdit(item)}
                    onDelete={() => handleDeleteItem(item)}
                    onToggle={() => toggleAvailability(item._id, item)}
                  />
                )}
              </div>

            ) : (
              <div key={item._id} className="h-fit">
                {isEditing ? (
                  <MenuItemEditor
                    editRow={editRow}
                    categories={categories}
                    setEditRow={setEditRow}
                    handleSaveItem={handleSaveItem}
                    handleCancelEdit={handleCancelEdit}
                    previewImage={previewImage}
                    setPreviewImage={setPreviewImage}
                  />
                ) : (
                  <MenuItemCard
                    item={item}
                    categories={categories}
                    availability={availability[item._id]}
                    onEdit={() => handleEdit(item)}
                    onDelete={() => handleDeleteItem(item)}
                    onToggle={() => toggleAvailability(item._id, item)}
                  />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Menu;