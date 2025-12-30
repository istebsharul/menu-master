import React, { useState } from "react";

const ManageCategoryModal = ({
  isOpen,
  onClose,
  categories,
  onCreate,
  onUpdate,
  onDelete,
}) => {
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [originalName, setOriginalName] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Manage Categories</h2>

        {/* Category List */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="flex items-center justify-between border rounded-md px-3 py-2"
            >
              {editingId === cat._id ? (
                <input
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="border rounded px-2 py-1 w-full mr-2"
                />
              ) : (
                <span className="text-sm">{cat.name}</span>
              )}

              <div className="flex gap-2 ml-2">
                {editingId === cat._id ? (
                  <>
                    <button
                      onClick={() => {
                        onUpdate({
                          id: cat._id,
                          updatedData: { name: editingName },
                        });
                        setEditingId(null);
                        setOriginalName("");
                      }}
                      className="text-green-600 text-sm"
                    >
                      Save
                    </button>

                    <button
                      onClick={() => {
                        setEditingName(originalName);
                        setEditingId(null);
                        setOriginalName("");
                      }}
                      className="text-gray-500 text-sm"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(cat._id);
                      setEditingName(cat.name);
                      setOriginalName(cat.name);
                    }}
                    className="text-blue-600 text-sm"
                  >
                    Edit
                  </button>
                )}


                <button
                  onClick={() => onDelete(cat._id)}
                  className="text-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Category */}
        <div className="mt-4 flex gap-2">
          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
            className="flex-1 border rounded-md px-3 py-2"
          />
          <button
            onClick={() => {
              if (!newCategory.trim()) return;
              onCreate({ "name": newCategory });
              setNewCategory("");
            }}

            className="px-4 py-2 bg-[#0c7054] text-white rounded-md"
          >
            Add
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageCategoryModal;