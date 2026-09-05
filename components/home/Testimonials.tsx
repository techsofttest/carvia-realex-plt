"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { IconQuote, IconChevronLeft, IconChevronRight } from "@/components/ui/Icons";
import { BlurReveal } from "@/components/ui/ScrollReveal";

export function Testimonials({testimony}:{testimony:any[]}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="testimonials" className="w-full py-24 lg:py-32 bg-[#F5F8FC] relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <BlurReveal className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#011842] leading-tight">Don't Take Our Word For It</h2>
        </BlurReveal>

        {/* Carousel Viewport Container */}
        <div className="relative px-2 lg:px-6">
          {/* Controls */}
          <button onClick={scrollPrev} className="absolute left-0 lg:-left-6 top-1/2 -translate-y-1/2 z-20 text-[#011842]/50 hover:text-[#011842] transition-colors cursor-pointer p-1">
            <IconChevronLeft className="w-10 h-10" />
          </button>

          <button onClick={scrollNext} className="absolute right-0 lg:-right-6 top-1/2 -translate-y-1/2 z-20 text-[#011842]/50 hover:text-[#011842] transition-colors cursor-pointer p-1">
            <IconChevronRight className="w-10 h-10" />
          </button>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -mx-3">
              {testimony.map((t, i) => (
                <div key={i} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333333%] flex-shrink-0 px-3">
                  <BlurReveal delay={i * 0.1} className="h-full">
                    <div className="bg-white p-8 lg:p-10 border border-[#1E5CD6]/20 relative hover:shadow-xl transition-all duration-300 rounded-none flex flex-col justify-between h-full min-h-[280px] group overflow-hidden">
                      {/* Background SVG Pattern */}
                      <div
                        className="absolute inset-0 opacity-[0.15] pointer-events-none bg-repeat bg-center transition-opacity group-hover:opacity-25"
                        style={{ backgroundImage: `url('/bg-svg/pattern.svg')` }}
                      />

                      <div className="relative z-10">
                        <IconQuote className="w-10 h-6 text-[#478FDD]/30 mb-6 group-hover:text-[#478FDD] transition-colors" />
                        <div className="text-[#011842]/90 leading-relaxed mb-8 text-[16px] font-normal" dangerouslySetInnerHTML={{ __html: t.content }} />
                      </div>
                      <div className="flex items-center gap-4 border-t border-gray-100 pt-6 relative z-10">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
                          <Image src={t.image} alt={t.name} fill sizes="48px" className="object-cover" />
                        </div>
                        <div>
                          <div className="font-bold text-[#011842] text-sm">{t.name}</div>
                          <div className="text-gray-500 text-xs font-medium">{t.role}</div>
                        </div>
                      </div>
                    </div>
                  </BlurReveal>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
