"use client";

import React from "react";

const partners = ["AgriGlobal", "Pacific Textiles", "OceanFresh", "Kerala Coir", "BrassCraft India", "SpiceRoute"];

export function Partners() {
  return (
    <section className="w-full py-16 bg-white border-y border-gray-100 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="text-[#011842]/40 text-xs font-bold uppercase tracking-[0.3em]">Trusted Partners & Clients</div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-16">
          {partners.map((p, i) => (
            <div key={i} className="text-[#011842]/20 text-lg lg:text-xl font-bold uppercase tracking-tight hover:text-[#478FDD]/40 transition-colors cursor-default">
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
