import React from "react";
import Image from "next/image";
import { IconGlobe, IconShield, IconTrendingUp, IconPackage } from "@/components/ui/Icons";
import { BlurReveal, StaggerChildren, StaggerItem } from "@/components/ui/ScrollReveal";

const iconMap = { 
  IconGlobe, 
  IconShield, 
  IconTrendingUp, 
  IconPackage, 
};

interface ValueDetail {
    value?: {
        title: string;
        sub: string;
        detail: {
            title: string;
            icon: keyof typeof iconMap;
            description: string;
        }[];
    }
}

export function AboutValues({ value }: ValueDetail) {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/about/sec-bg-1.png"
          alt="Section Background"
          fill
          className="object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <BlurReveal>
            <span className="text-[#011842] text-sm font-bold uppercase tracking-[0.2em] mb-3 block">
             {value?.title}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#011842] tracking-tight">
             {value?.sub}
            </h2>
          </BlurReveal>
        </div>

        <StaggerChildren>
          <div className="flex flex-wrap justify-center gap-8">
            {value?.detail.map((v, i) => {
              const IconComponent = iconMap[v.icon] || IconPackage;

              return (
                <StaggerItem
                  key={i}
                  className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] bg-white p-8 border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="mb-5 inline-block p-3 bg-brand-accent/5">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#011842] mb-3">{v.title}</h3>
                  <p className="text-[#011842]/75 text-sm leading-relaxed">
                    {v.description}
                  </p>
                </StaggerItem>
              );
            })}
          </div>
        </StaggerChildren>
      </div>
    </section>
  );
}