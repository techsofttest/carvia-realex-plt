"use client";

import React, { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { IconChevronLeft, IconChevronRight, IconArrowRight } from "@/components/ui/Icons";

function useCarousel(length: number) {
  const [current, setCurrent] = useState(0);
  const next = useCallback(() => setCurrent((p) => (p + 1) % length), [length]);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + length) % length), [length]);
  return { current, next, prev, setCurrent };
}

export function Hero({ hero }: { hero: any[] }) {
  const heroCarousel = useCarousel(hero.length);

  useEffect(() => {
    const id = setInterval(heroCarousel.next, 6000);
    return () => clearInterval(id);
  }, [heroCarousel.next]);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative w-full h-[100dvh] lg:h-[80vh] overflow-hidden">
      {hero.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === heroCarousel.current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide?.image}
            alt={slide?.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority={idx === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#011842]/90 via-[#011842]/30 to-transparent" />
        </div>
      ))}

      {/* Top Black Gradient Overlay for Navbar Visibility */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent z-20 pointer-events-none" />

      <div className="relative z-20 h-full flex items-center max-w-7xl mx-auto px-6 lg:px-8 pt-20">
        <div className="max-w-3xl w-full">
          {hero.map((slide, idx) => (
            <div
              key={idx}
              className={`transition-opacity duration-700 ${
                idx === heroCarousel.current ? "block opacity-100" : "hidden opacity-0"
              }`}
            >
              {/* Subtitle / Category Badge */}
              {slide?.sub_title && (
                <span className="inline-block text-[#80BDFF] text-sm md:text-base font-semibold tracking-wider uppercase mb-3">
                  {slide.sub_title}
                </span>
              )}

              {/* Title */}
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight mb-4 max-w-2xl">
                {slide.title}
              </h1>

              {/* Main Body Content */}
              {slide?.content && (
                <div className="text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-xl" dangerouslySetInnerHTML={{__html:slide?.content}} />
              )}
            </div>
          ))}

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
            <Button onClick={() => scrollTo("#services")} variant="primary" className="hover:gap-4 transition-all">
              Explore Products <IconArrowRight className="w-5 h-5" />
            </Button>
            <Button href="/contact#contact" variant="outline" className="text-white border-white/40 hover:bg-white/10">
              Send Your Requirement
            </Button>
          </div>
        </div>
      </div>

      {/* Carousel Controls */}
      <button
        onClick={heroCarousel.prev}
        className="absolute left-4 lg:left-4 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-white transition-colors cursor-pointer p-2"
      >
        <IconChevronLeft className="w-10 h-10" />
      </button>

      <button
        onClick={heroCarousel.next}
        className="absolute right-4 lg:right-4 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-white transition-colors cursor-pointer p-2"
      >
        <IconChevronRight className="w-10 h-10" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {hero.map((_, idx) => (
          <button
            key={idx}
            onClick={() => heroCarousel.setCurrent(idx)}
            className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
              idx === heroCarousel.current ? "w-8 bg-[#80BDFF]" : "w-4 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}