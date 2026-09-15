"use client";

import React, { useState } from "react";

interface ProductFaqAccordionProps {
  faqs: {
    title: string;
    detail: {
      title: string;
      description: string;
    }[];
  };
}

export function ProductFaqAccordion({ faqs }: ProductFaqAccordionProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <div className="pt-5 mt-5">
      <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-3">
      {faqs.title}
      </h2>
      <div className="space-y-2">
        {faqs.detail.map((faq, idx) => (
          <div key={idx} className="border border-gray-200 rounded-[4px] overflow-hidden">
            <button
              onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
              className="w-full flex items-center justify-between p-3 text-left font-semibold text-gray-900 text-s tracking-wider bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span>{faq.title}</span>
              <svg
                className={`w-4 h-4 text-gray-900 transform transition-transform duration-200 ${
                  openFaqIndex === idx ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openFaqIndex === idx && (
              <div className="p-3 bg-white text-s text-gray-700 leading-relaxed border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
                {faq.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
