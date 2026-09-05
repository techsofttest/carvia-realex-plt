import React from "react";
import { BlurReveal } from "@/components/ui/ScrollReveal";

export function ContactMap({map}:{map:any}) {
  return (
    <section className="py-24 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <BlurReveal className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-1 block">
              Location & Logistics Hub
            </span>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#011842]">
              Find Our Indian Operations Office
            </h2>
          </div>
          <p className="text-xs text-gray-500 max-w-md">
            Strategically located near major agricultural hubs and sea ports (JNPT / Nhava Sheva) for rapid international dispatch.
          </p>
        </BlurReveal>

        {/* Embedded Responsive Google Map */}
        <div className="relative w-full h-[450px] overflow-hidden">
          <iframe
            src={map}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
            title="Carvia Realex Office Location"
          />
        </div>
      </div>
    </section>
  );
}
