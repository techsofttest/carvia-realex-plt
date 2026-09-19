"use client";
import React from "react";
import Link from "next/link";
import {
    Search,
    Users,
    FileSpreadsheet,
    PackageCheck,
    ShieldCheck,
    Box,
    FileText,
    Truck,
    Tag,
    ArrowRight,
    CheckCircle2,LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
interface ProductResponse {
  hero?: {
    title: string;
     sub: string;
    content: string
    image: string;
  };
   value?: {
    title: string;
    content: string;
    detail: {
  title: string;
  icon: string;
  description: string;
}[];
  } | undefined;
}
export default function ExportServicesPage({hero,value}:ProductResponse) {
       const iconMap: Record<string, LucideIcon> = {
    Search,
    Users,
    FileSpreadsheet,
    PackageCheck,
    ShieldCheck,
    Box,
    FileText,
    Truck,
    Tag,
    ArrowRight,
    CheckCircle2
      };
    return (
        <main className="min-h-screen bg-white text-[#011842] font-sans">

            {/* HERO SECTION */}
            <section className="relative overflow-hidden bg-[#011842] pb-20 pt-36 text-white lg:pb-28 lg:pt-44">
                
                     <div className="absolute inset-0 pointer-events-none">
                        {/* Fallback Color and Glow Layer */}<div className="absolute inset-0 z-0">
                
                        {/* Background Image Layer */}
                        <Image
                          src={hero?.image ||""}
                          alt="Hero Background"
                          fill
                          priority
                          className="object-cover object-center opacity-40 mix-blend-overlay"
                        />
                   <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/70 to-transparent z-10 pointer-events-none" />
                      </div></div>
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="max-w-5xl">
                        <span className="mb-6 inline-block border-l-2 border-[#80BDFF] pl-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#80BDFF]">
                            {hero?.sub}
                        </span>
                        <h1 className="mb-6 text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-4xl">
                            {hero?.title}   
                        </h1>
                        <div className="mb-8 max-w-3xl text-base leading-relaxed text-white/75 sm:text-lg" dangerouslySetInnerHTML={{__html:hero?.content || ""}} />
                           <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                                               <Button href="/source#requirement-form" variant="outline" className="text-white border-white/40 hover:bg-white/10">
                                               Request Custom Sourcing
                                               </Button>
                                </div>
                    </div>
                </div>
            </section>

            {/* SERVICES GRID SECTION */}
            <section className="bg-[#f6f9fc] py-20 lg:py-28">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-semibold text-[#011842] sm:text-4xl">{value?.title}</h2>
                        <div className="mt-4 text-lg leading-relaxed text-slate-600" dangerouslySetInnerHTML={{ __html: value?.content || ""}} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {value?.detail.map((service, index) => {
                              const IconComponent = iconMap[service.icon] || ShieldCheck;
                            return (
                                <div
                                    key={ index}
                                    className="group flex flex-col justify-between border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#478FDD]/50 hover:shadow-xl hover:shadow-[#011842]/5"
                                >
                                    <div>
                                        <div className="mb-6 flex h-14 w-14 items-center justify-center bg-[#eaf3fc] text-[#478FDD] transition-colors duration-300 group-hover:bg-[#011842] group-hover:text-white">
                                            <IconComponent className="w-7 h-7" />
                                        </div>
                                        <h3 className="mb-3 text-xl font-semibold text-[#011842] transition-colors group-hover:text-[#478FDD]">
                                            {service.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed text-slate-600">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE OUR EXPORT SERVICES */}
            <section className="border-t border-slate-200 bg-white py-20 lg:py-28">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                        <div>
                            <span className="text-[#478FDD] text-xs font-bold uppercase tracking-wider">
                                Reliable Global Trade Support
                            </span>
                            <h2 className="mb-6 mt-3 text-3xl font-semibold leading-tight text-[#011842] sm:text-4xl">
                                Why International Buyers Partner With Carvia Realex
                            </h2>
                            <p className="text-slate-600 leading-relaxed mb-8">
                                Navigating overseas procurement can be complex. We simplify your cross-border supply chain by providing dedicated local oversight in India, ensuring your standards, deadlines, and compliance needs are consistently met.
                            </p>

                            <div className="space-y-4">
                                {[
                                    "Verified and vetted supplier network across India",
                                    "Transparent commercial terms and structured quotation processes",
                                    "Strict quality inspection & sample approval protocols",
                                    "Complete compliance with destination country import standards",
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start space-x-3">
                                        <CheckCircle2 className="w-5 h-5 text-[#478FDD] mt-0.5 flex-shrink-0" />
                                        <span className="text-slate-700 text-sm font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA Box */}
                        <div className="relative overflow-hidden bg-[#011842] p-8 text-white shadow-xl shadow-[#011842]/10 sm:p-12">
                            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-[#478FDD]/20 rounded-full blur-2xl pointer-events-none" />

                            <h3 className="relative z-10 mb-4 text-2xl font-semibold">
                                Ready to Source From India?
                            </h3>
                            <p className="text-slate-300 text-sm leading-relaxed mb-8 relative z-10">
                                Contact our expert export coordination team today to discuss your product requirements, custom branding, or packaging requirements.
                            </p>

                           <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                                       <Button href="/products" variant="primary" className="hover:gap-4 transition-all">
                                         Explore Products <ArrowRight className="w-5 h-5" />
                                       </Button>
                                       <Button href="/contact#contact" variant="outline" className="text-white border-white/40 hover:bg-white/10">
                                         Send Your Requirement
                                       </Button>
                                     </div>
                        </div>

                    </div>
                </div>
            </section>

        </main>
    );
}