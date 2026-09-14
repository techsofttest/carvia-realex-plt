"use client";

import React, { useState } from "react";

interface CategoryDetails {
  title: string;
  slug?: string;
  content?: string;
}

interface CategoryGroup {
  category?: CategoryDetails;
}

interface ProductFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string; // expects slug (e.g. "all" or "basmati-rice")
  onCategorySelect: (slug: string) => void;
  categories: CategoryGroup[];
}

export function ProductFilter({
  categories = [],
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
}: ProductFilterProps) {
  const [showAll, setShowAll] = useState(false);

  // Extract valid category pairs ({ title, slug })
  const categoryList = categories
    .map((c) => c.category)
    .filter((cat): cat is CategoryDetails => Boolean(cat && cat.title));

  const allCategories = [
    { title: "All Categories", slug: "all-categories" },
    ...categoryList.map((cat) => ({
      title: cat.title,
      slug: cat.slug || cat.title.toLowerCase().replace(/\s+/g, "-"),
    })),
  ];

  const displayedCategories = showAll
    ? allCategories
    : allCategories.slice(0, 6);

  const hasMoreCategories = allCategories.length > 6;

  return (
    <div className="lg:col-span-1 space-y-8 lg:sticky lg:top-24">
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

      {/* Categories List */}
      <div>
        <label className="block text-sm font-bold tracking-wider text-[#011842] mb-3">
          Categories
        </label>
        <ul className="flex flex-wrap lg:flex-col gap-1">
         {displayedCategories.map((cat) => {
  const isSelected = selectedCategory === cat.slug;

  return (
    <li
      key={cat.slug}
      className="w-full border-b border-gray-200 last:border-b-0 py-0.5"
    >
      <label className="flex items-center gap-3 w-full text-left py-1.5 px-2 text-sm font-semibold tracking-wide transition-all rounded-[4px] cursor-pointer hover:bg-gray-50 group">

        <input
          type="radio"
          name="category-filter"
          checked={isSelected}
          onChange={() => onCategorySelect(cat.slug)}
          className="w-4 h-4 rounded-full border-gray-300 text-[#011842] focus:ring-[#011842] accent-[#011842] cursor-pointer"
        />

        <span
          className={`transition-colors ${
            isSelected
              ? "text-[#011842] font-bold"
              : "text-gray-900 group-hover:text-[#011842]"
          }`}
        >
          {cat.title}
        </span>

      </label>
    </li>
  );
})}
        </ul>

        {/* Toggle Button */}
        {hasMoreCategories && (
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="mt-3 flex items-center gap-1.5 text-xs font-bold text-[#011842] hover:underline px-2 py-1"
          >
            <span>
              {showAll
                ? "See Less"
                : `See More (${allCategories.length - 6} more)`}
            </span>
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                showAll ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}