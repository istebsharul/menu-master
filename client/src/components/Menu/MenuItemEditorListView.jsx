import React from "react";
import { FaUpload, FaSave } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const TAG_OPTIONS = ["Best Seller", "Veg", "Non Veg", "Spicy", "Chef's Special"];

const MenuItemEditorListView = ({
  editRow,
  categories,
  setEditRow,
  handleSaveItem,
  handleCancelEdit,
  previewImage,
  setPreviewImage,
  errors,
}) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-2 flex flex-row gap-4 items-center shadow-sm">
      {/* Image Upload */}
      <div className="w-20 h-20 relative rounded overflow-hidden border flex-shrink-0">
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
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        {previewImage ? (
          <img src={previewImage} alt="preview" className="w-full h-full object-cover" />
        ) : editRow.imageUrl ? (
          <img src={editRow.imageUrl} alt={editRow.name} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col justify-center items-center gap-1 bg-gray-100/50 text-xs">
            <FaUpload className="text-green-400 text-xl" />
            Upload
          </div>
        )}
      </div>

      {/* Name & Category */}
      <div className="flex-1 flex flex-col gap-1">
        <input
          type="text"
          value={editRow.name}
          onChange={(e) => setEditRow((p) => ({ ...p, name: e.target.value }))}
          className={`border rounded px-2 py-1 text-sm ${
            errors?.name ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Item name"
        />
        <div className="flex gap-1">
          <select
            value={editRow.categoryId}
            onChange={(e) => setEditRow((p) => ({ ...p, categoryId: e.target.value }))}
            className={`h-min border rounded px-2 py-1 text-sm ${
            errors?.name ? "border-red-500" : "border-gray-300"
          }`}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
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
        </div>
      </div>

      {/* Description */}
      <div className="w-1/2">
        <textarea
          value={editRow.description || ""}
          onChange={(e) => setEditRow((p) => ({ ...p, description: e.target.value }))}
          className="border rounded px-2 py-1 text-sm w-full resize-none"
          rows={2}
          placeholder="Description"
        />
      </div>

      {/* Price */}
      <div className="w-24">
        <input
          type="number"
          value={editRow.price}
          onChange={(e) => setEditRow((p) => ({ ...p, price: e.target.value }))}
          className={`border rounded px-2 py-1 text-sm w-full ${
            errors?.price ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Price"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pr-3">
        <button
          onClick={handleCancelEdit}
          className="text-gray-600 hover:text-gray-800"
        >
          <RxCross2 className="text-xl" />
        </button>
        <button
          onClick={handleSaveItem}
          className="text-green-600 hover:text-green-800"
        >
          <FaSave className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default MenuItemEditorListView;