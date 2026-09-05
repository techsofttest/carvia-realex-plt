"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { IconArrowRight } from "@/components/ui/Icons";
import { BlurReveal } from "@/components/ui/ScrollReveal";

export function AboutCTA() {
  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = "/#contact";
    }
  };

  return (
    <section className="py-20 bg-[#011842] relative overflow-hidden text-white text-center">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "url('/earth.png')", backgroundSize: "cover" }} />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <BlurReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            Ready to Start Your Export Partnership?
          </h2>
          <p className="text-white/80 text-base md:text-lg mb-8 max-w-2xl mx-auto">
            Get in touch with our commercial trade experts today to request custom quotes, shipping timelines, or sample specifications.
          </p>
          <div className="flex justify-center gap-4">
            <Button href="/contact#contact" variant="primary" className="hover:gap-4 transition-all">
              Contact Our Team <IconArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </BlurReveal>
      </div>
    </section>
  );
}
