import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
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
interface EnquirySuccessModalProps {
  product: Product;
  name: string;
  quantity: number;
  unit: string;
  country: string;
  shippingTerm: string;
  referenceNumber: string;
}

export function EnquirySuccessModal({
  product,
  name,
  quantity,
  unit,
  country,
  shippingTerm,
  referenceNumber,
}: EnquirySuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-gray-200 max-w-2xl rounded w-full p-8 lg:p-10 text-center relative animate-pop-in">
        <div className="w-20 h-20 bg-green-50 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg
            className="w-10 h-10 text-green-600 animate-checkmark"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h3 className="text-2xl font-bold text-[#011842] mb-3">
          Enquiry Submitted Successfully!
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-8">
          Thank you, <span className="font-bold text-[#011842]">{name || "Valued Importer"}</span>. Our trade coordinators have received your enquiry for <span className="font-bold text-[#011842]">{product.name}</span>.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4 text-left mb-10 mt-2">
          <div className="flex flex-col">
            <span className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
              <svg className="w-4 h-4 text-[#1b64b3]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Ref Number
            </span>
            <span className="font-mono font-bold text-sm text-[#011842]">#{referenceNumber}</span>
          </div>
          <div className="flex flex-col">
            <span className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
              <svg className="w-4 h-4 text-[#1b64b3]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              Quantity & Unit
            </span>
            <span className="font-bold text-sm text-[#011842]">{quantity} {unit}</span>
          </div>
          <div className="flex flex-col">
            <span className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
              <svg className="w-4 h-4 text-[#1b64b3]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Destination
            </span>
            <span className="font-bold text-sm text-[#011842] truncate">{country || "International Port"}</span>
          </div>
          <div className="flex flex-col">
            <span className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
              <svg className="w-4 h-4 text-[#1b64b3]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              Terms
            </span>
            <span className="font-bold text-sm text-[#011842]">{shippingTerm}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <Button
            href={`/products/${product.slug}`}
            variant="outline"
            className="flex-1"
          >
            View Product Details
          </Button>
          <Button
            href="/products"
            variant="primary"
            className="flex-1"
          >
            Explore More Products
          </Button>
        </div>
      </div>
    </div>
  );
}
