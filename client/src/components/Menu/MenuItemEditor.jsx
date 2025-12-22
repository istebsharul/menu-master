import React, { useEffect } from "react";
import { FaUpload, FaSave } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const TAG_OPTIONS = ["Best Seller", "Veg", "Non Veg", "Spicy", "Chef's Special"];

const MenuItemEditor = ({
  editRow,
  categories,
  setEditRow,
  handleSaveItem,
  handleCancelEdit,
  previewImage,
  setPreviewImage,
  errors,
}) => {
  // Toggle tag selection
  const handleTagChange = (tag) => {
    setEditRow((prev) => {
      const currentTags = prev.tags || [];
      if (currentTags.includes(tag)) {
        // Remove tag
        return { ...prev, tags: currentTags.filter((t) => t !== tag) };
      } else {
        // Add tag
        return { ...prev, tags: [...currentTags, tag] };
      }
    });
  };

  useEffect(() => {
    console.log(editRow);
  }, [editRow]);

  return (
    <div className="max-w-lg w-full bg-white rounded-xl border border-gray-200 p-4 flex gap-4 items-start shadow-inner">
      {/* Image Upload / Preview */}
      <div className="w-1/3 h-full relative">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setEditRow((prev) => ({ ...prev, imageUrl: file }));
              setPreviewImage(URL.createObjectURL(file));
            }
          }}
          className="absolute opacity-0 flex justify-center items-center mb-2 bg-white/20 w-full h-full z-10"
        />
        {previewImage ? (
          <img
            src={previewImage}
            alt="preview"
            className="h-32 w-full object-cover rounded"
          />
        ) : editRow.imageUrl ? (
          <div className="z-[-1]">
            <img
              src={editRow.imageUrl}
              alt={editRow.name}
              className="h-32 w-full object-cover rounded"
            />
            <div className="flex flex-col absolute inset-0 w-full h-full flex justify-center items-center bg-gray-100/50 gap-2">
              <FaUpload className="text-green-400 text-4xl z-100" />
              <p className="text-xs">Click to Upload</p>
            </div>
          </div>
        ) : (
          <div className="w-full h-full absolute inset-0 flex flex-col justify-center items-center gap-2 bg-gray-100/50">
            <FaUpload className="text-green-400 text-4xl z-100" />
            <p className="text-xs">Click to Upload</p>
          </div>
        )}
      </div>

      {/* Editable Fields */}
      <div className="w-full flex flex-col flex-1 justify-between">
        <div className="flex flex-col gap-2">

        {/* Tags - multiple checkboxes */}
          <div className="flex flex-wrap gap-1">
            {TAG_OPTIONS.map((tag) => (
              <label
                key={tag}
                onClick={() => handleTagChange(tag)}
                className={`flex items-center gap-1 text-xs border px-2 py-0.2 rounded-full cursor-pointer 
    ${editRow?.tags?.includes(tag) ? 'bg-orange-400 text-white' : ''}
  `}
              >
                {tag}
              </label>
            ))}
          </div>

          <div className="w-full flex justify-center items-center gap-2">
            <input
              type="text"
              value={editRow.name}
              onChange={(e) =>
                setEditRow((p) => ({ ...p, name: e.target.value }))
              }
              className={`w-full border px-1 rounded text-sm ${
                errors?.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Name"
            />
            {/* Actions */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  onClick={handleSaveItem}
                  className="text-green-600 hover:underline"
                >
                  <FaSave />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="text-gray-600 hover:underline"
                >
                  <RxCross2 />
                </button>
              </div>
            </div>
          </div>

          {/* Category dropdown */}
          <select
            value={editRow.categoryId}
            onChange={(e) =>
              setEditRow((p) => ({ ...p, categoryId: e.target.value }))
            }
            className={`border rounded w-min p-0.5 text-sm ${
              errors?.categoryId ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <textarea
            value={editRow.description || ""}
            onChange={(e) =>
              setEditRow((p) => ({ ...p, description: e.target.value }))
            }
            className="border p-1 rounded w-full text-xs"
            placeholder="Description"
            rows={2}
          />
          <input
            type="number"
            value={editRow.price}
            onChange={(e) =>
              setEditRow((p) => ({ ...p, price: e.target.value }))
            }
            className={`text-sm border p-1 rounded w-fit ${
              errors?.price ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Price"
          />
        </div>
      </div>
    </div>
  );
};

export default MenuItemEditor;