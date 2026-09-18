"use client";

import React from "react";
import { ProductCard } from "@/components/products/ProductCard";

interface Product {
      slug:string; 
      subslug:string;
      category:string;
      image:string;
      name:string
      sub:string
      spec:string;
      origin:string;
      packing:string
}
interface Data {
  product: Product[];
}

export function Products({ product = [] }: Data) {
  return (
       <div className="w-full min-h-screen bg-white pt-16 lg:pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Top Header / Stats Bar */}
        <div className="border-b border-gray-200 pb-4 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-6"></div>
    <div className="lg:col-span-4 space-y-8">
      {product.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
          {product.map((p,idx) => (
            <ProductCard
              key={idx}
              product={p}
            />
          ))}
        </div>
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0"
              />
            </svg>
          </div>

          <h3 className="text-base font-bold text-[#011842] mb-1">
            No products found
          </h3>

          <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
            We couldn't find any products in this category.
          </p>
        </div>
      )}
    </div>
    </div>
    </div>
  );
}
