import React from "react";
import { IconCheck } from "@/components/ui/Icons";
import { BlurReveal } from "@/components/ui/ScrollReveal";

interface ctaData{
   cta?:{
    title: string;
    sub: string;
    content: string;
    image: string;
   detail: {
  title: string;
}[];};
}

export function AboutCertifications({cta}:ctaData) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Title / Info */}
          <div className="lg:col-span-5">
            <BlurReveal>
              <span className="text-brand-accent text-sm font-bold uppercase tracking-[0.2em] mb-3 block">
                {cta?.title || "Certifications & Registrations"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#011842] tracking-tight mb-4">
               {cta?.sub || " Compliant with Global Standards"}
              </h2>
              <div className="text-[#011842]/80 text-[15px] leading-relaxed" dangerouslySetInnerHTML={{ __html: cta?.content || "" }} />
            </BlurReveal>
          </div>

          {/* Badges/Certifications Grid */}
          <div className="lg:col-span-7">
            <BlurReveal delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cta?.detail.map((cert, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-100">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <IconCheck className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[#011842] font-semibold text-sm">{cert.title}</span>
                  </div>
                ))}
              </div>
            </BlurReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
