"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/Button";
import { IconChevronLeft, IconChevronRight, IconArrowRight } from "@/components/ui/Icons";
import { BlurReveal } from "@/components/ui/ScrollReveal";
interface Data{
  product:{
    title: string;
    image: string;
    content: string[];
  }[];
}
export function Products({product}:Data) {
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

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="services" className="w-full py-24 lg:py-32 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <BlurReveal className="text-center max-w-2xl mx-auto mb-16">
          {/* <div className="text-[#478FDD] text-sm font-bold uppercase tracking-[0.2em] mb-4">Our Products</div> */}
          <h2 className="text-3xl lg:text-4xl font-bold text-[#011842] leading-tight">Our Products by Category</h2>
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
              {product?.map((cat, idx) => (
                <div key={idx} className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.333333%] lg:flex-[0_0_25%] flex-shrink-0 px-3">
                  <BlurReveal delay={idx * 0.1} className="h-full">
                    <div className="flex flex-col h-full group cursor-pointer">
                      <div className="relative h-72 w-full overflow-hidden rounded-none">
                        <Image src={cat.image} alt={cat.title} fill sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                      </div>
                      <div className="py-4 flex flex-col flex-1 justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-[#011842] mb-3">{cat.title}</h3>
                          <ul className="flex flex-wrap gap-2 mb-6">
                            {cat.content.slice(0, 4).map((item, i) => (
                              <li key={i} className="text-[12px] font-normal tracking-wide text-[#011842] bg-[#011842]/5 px-2.5 py-1 rounded-none">
                                {item}
                              </li>
                            ))}
                            {cat.content.length > 4 && (
                              <li className="text-[12px] font-semibold tracking-wide text-[#011842]/40 px-2.5 py-1">+{cat.content.length - 4} more</li>
                            )}
                          </ul>
                        </div>
                        <Button
                          href={`/products?category=${encodeURIComponent(cat.title)}`}
                          variant="primary"
                          size="sm"
                          className="self-start"
                        >
                          View All Products
                        </Button>
                      </div>
                    </div>
                  </BlurReveal>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section CTA Button */}
        {/* <div className="flex justify-center mt-12">
          <Button onClick={() => scrollTo("#contact")} variant="primary">
            View all products
          </Button>
        </div> */}

      </div>
    </section>
  );
}
