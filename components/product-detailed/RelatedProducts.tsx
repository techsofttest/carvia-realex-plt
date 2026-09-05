import React from "react";
import { ProductCard } from "@/components/products/ProductCard";
interface Product {
  id: string;
  slug: string;
  category: string;
  image: string;
  name: string;
  spec: string;
  origin: string;
  packing: string;
  content: string;
  imgs: string[];
}
interface RelatedProductsProps {
  relatedProducts: Product[];
}

export function RelatedProducts({ relatedProducts }: RelatedProductsProps) {
  return (
    <div className="border-t border-gray-200 pt-16 mb-20">
      <h2 className="text-xl font-bold text-[#011842] uppercase tracking-wider mb-8">
        Other Premium Products
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {relatedProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
