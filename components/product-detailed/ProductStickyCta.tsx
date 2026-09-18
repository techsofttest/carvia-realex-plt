"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface ProductStickyCtaProps {
  productName: string;
  productId: string;
  product: string;
  targetId?: string;
}

export function ProductStickyCta({ productName, productId, product, targetId = "main-cta" }: ProductStickyCtaProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShow(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(targetEl);

    return () => {
      observer.unobserve(targetEl);
    };
  }, [targetId]);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur border border-gray-200/80 py-3 px-3 sm:px-6 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.15)] z-40 flex items-center justify-center gap-3 sm:gap-6 w-[calc(100%-2rem)] max-w-xl animate-in slide-in-from-bottom duration-300">
      <div className="hidden sm:block text-left text-md">
        <span className="text-gray-800 font-medium block leading-tight">Looking to import</span>
        <strong className="text-[#1b64b3] font-semibold block leading-tight">{productName}?</strong>
      </div>
      <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
      <Link
        href={`/enquiry/${productId}/${product}`}
        className="inline-flex items-center justify-center bg-brand-accent hover:bg-brand-mid text-white px-4 sm:px-6 h-10 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 gap-2 shadow hover:scale-105 whitespace-nowrap"
      >
        Inquire Now
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </div>
  );
}
