import React from "react";
import {
  MapPin,
  UserCheck,
  ShieldCheck,
  MessageSquare,
  Truck,
  Handshake,
  Package,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";

interface FeatureDetail {
  title: string;
  description: string;
  icon: string;
}

interface WhyPageProps {
  value?: {
    title?: string;
    sub?: string;
    detail?: FeatureDetail[];
  };
}

export default function WhyPage({ value }: WhyPageProps) {
  const iconMap: Record<string, LucideIcon> = {
    MapPin,
    UserCheck,
    ShieldCheck,
    MessageSquare,
    Truck,
    Handshake,
  };

  return (
    <main className="w-full bg-white">
      <section className="relative overflow-hidden border-b border-slate-200 py-16 lg:py-24">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/about/sec-bg-2.png"
            alt="Section Background"
            fill
            className="object-cover opacity-60"
          />
        </div>

        {/* Foreground Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#478FDD] mb-2 block">
              {value?.title || "Why Partner With Us"}
            </span>
            <h1 className="text-3xl font-semibold text-[#011842] sm:text-4xl">
              {value?.sub || "Why Choose Carvia Realex"}
            </h1>
          </div>

          {/* Centered flex wrapper allowing up to 3 items per row on desktop */}
          <div className="flex flex-wrap justify-center gap-8">
            {value?.detail?.map((item, index) => {
              const IconComponent = iconMap[item.icon] || Package;

              return (
                <div
                  key={item.title || index}
                  className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.35rem)] group p-8 border border-slate-200 bg-transparent transition-all duration-300 hover:bg-white hover:border-[#478FDD]/40 hover:shadow-lg hover:shadow-[#011842]/5"
                >
                  <div className="flex h-12 w-12 items-center justify-center bg-[#eaf3fc] text-[#478FDD] mb-6 transition-colors group-hover:bg-[#1E5CD6] group-hover:text-white">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h2 className="text-lg font-semibold text-[#011842] mb-2">
                    {item.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}