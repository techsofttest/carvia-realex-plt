import React from "react";
import { Target, Compass, CheckCircle2 } from "lucide-react";
import { BlurReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import { IconGlobe, IconShield, IconTrendingUp, IconPackage, IconArrowRight } from "@/components/ui/Icons";
export function AboutCTA() {
  return (
    <section className="w-full py-24 lg:py-32 text-white relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/about/sec-bg-3.png"
              alt="Section Background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#011842]/45" />
          </div>
    
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
    
            {/* Centered Section Header */}
            <BlurReveal className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold leading-tight">Why Choose Carvia Realex?</h2>
            </BlurReveal>
    
            {/* Clean, High-Contrast Grid Cards (No Boxes) */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-12 lg:gap-8">
              
                  <BlurReveal key="1" delay={1 * 0.1}>
                    <div className="group flex flex-col items-center text-center">
                      <IconGlobe className="w-10 h-10 text-[#80BDFF] mb-6 group-hover:scale-110 transition-transform" />
                      <h3 className="text-lg font-bold text-white mb-3">Our Vision</h3>
                      <p className="text-white/80 text-sm leading-relaxed">To develop Carvia Realex into a trusted global sourcing and export partner connecting India with international markets.</p>
                    </div>
                  </BlurReveal>
                   <BlurReveal key="2" delay={2 * 0.1}>
                    <div className="group flex flex-col items-center text-center">
                      <IconShield className="w-10 h-10 text-[#80BDFF] mb-6 group-hover:scale-110 transition-transform" />
                      <h3 className="text-lg font-bold text-white mb-3">Our Mission</h3>
                      <p className="text-white/80 text-sm leading-relaxed">To provide reliable sourcing, transparent communication and efficient export coordination while building long-term relationships with buyers.</p>
                    </div>
                  </BlurReveal>

            </div>
    
          </div>
        </section>
  );
}