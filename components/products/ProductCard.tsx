"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";


interface ProductCatalogProps {
 
    product: { 
      slug:string; 
      subslug:string;
      category:string;
      image:string;
      sub:string; 
      name:string
      spec:string;
      origin:string;
      packing:string
    }
}

export function ProductCard({ product }: ProductCatalogProps) {
  return (
    <Link
      href={`/products/${product.slug}/${product.subslug}`}
      className="flex flex-col group cursor-pointer h-full"
    >
      {/* Image Area (Flat, No rounded corners) */}
      <div className="relative aspect-square w-full bg-gray-100 overflow-hidden rounded-none mb-4">
        <Image
          src={product?.image ||""}
          alt={product.name}
          fill
          loading="eager"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Meta & Title */}
      <span className="text-[12px] font-bold tracking-wider text-gray-500 mb-1">
        {product.category}
      </span>
      <h3 className="text-[16px] font-semibold text-gray-900 leading-tight mb-2 tracking-tight group-hover:text-brand-accent transition-colors">
        {product.name} {product.sub && <span className="text-[12px] font-bold tracking-wider group-hover:text-brand-accent text-gray-900 mb-1"> [{product.sub}]</span>}
      </h3>
      {/* Technical Specs List */}{product.spec && product.origin && product.packing &&
      <div className="border-t border-gray-200 pt-3 mt-3 mb-5">
        <div className="grid grid-cols-3 gap-4 text-[11px] leading-snug">
          <div>
            <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-gray-600 mb-1">
              <svg className="w-3 h-3 text-[#1b64b3] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Spec
            </span>
            <span className="text-gray-900 font-semibold line-clamp-3">{product.spec}</span>
          </div>
          <div>
            <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-gray-600 mb-1">
              <svg className="w-3 h-3 text-[#1b64b3] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Origin
            </span>
            <span className="text-gray-900 font-semibold line-clamp-3">{product.origin}</span>
          </div>
          <div>
            <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-gray-600 mb-1">
              <svg className="w-3 h-3 text-[#1b64b3] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Packing
            </span>
            <span className="text-gray-900 font-semibold line-clamp-3">{product.packing}</span>
          </div>
        </div>
      </div>}

      {/* Request Enquiry Button */}
      <div className="mt-auto pt-2">
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = `/enquiry/${product.slug}/${product.subslug}`;
          }}
          variant="primary"
          size="sm"
          className="w-full flex items-center justify-center text-[11px] h-9 rounded-full"
        >
          Request Enquiry
        </Button>
      </div>
    </Link>
  );
}
