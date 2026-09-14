"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { BlurReveal } from "@/components/ui/ScrollReveal";

interface Data {
  product: {
    slug: string;
    title: string;
    image: string;
    content: string[];
  }[];
}

export function Products({ product }: Data) {
  // Show 3 rows initially
  const ROWS_TO_SHOW = 3;

  // 4 categories per row on desktop
  const COLUMNS_PER_ROW = 4;

  const INITIAL_COUNT = ROWS_TO_SHOW * COLUMNS_PER_ROW;

  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const displayedProducts = product?.slice(0, visibleCount) || [];

  const hasMore = visibleCount < (product?.length || 0);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + INITIAL_COUNT);
  };

  return (
    <section
      id="services"
      className="w-full py-24 lg:py-32 bg-white relative z-10"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}
        <BlurReveal className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#011842] leading-tight">
            Our Products by Category
          </h2>
        </BlurReveal>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {displayedProducts.map((cat, idx) => (
            <BlurReveal
              key={cat.slug || idx}
              delay={idx * 0.05}
              className="h-full"
            >
              <div className="flex flex-col h-full group">

                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="
                      (max-width: 640px) 100vw,
                      (max-width: 768px) 50vw,
                      (max-width: 1024px) 33vw,
                      25vw
                    "
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="py-4 flex flex-col flex-1">

                  <h3 className="text-lg font-bold text-[#011842] mb-3">
                    {cat.title}
                  </h3>

                  {/* Available Products */}
                  {cat.content?.length > 0 && (
                    <ul className="flex flex-wrap gap-2 mb-6">
                      {cat.content.slice(0, 4).map((item, i) => (
                        <li
                          key={i}
                          className="text-[12px] font-normal tracking-wide text-[#011842] bg-[#011842]/5 px-2.5 py-1"
                        >
                          {item}
                        </li>
                      ))}

                      {cat.content.length > 4 && (
                        <li className="text-[12px] font-semibold tracking-wide text-[#011842]/40 px-2.5 py-1">
                          +{cat.content.length - 4} more
                        </li>
                      )}
                    </ul>
                  )}

                  {/* Button */}
                  <div className="mt-auto">
                    <Button
                      href={`/products/${cat.slug}`}
                      variant="primary"
                      size="sm"
                      className="self-start"
                    >
                      View All Products
                    </Button>
                  </div>

                </div>
              </div>
            </BlurReveal>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="flex justify-center mt-14">
            <Button
              onClick={handleLoadMore}
              variant="outline"
              className="px-8 py-3 text-xs uppercase tracking-wider font-bold rounded-full"
            >
              Load More Categories
            </Button>
          </div>
        )}

      </div>
    </section>
  );
}