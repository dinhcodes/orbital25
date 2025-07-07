'use client'

import React, { useState } from 'react';
import { ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface CategoriesProps {
  categories: string[];
  activeCategory?: string;
  onCategorySelect: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({
  categories,
  activeCategory,
  onCategorySelect, // ✅ Destructured here
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasMore = categories.length > 3;
  const handleCategoryClick = (category: string) => {
    // Insert filtering logic here
    if (activeCategory === category) {
    onCategorySelect(""); // Deselect if clicked again
  } else {
    onCategorySelect(category); // Select new category
  }
};

  return (
    <>
      <div className="">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-base md:text-lg font-semibold text-gray-200">Categories</h3>
          {hasMore && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-xs md:text-sm text-blue-500 hover:text-blue-600 cursor-pointer flex items-center gap-1 font-medium"
            >
              SEE ALL
              <ChevronRightIcon className="w-3 h-3" />
            </button>
          )}
        </div>

        <div className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm whitespace-nowrap rounded-full border transition-colors ${
                activeCategory === category 
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setIsModalOpen(false)}>
          <div 
            className="bg-white rounded-lg max-w-md w-full max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-black">All Categories</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-autoflex-1">
              <div className="grid grid-cols-2 gap-2 items-center justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      handleCategoryClick(category);
                      setIsModalOpen(false);
                    }}
                    className="p-3 text-sm text-center rounded-lg border border-gray-400 text-black hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Categories;