"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/Button";
import { IconChevronLeft, IconChevronRight } from "@/components/ui/Icons";
import { BlurReveal } from "@/components/ui/ScrollReveal";

interface CategoryItem {
  slug: string;
  subslug: string;
  productslug: string;
  name: string;
  image: string;
  content: string;
}

interface Data {
  product: CategoryItem[];
}

export function ProductCard({ product }: Data) {
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
    <section id="services" className="w-full py-24 lg:py-32 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <BlurReveal className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#011842] leading-tight">
            Our Product
          </h2>
        </BlurReveal>

        <div className="relative px-2 lg:px-6">
          <button
            onClick={scrollPrev}
            className="absolute left-0 lg:-left-6 top-1/2 -translate-y-1/2 z-20 text-[#011842]/50 hover:text-[#011842] transition-colors p-1"
          >
            <IconChevronLeft className="w-10 h-10" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-0 lg:-right-6 top-1/2 -translate-y-1/2 z-20 text-[#011842]/50 hover:text-[#011842] transition-colors p-1"
          >
            <IconChevronRight className="w-10 h-10" />
          </button>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -mx-3">
              {product?.map((cat, idx) => (
                <div
                  key={idx}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.333333%] lg:flex-[0_0_25%] flex-shrink-0 px-3"
                >
                  <BlurReveal delay={idx * 0.1} className="h-full">
                    <div className="flex flex-col h-full group">
                      <div className="relative h-72 w-full overflow-hidden">
                        <Image
                          src={cat.image}
                          alt={cat.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="py-4 flex flex-col flex-1 justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-[#011842] mb-3">{cat.name}</h3>
                          
                        </div>
                        <Button
                          href={`/products/${cat.slug}/${cat.subslug}/${cat.productslug}`}
                          variant="primary"
                          size="sm"
                          className="self-start"
                        >
                          View Product
                        </Button>
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