import React from "react";

const SortActions = ({ sortBy, setSortBy }) => {
  return (
    <div className="flex items-center md:gap-4 gap-2">
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="md:w-32 w-24 py-1 rounded-lg text-gray-600"
      >
        <option value="default">Sort by</option>
        <option value="price_low_high">Price: Low to High</option>
        <option value="price_high_low">Price: High to Low</option>
        <option value="name_asc">Name: A → Z</option>
        <option value="name_desc">Name: Z → A</option>
      </select>
    </div>
  );
};

export default SortActions;