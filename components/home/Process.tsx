"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { BlurReveal } from "@/components/ui/ScrollReveal";

interface Metric {
  title: string;
  icon: string;
  description: string;
}

interface Data {
  exportData: {
    title: string;
    content: string;
    image: string;
    detail: Metric[];
  } | undefined;
}

export function Process({ exportData }: Data) {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="process" className="relative w-full py-24 lg:py-32 z-10">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={exportData?.image ?? ""}
          alt="Process Background"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left Column: Section Header */}
          <BlurReveal className="lg:col-span-4 self-start">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#011842] leading-tight mb-6">
              {exportData?.title}
            </h2>
          </BlurReveal>

          {/* Right Column: Stacked Warm Sand Panels */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {exportData?.detail?.map((slide, idx) => (
              <BlurReveal key={idx} delay={idx * 0.1}>
                <div className="bg-[#FAF7F2] text-[#011842] p-8 lg:p-10 transition-all duration-300 relative overflow-hidden border border-gray-100 rounded-none flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

                  {/* Left content block */}
                  <div className="flex-1 max-w-2xl">
                    <h3 className="text-xl font-bold text-[#011842] mb-4">
                      {slide.title}
                    </h3>
                    <p className="text-[#011842]/70 text-sm leading-relaxed mb-6">
                      {slide.description}
                    </p>

                    <div className="flex items-center gap-3">
                      <Button href="/contact#contact" variant="dark">
                        Get Started
                      </Button>
                    </div>
                  </div>

                  {/* Right Metric detail block */}
                  <div className="text-left md:text-right flex-shrink-0 md:min-w-[140px] border-t md:border-t-0 md:border-l border-[#011842]/10 pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
                    <div className="text-3xl lg:text-4xl font-bold text-[#011842] tracking-tight">
                      {/* Fixed: Use map index + 1 for step numbering */}
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#011842]/40 mt-1">
                      Phase
                    </div>
                  </div>

                </div>
              </BlurReveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}