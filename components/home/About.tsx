"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { IconArrowRight } from "@/components/ui/Icons";
import { BlurReveal } from "@/components/ui/ScrollReveal";

export function About({about}:{about:any}) {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="about" className="w-full py-24 lg:py-32 bg-white relative overflow-hidden z-10">
      {/* Concentric Curves Overlay (Emons-style) in our brand colors */}
      <div
        className="absolute inset-0 opacity-[0.2] pointer-events-none bg-no-repeat bg-left-bottom"
        style={{ backgroundImage: `url('/bg-svg/pattern3.svg')`, backgroundSize: "50%" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-end">

          {/* Left Column: Headline */}
          <BlurReveal className="mb-6 lg:mb-0">
            {/* <div className="text-[#478FDD] text-sm font-bold uppercase tracking-[0.2em] mb-4">About Carvia Realex</div> */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#011842] leading-[1.1] tracking-tight">{about?.title}</h2>
          </BlurReveal>

          {/* Right Column: Truck Image + CTAs + Description */}
          <div className="flex flex-col">
            {/* Truck Image positioned on the top-right of this column */}
            <div className="relative w-full h-[240px] md:h-[320px] lg:h-[360px] lg:-mt-32 mb-8">
              <Image
                src={about?.image}
                alt="Carvia Realex Cargo Truck"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain object-right-bottom select-none pointer-events-none"
                priority
              />
            </div>

            {/* Action Buttons & Description */}
            <BlurReveal delay={0.2} className="max-w-xl">
              {/* Pill Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <Button href="/products" variant="primary">
                  Explore Our Products <IconArrowRight className="w-4 h-4" />
                </Button>
                <Button href="/contact#contact" variant="secondary">
                  Request Export Quote <IconArrowRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Company Description */}
                  <div className="text-[#011842]/70 text-[15px] leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: about?.content }} />
            </BlurReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
