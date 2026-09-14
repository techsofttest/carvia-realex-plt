"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ProductCard } from "./ProductCard";
import { ProductBreadcrumb } from "./ProductBreadcrumb";
import { ProductFilter } from "./ProductFilter";
import { Button } from "@/components/ui/Button";

interface ProductItem {
  slug: string;
  subslug: string;
  category: string;
  image: string;
  name: string;
  spec: string;
  origin: string;
  packing: string;
}

interface CategoryDetails {
  title: string;
  slug?: string;
  content?: string;
  meta_title?: string;
  meta_key?: string;
  meta_desc?: string;
}

interface CategoryGroup {
  category?: CategoryDetails;
  products: ProductItem[];
}

interface DefaultSeo {
  meta_title: string;
  meta_key: string;
  meta_desc: string;
}

interface ProductCatalogProps {
  categories: CategoryGroup[];
  defaultSeo?: DefaultSeo;
  categorySlug?: string;
}

export function ProductCatalog({
  categories = [],
  defaultSeo,
  categorySlug,
}: ProductCatalogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryParam = searchParams.get("category");

  /*
   * IMPORTANT:
   * selectedCategory always contains the SLUG.
   *
   * Example:
   * "all"
   * "agriculture-food"
   * "seafood"
   * "handicrafts-home-decor"
   */
  const [selectedCategory, setSelectedCategory] = useState(
    categorySlug || "all"
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);

  /*
   * Create a proper category list.
   */
  const categoryList = useMemo(() => {
    return categories
      .map((group) => {
        if (!group.category?.title) {
          return null;
        }

        return {
          title: group.category.title,
          slug:
            group.category.slug ||
            group.category.title
              .toLowerCase()
              .trim()
              .replace(/&/g, "and")
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, ""),
        };
      })
      .filter(
        (
          category
        ): category is {
          title: string;
          slug: string;
        } => category !== null
      );
  }, [categories]);

  /*
   * Sync URL with selected category.
   *
   * Priority:
   * 1. ?category=...
   * 2. /products/agriculture-food
   * 3. all
   */
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
      return;
    }

    if (categorySlug) {
      const matchedCategory = categoryList.find(
        (category) => category.slug === categorySlug
      );

      if (matchedCategory) {
        setSelectedCategory(matchedCategory.slug);
        return;
      }
    }

    setSelectedCategory("all");
  }, [categoryParam, categorySlug, categoryList]);

  /*
   * Reset pagination when filter/search changes.
   */
  useEffect(() => {
    setVisibleCount(12);
  }, [selectedCategory, searchQuery]);

  /*
   * Current category.
   */
  const currentCategoryData = useMemo(() => {
    if (selectedCategory === "all") {
      return null;
    }

    const matchedGroup = categories.find((group) => {
      const slug =
        group.category?.slug ||
        group.category?.title
          ?.toLowerCase()
          .trim()
          .replace(/&/g, "and")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");

      return slug === selectedCategory;
    });

    return matchedGroup?.category || null;
  }, [categories, selectedCategory]);

  /*
   * SEO.
   */
  useEffect(() => {
    const title =
      currentCategoryData?.meta_title ||
      defaultSeo?.meta_title ||
      "Export Product Catalog";

    const description =
      currentCategoryData?.meta_desc ||
      defaultSeo?.meta_desc ||
      "";

    const keywords =
      currentCategoryData?.meta_key ||
      defaultSeo?.meta_key ||
      "";

    document.title = title;

    let descMeta = document.querySelector(
      'meta[name="description"]'
    );

    if (!descMeta) {
      descMeta = document.createElement("meta");
      descMeta.setAttribute("name", "description");
      document.head.appendChild(descMeta);
    }

    descMeta.setAttribute("content", description);

    let keyMeta = document.querySelector(
      'meta[name="keywords"]'
    );

    if (!keyMeta) {
      keyMeta = document.createElement("meta");
      keyMeta.setAttribute("name", "keywords");
      document.head.appendChild(keyMeta);
    }

    keyMeta.setAttribute("content", keywords);
  }, [currentCategoryData, defaultSeo]);

  /*
   * Category selection.
   *
   * IMPORTANT:
   * This receives a SLUG from ProductFilter.
   */
  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);

    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (slug && slug !== "all") {
      params.set("category", slug);
    } else {
      params.delete("category");
    }

    const queryString = params.toString();

    router.push(
      queryString
        ? `${pathname}?${queryString}`
        : pathname,
      {
        scroll: false,
      }
    );
  };

  /*
   * IMPORTANT PART:
   *
   * Keep the category information attached to every product.
   */
  const allProducts = useMemo(() => {
    return categories.flatMap((group) => {
      const categoryTitle = group.category?.title || "";

      const categorySlug =
        group.category?.slug ||
        categoryTitle
          .toLowerCase()
          .trim()
          .replace(/&/g, "and")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");

      return (group.products || []).map((product) => ({
        ...product,
        categorySlug,
        categoryTitle,
      }));
    });
  }, [categories]);

  /*
   * FILTER PRODUCTS
   */
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return allProducts.filter((product) => {
      /*
       * Category filter
       */
      const matchesCategory =
        selectedCategory === "all" ||
        product.categorySlug === selectedCategory;

      /*
       * Search filter
       */
      const matchesSearch =
        !query ||
        product.name?.toLowerCase().includes(query) ||
        product.spec?.toLowerCase().includes(query) ||
        product.origin?.toLowerCase().includes(query) ||
        product.packing?.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [allProducts, selectedCategory, searchQuery]);

  /*
   * Visible products
   */
  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const hasMore =
    visibleCount < filteredProducts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  return (
    <div className="w-full min-h-screen bg-white pt-16 lg:pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}     <ProductBreadcrumb />
        <div className="border-b border-gray-200 pb-4 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
       
   
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-[#011842] tracking-tight mb-2">
              {currentCategoryData
                ? currentCategoryData.title
                : "Export Product Catalog"}
            </h1>

            {currentCategoryData ? (
              <div
                className="text-gray-600 text-sm font-medium prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{
                  __html:
                    currentCategoryData.content || "",
                }}
              />
            ) : (
              <p className="text-gray-600 text-sm font-medium">
                Explore our range of premium certified goods.
                Select a category below or search.
              </p>
            )}
          </div>

          <div className="text-right shrink-0">
            <span className="text-[15px] font-bold text-[#011842]">
              Showing {displayedProducts.length} of{" "}
              {filteredProducts.length} export lines
            </span>
          </div>
        </div>

        {/* Catalog */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* Filter */}
          <ProductFilter
            categories={categories}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />

          {/* Products */}
          <div className="lg:col-span-4 space-y-8">

            {filteredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">

                  {displayedProducts.map((product) => (
                    <ProductCard
                      key={product.slug}
                      product={product}
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
                      Load More Products (
                      {filteredProducts.length -
                        displayedProducts.length}{" "}
                      remaining)
                    </Button>

                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 border border-dashed border-gray-300 flex flex-col items-center justify-center">

                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
                  <svg
                    className="w-6 h-6"
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
                </div>

                <h3 className="text-base font-bold text-[#011842] mb-1">
                  No products found
                </h3>

                <p className="text-xs text-gray-500 max-w-xs mb-4 leading-relaxed">
                  We couldn't find any products matching your
                  search criteria.
                </p>

                <button
                  onClick={() => {
                    handleCategorySelect("all");
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