'use client'

import React, { useState } from 'react';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
}

interface SearchBarProps {
  filters: FilterOption[];
  onSearch?: (query: string) => void;
  onFiltersChange?: (filters: FilterOption[]) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  filters, 
  onSearch, 
  onFiltersChange, 
  placeholder = "Search for" 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<FilterOption[]>(filters);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleFilterToggle = (filterId: string) => {
    const updatedFilters = localFilters.map(filter =>
      filter.id === filterId ? { ...filter, checked: !filter.checked } : filter
    );
    setLocalFilters(updatedFilters);
    onFiltersChange?.(updatedFilters);
  };

  const toggleFilterDropdown = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Bar */}
      <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
        {/* Magnifying Glass Icon */}
        <div className="pl-3 pr-2">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>

        {/* Search Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder={placeholder}
          className="flex-1 py-3 px-2 text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none"
        />

        {/* Configuration Icon */}
        <button
          onClick={toggleFilterDropdown}
          className="mr-3 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <AdjustmentsHorizontalIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Filter Dropdown */}
      {isFilterOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Filters</h3>
            <div className="space-y-2">
              {localFilters.map((filter) => (
                <label
                  key={filter.id}
                  className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={filter.checked}
                    onChange={() => handleFilterToggle(filter.id)}
                    className="h-4 w-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{filter.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsFilterOpen(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;