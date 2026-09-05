"use client";

import React from "react";

interface ProductItem {
  slug: string;
  category: string;
  image: string;
  name: string;
  spec: string;
  origin: string;
  packing: string;
}

interface CategoryGroup {
  category: string;
  products: ProductItem[];
}

interface ProductFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  categories: CategoryGroup[];
}

export function ProductFilter({
  categories = [],
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
}: ProductFilterProps) {
  const allCategories = ["All Categories", ...categories.map((c) => c.category)];

  return (
    <div className="lg:col-span-1 space-y-8 sticky top-24">
      {/* Search Input */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#011842] mb-3">
          Search Catalog
        </label>
        <div className="relative flex items-center">
          <svg
            className="absolute left-4 w-5 h-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="e.g. Basmati, Shrimp..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-11 pl-11 pr-4 text-sm border border-gray-300 placeholder-gray-500 focus:border-[#011842] focus:outline-none rounded-full text-[#011842]"
          />
        </div>
      </div>

      {/* Categories list */}
      <div>
        <label className="block text-sm font-bold tracking-wider text-[#011842] mb-3">
          Categories
        </label>
        <ul className="flex flex-wrap lg:flex-col gap-1">
          {allCategories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <li key={cat} className="w-full border-b border-gray-200 last:border-b-0 py-0.5">
                <label className="flex items-center gap-3 w-full text-left py-1.5 px-2 text-sm font-semibold tracking-wide transition-all rounded-[4px] cursor-pointer hover:bg-gray-50 group">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onCategorySelect(cat)}
                    className="w-4 h-4 rounded border-gray-300 text-[#011842] focus:ring-[#011842] accent-[#011842] cursor-pointer"
                  />
                  <span
                    className={`transition-colors ${
                      isSelected
                        ? "text-[#011842] font-bold"
                        : "text-gray-900 group-hover:text-[#011842]"
                    }`}
                  >
                    {cat}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}