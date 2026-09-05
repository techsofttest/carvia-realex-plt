import React from "react";
import Image from "next/image";
import { BlurReveal } from "@/components/ui/ScrollReveal";

export function AboutStory({ about }: { about:any }) {
  return (
    <section className="py-20 lg:py-24 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/about/sec-bg-2.png"
          alt={about?.title || "Section Background"}
          fill
          className="object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Content */}
          <div className="lg:col-span-7">
            <BlurReveal>
              <span className="text-brand-accent text-sm font-bold uppercase tracking-[0.2em] mb-3 block">
               {about?.title || "Our Story"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#011842] leading-[1.15] tracking-tight mb-6">
               {about?.sub || " Rooted in Trust, Driven by Excellence"}
              </h2>
              <div className="space-y-6 text-[#011842]/80 text-[15px] leading-relaxed  [&_p_strong]:font-medium [&_p_strong]:text-[#011842]" dangerouslySetInnerHTML={{ __html: about?.content || "" }} />

            </BlurReveal>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5 relative">
            <BlurReveal delay={0.2} className="relative h-[450px] w-full overflow-hidden shadow-xl border border-gray-100">
              <Image
                src={about?.image || "/about/story.png"}
                alt="Sustainable Indian Farming"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </BlurReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
