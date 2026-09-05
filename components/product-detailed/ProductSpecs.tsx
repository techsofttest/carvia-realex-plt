import React from "react";

interface ProductSpecsProps {
  spec: string;
  origin: string;
  packing: string;
}

export function ProductSpecs({ spec, origin, packing }: ProductSpecsProps) {
  return (
    <div className="border-t border-gray-200 pt-4">
      <h2 className="text-sm font-bold tracking-wider uppercase text-gray-900 mb-3">
        Technical Specifications
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-gray-200 pb-4">
        <div className="space-y-1">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
            <svg className="w-4 h-4 text-[#1b64b3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Spec
          </span>
          <p className="text-sm text-[#011842] font-semibold">{spec}</p>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
            <svg className="w-4 h-4 text-[#1b64b3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Origin
          </span>
          <p className="text-sm text-gray-900 font-semibold">{origin}</p>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
            <svg className="w-4 h-4 text-[#1b64b3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Packing
          </span>
          <p className="text-sm text-gray-900 font-semibold">{packing}</p>
        </div>
      </div>
    </div>
  );
}
