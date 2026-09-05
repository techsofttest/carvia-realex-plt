import React from "react";
import Image from "next/image";
import { BlurReveal } from "@/components/ui/ScrollReveal";

interface ContactProps {
  info?: {
    title: string;
    sub: string;
    image: string;
    detail: {
      title: string;
      icon: string; // Stored as a raw SVG string from Laravel
      description: string;
      option: string;
    }[];
  };
}

export function ContactInfo({ info }: ContactProps) {
  return (
    <section className="pt-16 lg:pt-24 pb-0 w-full">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <BlurReveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-accent text-sm font-bold uppercase tracking-[0.2em] mb-3 block">
            {info?.title || "Direct Channels"}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#011842] leading-tight">
            {info?.sub || "How to Reach Our Trade Desk"}
          </h2>
        </BlurReveal>
      </div>

      {/* Full Width Main Card */}
      <div className="relative w-full overflow-hidden bg-[#011842] py-20 lg:py-28 min-h-[440px] flex items-center text-white">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={info?.image || "/hero/h2.png"}
            alt="Contact Background"
            fill
            sizes="100vw"
            className="object-cover object-right"
            priority
          />
          {/* Blue Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#011842]/95 via-[#011842]/80 to-transparent z-10" />
        </div>

        {/* Left-aligned Content Container */}
        <div className="w-full px-6 lg:px-16 relative z-20">
          <div className="max-w-3xl lg:w-7/12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {info?.detail?.map((item, i) => (
                <div key={i} className="space-y-2 border-b border-white/10 pb-6 sm:border-b-0 sm:pb-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-10 h-10 p-2 rounded-full bg-white/10 backdrop-blur border border-white/20 shrink-0 flex items-center justify-center"
                      dangerouslySetInnerHTML={{
                        __html: (item?.icon || "")
                          .replace(/className=/g, "class=")
                          .replace(/strokeWidth=/g, "stroke-width=")
                          .replace(/strokeLinecap=/g, "stroke-linecap=")
                          .replace(/strokeLinejoin=/g, "stroke-linejoin="),
                      }}
                    />
                    <h4 className="text-base font-bold text-white">
                      {item?.title}
                    </h4>
                  </div>
                  <p className="text-sm font-semibold text-gray-100 leading-snug">
                    {item?.description}
                  </p>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {item?.option}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}