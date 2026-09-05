import React from "react";
import Link from "next/link";
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
interface EnquiryBreadcrumbProps {
  product: Product;
}

export function EnquiryBreadcrumb({ product }: EnquiryBreadcrumbProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-gray-200">
      <nav className="flex items-center gap-2 text-xs lg:text-sm text-gray-500 font-medium">
        <Link href="/" className="hover:text-[#011842] transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-[#011842] transition-colors">
          Products
        </Link>
        <span>/</span>
                 <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-[#011842] transition-colors">
        {product.category}
      </Link>
        <span>/</span>
        <span className="text-[#011842] font-bold truncate max-w-[200px]">{product.name}</span>
        <span>/</span>
        <span className="text-brand-accent font-extrabold">Enquiry</span>
      </nav>

      <Link
        href={`/products/${product.slug}`}
        className="inline-flex items-center gap-2 text-xs font-bold text-[#1b64b3] hover:text-[#011842] transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Product Details
      </Link>
    </div>
  );
}
