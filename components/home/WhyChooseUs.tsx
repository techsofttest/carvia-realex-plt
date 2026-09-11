"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { IconGlobe, IconShield, IconTrendingUp, IconPackage, IconArrowRight } from "@/components/ui/Icons";
import { BlurReveal } from "@/components/ui/ScrollReveal";

interface Data {
   why?: {
    title: string;
    detail: {
  title: string;
  icon: keyof typeof iconMap;
  description: string;
}[];
}
}
const iconMap = { 
  IconGlobe, 
  IconShield, 
  IconTrendingUp, 
  IconPackage, 
  IconArrowRight 
};

export function WhyChooseUs({ why }: Data) {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="w-full py-24 lg:py-32 text-white relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/about/sec-bg-3.png"
          alt="Section Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#011842]/45" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Centered Section Header */}
        <BlurReveal className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold leading-tight">{why?.title}</h2>
        </BlurReveal>

        {/* Clean, High-Contrast Grid Cards (No Boxes) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {why?.detail?.map((f, i) => {
            const IconComponent = iconMap[f.icon] || IconGlobe;

            return (
              <BlurReveal key={i} delay={i * 0.1}>
                <div className="group flex flex-col items-center text-center">
                  <IconComponent className="w-10 h-10 text-[#80BDFF] mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold text-white mb-3">{f.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{f.description}</p>
                </div>
              </BlurReveal>
            );
          })}
        </div>

        {/* Centered CTA Trigger */}
        <BlurReveal delay={0.4} className="flex justify-center mt-16">
          <Button href="/contact#contact" variant="primary" className="hover:gap-4 transition-all">
            Start Exporting <IconArrowRight className="w-5 h-5" />
          </Button>
        </BlurReveal>

      </div>
    </section>
  );
}