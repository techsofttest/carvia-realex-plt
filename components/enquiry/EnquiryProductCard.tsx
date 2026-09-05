import React from "react";
import Image from "next/image";
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
interface EnquiryProductCardProps {
  product: Product;
}

export function EnquiryProductCard({ product }: EnquiryProductCardProps) {
  return (
    <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-6">
      <div className="bg-white border border-gray-200 overflow-hidden">
        <div className="relative aspect-square w-full bg-gray-100 overflow-hidden group">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-5 space-y-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-600 block mb-1">
              {product.category}
            </span>
            <h1 className="text-2xl font-semibold text-gray-900 leading-tight">
              {product.name}
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-100 pt-3 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-gray-500 font-medium">
                <svg className="w-4 h-4 text-[#1b64b3] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Specification</span>
              </div>
              <div className="font-semibold text-gray-800 leading-tight">
                {product.spec}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-gray-500 font-medium">
                <svg className="w-4 h-4 text-[#1b64b3] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Origin</span>
              </div>
              <div className="font-semibold text-gray-800 leading-tight">
                {product.origin}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-gray-500 font-medium">
                <svg className="w-4 h-4 text-[#1b64b3] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span>Packing</span>
              </div>
              <div className="font-semibold text-gray-800 leading-tight">
                {product.packing}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
