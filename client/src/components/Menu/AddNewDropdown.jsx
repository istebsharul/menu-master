import React ,{ useState } from "react";

const AddNewDropdown = ({ onAddItem, onAddCategory }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 border border-[#0c7054] text-[#0c7054] rounded-md hover:bg-[#0c7054] hover:text-white transition"
      >
        + Add new
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
          <button
            onClick={() => {
              onAddItem();
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Add Item
          </button>

          <button
            onClick={() => {
              onAddCategory();
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Add Category
          </button>
        </div>
      )}
    </div>
  );
};

export default AddNewDropdown;