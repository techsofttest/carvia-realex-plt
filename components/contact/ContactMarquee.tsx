import React from "react";
import { IconGlobe } from "@/components/ui/Icons";

export function ContactMarquee({marque}:{marque:any[]} ) {
  if (!marque || !Array.isArray(marque) || marque.length === 0) {
    return null;
  }
  const repeated = [...marque, ...marque, ...marque, ...marque];

  return (
    <div className="w-full py-8 bg-white border-t border-gray-200 overflow-hidden relative z-10 select-none">
      <div className="animate-marquee gap-8 lg:gap-12 items-center">
        {repeated.map((text, i) => (
          <div key={i} className="flex items-center gap-8 lg:gap-12 shrink-0">
            <span className="text-sm lg:text-base font-bold text-[#011842] tracking-widest uppercase">
              {text.title}
            </span>
            <IconGlobe className="w-5 h-5 text-brand-accent animate-[spin_10s_linear_infinite] shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
