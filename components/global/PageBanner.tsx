import React from "react";
import Image from "next/image";
import { BlurReveal } from "@/components/ui/ScrollReveal";

interface PageBannerProps {
  title: string | React.ReactNode;
  highlightText?: string;
  bgImage?: string;
}

export function PageBanner({
  title,
  highlightText,
  bgImage = "/about/banner.png",
}: PageBannerProps) {
  return (
    <section className="relative w-full h-[50vh] min-h-[380px] lg:h-[60vh] lg:min-h-[420px] overflow-hidden flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="Page Banner"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        {/* Top Gradient Overlay for Navbar Visibility */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/70 to-transparent z-10 pointer-events-none" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-16">
        <BlurReveal className="max-w-3xl">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-4">
            {title}
            {highlightText && (
              <>
                <br />
                <span className="text-brand-light">{highlightText}</span>
              </>
            )}
          </h1>
        </BlurReveal>
      </div>
    </section>
  );
}
