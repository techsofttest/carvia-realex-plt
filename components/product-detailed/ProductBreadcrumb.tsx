import React from "react";
import Link from "next/link";

interface ProductBreadcrumbProps {
  category: string;
  name: string;
}

export function ProductBreadcrumb({ category, name }: ProductBreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-xs font-semibold text-gray-500 mb-8 uppercase tracking-wider">
      <Link href="/" className="hover:text-[#011842] transition-colors">
        Home
      </Link>
      <span>/</span>
      <Link href="/products" className="hover:text-[#011842] transition-colors">
        Products
      </Link>
      <span>/</span>
           <Link href={`/products?category=${encodeURIComponent(category)}`} className="hover:text-[#011842] transition-colors">
        {category}
      </Link>
      <span>/</span>
      <span className="text-[#011842] font-bold">{name}</span>
    </nav>
  );
}
