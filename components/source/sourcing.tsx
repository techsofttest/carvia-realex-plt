"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  Send,
  Search,
  Calculator,
  FileText,
  CheckCircle2,
  Box,
  Ship,
  ArrowRight,
  ShieldCheck,
  Globe2,LucideIcon,
} from "lucide-react";
interface ProductResponse {
   value?: {
    title: string;
    sub: string;
    detail: {
  title: string;
  icon: string;
  description: string;
}[];
  } | undefined;
}
export default function SourcingFromIndiaPage({value}:ProductResponse) {
   const iconMap: Record<string, LucideIcon> = {
    Send,
  Search,
  Calculator,
  FileText,
  CheckCircle2,
  Box,
  Ship,
  ArrowRight,
  ShieldCheck,
  Globe2,
  };
  const scrollToForm = () => {
    const element = document.getElementById("requirement-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
      <section className="bg-[#f6f9fc] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-semibold text-[#011842] sm:text-4xl">
             {value?.sub}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
             {value?.title}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {value?.detail.map((item, index) => {
              const IconComponent = iconMap[item.icon] || ShieldCheck;
              return (
                <div
                  key={index}
                  className="group relative flex flex-col justify-between overflow-hidden border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#478FDD]/50 hover:shadow-xl hover:shadow-[#011842]/5"
                >
                  <div className="absolute right-0 top-0 h-24 w-24 bg-[#f6f9fc] transition-colors group-hover:bg-[#eaf3fc]" />
                  <span className="absolute right-6 top-4 text-2xl font-black text-slate-300 transition-colors group-hover:text-[#478FDD]/40">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>

                  <div>
                    <div className="mb-6 flex h-12 w-12 items-center justify-center bg-[#eaf3fc] text-[#478FDD] transition-colors group-hover:bg-[#011842] group-hover:text-white">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-[#011842]">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

     
  );
}