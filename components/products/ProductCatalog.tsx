"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "./ProductCard";
import { ProductFilter } from "./ProductFilter";
import { Button } from "@/components/ui/Button";

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

interface ProductCatalogProps {
  categories: CategoryGroup[];
}

export function ProductCatalog({ categories = [] }: ProductCatalogProps) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(12); // Items per page load

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    setVisibleCount(12);
  }, [selectedCategory, searchQuery]);

  const allProducts = useMemo(() => {
    return categories.flatMap((catGroup) => catGroup.products || []);
  }, [categories]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      const matchesCategory =
        selectedCategory === "All Categories" || p.category === selectedCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.spec && p.spec.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [allProducts, selectedCategory, searchQuery]);

  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const hasMore = visibleCount < filteredProducts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  return (
    <div className="w-full min-h-screen bg-white pt-16 lg:pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Top Header / Stats Bar */}
        <div className="border-b border-gray-200 pb-4 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-[#011842] tracking-tight mb-2">
              Export Product Catalog
            </h1>
            <p className="text-gray-600 text-sm font-medium">
              Explore our range of premium certified goods. Select a category below or search.
            </p>
          </div>
          <div className="text-right">
            <span className="text-[15px] font-bold text-[#011842]">
              Showing {displayedProducts.length} of {filteredProducts.length} export lines
            </span>
          </div>
        </div>

        {/* Catalog Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* Left Panel: Sidebar Filters */}
          <ProductFilter
            categories={categories}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />

          {/* Right Panel: Products Grid & Load More */}
          <div className="lg:col-span-4 space-y-12">
            {filteredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
                  {displayedProducts.map((p) => (
                    <ProductCard
                      key={p.slug}
                      product={p}
                    />
                  ))}
                </div>

                {hasMore && (
                  <div className="flex justify-center pt-6 border-t border-gray-100">
                    <Button
                      onClick={handleLoadMore}
                      variant="outline"
                      className="px-8 py-3 text-xs uppercase tracking-wider font-bold rounded-full"
                    >
                      Load More Products ({filteredProducts.length - displayedProducts.length} remaining)
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 border border-dashed border-gray-300 flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4 animate-bounce">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-[#011842] mb-1">
                  No products found
                </h3>
                <p className="text-xs text-gray-500 max-w-xs mb-4 leading-relaxed">
                  We couldn't find any products matching your search criteria. Try adjusting your filters or search keywords.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All Categories");
                    setSearchQuery("");
                  }}
                  className="text-brand-accent font-bold text-xs uppercase tracking-wider hover:underline"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}