import React from "react";
import Link from "next/link";



export function ProductBreadcrumb() {
  return (
    <nav className="flex items-center space-x-2 text-xs font-semibold text-gray-500 mb-8 uppercase tracking-wider">
      <Link href="/" className="hover:text-[#011842] transition-colors">
        Home
      </Link>
      <span>/</span>
      <Link href="/products" className="hover:text-[#011842] transition-colors">
        Products
      </Link>
    </nav>
  );
}
