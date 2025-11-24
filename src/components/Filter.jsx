/**

 *
 * @component
 * @param {Object} props - Component props.
 * @param {Function} props.onFilterChange - Callback function triggered when filters are applied.
 * @param {string} [props.className] - Optional class name for additional styling.
 * @returns {JSX.Element} The filter sidebar with options for filtering and sorting products.
 */
import { useState } from "react";

export const FilterSidebar = ({ onFilterChange, className }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);

  const categoryMapping = {
    Tea: 1,
    Mocktail: 2,
    Smoothies: 3,
    "Milk Based": 4,
    Snacks: 5,
  };

  const toggleCategory = (categoryName) => {
    const categoryId = categoryMapping[categoryName];
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSortChange = (value) => setSelectedSort(value);
  const handleApplyFilter = () => {
    onFilterChange({
      search: searchTerm,
      category: selectedCategories,
      sort: selectedSort,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });
  };

  const handleResetFilter = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setSelectedSort("");
    setPriceRange([0, 100000]);

    onFilterChange({
      search: "",
      category: [],
      sort: "",
      minPrice: 0,
      maxPrice: 0,
    });
  };

  return (
    <div className={className}>
      <div className="bg-[#0F172A] text-white rounded-2xl p-6 w-[280px]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Filter</h3>
          <button
            className="text-sm text-white/70 hover:text-[#3B82F6] transition-colors"
            onClick={handleResetFilter}
          >
            Reset Filter
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-2">Search</label>
          <input
            type="text"
            placeholder="Search Your Product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white text-black rounded-md px-4 py-2 text-sm outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-3">Category</label>
          <div className="flex flex-col gap-3">
            {Object.keys(categoryMapping).map((categoryName) => (
              <label key={categoryName} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(categoryMapping[categoryName])}
                  onChange={() => toggleCategory(categoryName)}
                  className="w-4 h-4 accent-[#3B82F6]"
                />
                <span className="text-sm">{categoryName}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-3">Sort By</label>
          <div className="flex flex-col gap-3">
            {[
              { label: "Terbaru", value: "" },
              { label: "Terlama", value: "oldest" },
              { label: "Termurah", value: "price_low" },
              { label: "Termahal", value: "price_high" },
            ].map((sort) => (
              <label key={sort.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sort"
                  checked={selectedSort === sort.value}
                  onChange={() => handleSortChange(sort.value)}
                  className="w-4 h-4 accent-[#3B82F6]"
                />
                <span className="text-sm">{sort.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-3">Range Price</label>
          <div className="flex flex-col gap-2">
            <input
              type="range"
              min="0"
              max="100000"
              step="1000"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
              className="w-full h-2 bg-gray-700 rounded-lg cursor-pointer accent-[#3B82F6]"
            />
            <input
              type="range"
              min="0"
              max="100000"
              step="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-700 rounded-lg cursor-pointer accent-[#3B82F6]"
            />

            <div className="flex justify-between text-xs mt-1">
              <span>Idr {priceRange[0].toLocaleString()}</span>
              <span>Idr {priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleApplyFilter}
          className="w-full bg-[#3B82F6] text-white font-medium py-3 rounded-md hover:bg-[#2563EB] transition-colors"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};
