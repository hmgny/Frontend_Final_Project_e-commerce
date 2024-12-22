import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  setFilter,
  setSort,
} from "../store/actions/productActions";
import { LayoutGrid, List } from "lucide-react";

function ShopFilter() {
  const dispatch = useDispatch();
  const { category, filter, sort } = useSelector((state) => state.product);
  const [viewType, setViewType] = useState("grid");
  const [filterText, setFilterText] = useState("");

  const handleSort = (event) => {
    const newSort = event.target.value;
    dispatch(setSort(newSort));
  };

  const handleFilter = () => {
    const params = {
      ...(category && { category }),
      ...(filterText && { filter: filterText }),
      ...(sort && { sort }),
    };
    dispatch(fetchProducts(params));
  };

  return (
    <div className="p-12 sm:px-48 sm:flex sm:justify-between">
      <div className="text-center mb-8">
        <h2 className="text-2xl text-gray-600">Showing all results</h2>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 sm:gap-60">
        <div className="flex items-center gap-4">
          <span className="text-gray-600 text-lg">Views:</span>
          <button
            className={`p-2 rounded ${
              viewType === "grid" ? "bg-gray-200" : "bg-white"
            }`}
            onClick={() => setViewType("grid")}
          >
            <LayoutGrid size={20} />
          </button>
          <button
            className={`p-2 rounded ${
              viewType === "list" ? "bg-gray-200" : "bg-white"
            }`}
            onClick={() => setViewType("list")}
          >
            <List size={20} />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Filter products..."
            className="p-2 rounded border border-gray-300"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />

          <select
            className="p-2 rounded border border-gray-300 min-w-[200px]"
            value={sort}
            onChange={handleSort}
          >
            <option value="">Select sorting</option>
            <option value="price:asc">Price: Low to High</option>
            <option value="price:desc">Price: High to Low</option>
            <option value="rating:asc">Rating: Low to High</option>
            <option value="rating:desc">Rating: High to Low</option>
          </select>

          <button
            className="bg-[#23A6F0] text-white px-6 py-2 rounded"
            onClick={handleFilter}
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShopFilter;
