"use client";

import React from "react";
import Image from "next/image";
import { BlurReveal } from "@/components/ui/ScrollReveal";

export function Stats({stat}:{stat:any[]}) {
  return (
    <section className="w-full h-[90vh] min-h-[550px] bg-[#F5F8FC] relative overflow-hidden z-10 flex flex-col justify-center items-center">
      {/* Globe Background Gif positioned at bottom center with reduced opacity */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[320px] sm:w-[480px] md:w-[640px] lg:w-[850px] aspect-square opacity-[0.2] pointer-events-none z-0">
        <Image
          src="/earth/earth-2.gif"
          alt="Rotating Globe"
          fill
          sizes="(max-width: 768px) 320px, (max-width: 1024px) 640px, 850px"
          className="object-contain object-bottom select-none pointer-events-none mix-blend-multiply"
          unoptimized
        />
      </div>

      {/* Stats Content Overlay */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 w-full text-center">

        {/* Row 1 */}
        <BlurReveal>
          <div className="grid grid-cols-3 gap-4 md:gap-8 items-center border-b border-gray-200/50 pb-8 mb-8">
            {stat.slice(0, 3).map((s, idx) => (
              <div key={idx} className="relative group px-2">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#011842] tracking-tight mb-2 transition-transform duration-500 group-hover:scale-105">
                  {s.title}
                </div>
                <div className="text-[11px] md:text-xs font-semibold uppercase tracking-wider text-[#011842]/60">
                  {s.icon}
                </div>
                {idx < 2 && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-[1px] bg-gray-300" />
                )}
              </div>
            ))}
          </div>
        </BlurReveal>

        {/* Row 2 */}
        <BlurReveal delay={0.2}>
          <div className="grid grid-cols-3 gap-4 md:gap-8 items-center">
            {stat.slice(3, 6).map((s, idx) => (
              <div key={idx} className="relative group px-2">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#011842] tracking-tight mb-2 transition-transform duration-500 group-hover:scale-105">
                  {s.title}
                </div>
                <div className="text-[11px] md:text-xs font-semibold uppercase tracking-wider text-[#011842]/60">
                  {s.icon}
                </div>
                {idx < 2 && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-[1px] bg-gray-300" />
                )}
              </div>
            ))}
          </div>
        </BlurReveal>

      </div>
    </section>
  );
}
