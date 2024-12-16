import React, { useState } from "react";
import { LayoutGrid, List } from "lucide-react";

function ShopFilter() {
  const [viewType, setViewType] = useState('grid');
  
return(
<div className="p-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl text-gray-600">Showing all 12 results</h2>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <span className="text-gray-600 text-lg">Views:</span>
          <button 
            className={`p-2 rounded ${viewType === 'grid' ? 'bg-gray-200' : 'bg-white'}`}
            onClick={() => setViewType('grid')}
          >
            <LayoutGrid size={20} />
          </button>
          <button 
            className={`p-2 rounded ${viewType === 'list' ? 'bg-gray-200' : 'bg-white'}`}
            onClick={() => setViewType('list')}
          >
            <List size={20} />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <select className="p-2 rounded border border-gray-300 min-w-[200px]">
            <option>Popularity</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Latest</option>
          </select>

          <button className="bg-[#23A6F0] text-white px-6 py-2 rounded">
            Filter
          </button>
        </div>
      </div>
    </div>
);}
export default ShopFilter;
