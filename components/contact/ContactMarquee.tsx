import React from "react";
import { IconGlobe } from "@/components/ui/Icons";

const marqueeItems = [
  "DIRECT EXPORT DESK: +91 98765 43210",
  "WHATSAPP: +91 91234 56789",
  "EMAIL: EXPORT@CARVIAREALEX.COM",
  "GLOBAL DISPATCH TO 40+ COUNTRIES",
  "APEDA • MPEDA • FSSAI • SPICES BOARD CERTIFIED",
  "24-HOUR VERIFIED PRICE QUOTES",
  "FCL & LCL CONTAINER LOGISTICS",
];

export function ContactMarquee() {
  const repeated = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <div className="w-full py-8 bg-white border-t border-gray-200 overflow-hidden relative z-10 select-none">
      <div className="animate-marquee gap-8 lg:gap-12 items-center">
        {repeated.map((text, i) => (
          <div key={i} className="flex items-center gap-8 lg:gap-12 shrink-0">
            <span className="text-sm lg:text-base font-bold text-[#011842] tracking-widest uppercase">
              {text}
            </span>
            <IconGlobe className="w-5 h-5 text-brand-accent animate-[spin_10s_linear_infinite] shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
