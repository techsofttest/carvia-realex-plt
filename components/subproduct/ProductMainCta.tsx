import React from "react";
import Link from "next/link";

interface ProductMainCtaProps {
  productName: string;
  productId?: string;
  product?: string;
}

export function ProductMainCta({ productName, productId ,product}: ProductMainCtaProps) {
  const targetLink = productName ? `/enquiry/${productName}/${productId}/${product}` : `/#contact?product=${encodeURIComponent(productName)}`;

  return (
    <div id="main-cta" className="mt-5 pt-4 border-t border-gray-200">
      <Link
        href={targetLink}
        className="inline-flex items-center justify-center bg-brand-accent text-white hover:bg-[#011842] px-8 h-12 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 gap-3 w-full shadow-lg group"
      >
        Start Export Enquiry
        <svg className="w-5 h-5 transition-transform duration-300 transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </div>
  );
}
