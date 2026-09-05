import React from "react";
import Image from "next/image";
import { PageBanner } from "@/components/global/PageBanner";
import { IconQuote } from "@/components/ui/Icons";
import { BlurReveal } from "@/components/ui/ScrollReveal";

interface TestimonialItem {
  image: string;
  content: string;
  name: string;
  role: string;
  company?: string;
}

interface ProductResponse {
  hero: {
    title: string;
    sub: string;
    image: string;
  };
  testimony: TestimonialItem[];
}

function TestimonialCard({ t }: { t: TestimonialItem }) {
  return (
    <div className="bg-white p-8 lg:p-10 border border-[#1E5CD6]/20 relative hover:shadow-xl transition-all duration-300 rounded-none flex flex-col justify-between h-full min-h-[280px] group overflow-hidden">
      {/* Background SVG Pattern */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none bg-repeat bg-center transition-opacity group-hover:opacity-25"
        style={{ backgroundImage: `url('/bg-svg/pattern.svg')` }}
      />

      <div className="relative z-10">
        <IconQuote className="w-10 h-6 text-[#478FDD]/30 mb-6 group-hover:text-[#478FDD] transition-colors" />
        <div className="text-[#011842]/90 leading-relaxed mb-8 text-[16px] font-normal" dangerouslySetInnerHTML={{__html:t.content}} />
  

      </div>
      <div className="flex items-center gap-4 border-t border-gray-100 pt-6 relative z-10">
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
          <Image src={t.image} alt={t.name} fill sizes="48px" className="object-cover" />
        </div>
        <div>
          <div className="font-bold text-[#011842] text-sm">{t.name}</div>
          <div className="text-gray-500 text-xs font-medium">
            {t.role}{t.company ? `, ${t.company}` : ''}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsPage({ hero, testimony = [] }: ProductResponse) {
  // Ensure testimony array exists and has items before slicing
  const safeTestimony = Array.isArray(testimony) ? testimony : [];
  
  // Split testimonials safely across columns
  const col1 = [safeTestimony[0], safeTestimony[3]].filter(Boolean);
  const col2 = [safeTestimony[1], safeTestimony[4]].filter(Boolean);
  const col3 = [safeTestimony[2], safeTestimony[5]].filter(Boolean);

  return (
    <div className="flex flex-col w-full font-sans antialiased text-[#011842] bg-white">
      {/* Top Banner Component */}
      <PageBanner
        title={hero?.title}
        highlightText={hero?.sub || ""}
        bgImage={hero?.image}
      />

      {/* Main Content Section */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        {/* Staggered 3-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {/* Column 1: Standard Top Alignment */}
          <div className="space-y-8">
            {col1.map((t, idx) => (
              <BlurReveal key={idx} delay={idx * 0.1}>
                <TestimonialCard t={t} />
              </BlurReveal>
            ))}
          </div>

          {/* Column 2: Slightly Lower Alignment */}
          <div className="space-y-8 pt-0 md:pt-6 lg:pt-12">
            {col2.map((t, idx) => (
              <BlurReveal key={idx} delay={0.15 + idx * 0.1}>
                <TestimonialCard t={t} />
              </BlurReveal>
            ))}
          </div>

          {/* Column 3: Lower Alignment than Column 2 */}
          <div className="space-y-8 pt-0 lg:pt-24 md:col-span-2 lg:col-span-1">
            {col3.map((t, idx) => (
              <BlurReveal key={idx} delay={0.3 + idx * 0.1}>
                <TestimonialCard t={t} />
              </BlurReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}