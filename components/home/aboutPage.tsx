import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { IconArrowRight } from "@/components/ui/Icons";
import { BlurReveal } from "@/components/ui/ScrollReveal";

export function AboutPage({page}:{page:any}) {
  const heading = page?.title || "Your Reliable Sourcing Partner in India";

  const coreMessage = page?.content || `Carvia Realex leverages a robust nationwide supplier network across India to deliver tailored sourcing solutions. We match exact buyer specifications, custom packaging requirements, and strict destination-market compliance standards to ensure seamless international supply chain integration.`;

  return (
    <section id="about" className="relative w-full py-20 lg:py-28 bg-white overflow-hidden z-10 border-b border-slate-100">
      {/* Decorative Radial Backdrop Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -ml-24 w-96 h-96 bg-[#478FDD]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 -mb-24 -mr-24 w-80 h-80 bg-[#011842]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-12 items-center">

          {/* Left Column: Eyebrow + Headline + CTA */}
           <div className="lg:col-span-6">
            <BlurReveal delay={0.3}>
              <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                {/* Background Accent Frame */}
                <div className="absolute -inset-3 bg-gradient-to-tr from-[#478FDD]/20 to-[#011842]/10 rounded-2xl blur-lg transform -rotate-1 pointer-events-none" />

                {/* Main Image Container */}
                <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[440px] bg-slate-50 border border-slate-200/80 rounded-2xl overflow-hidden shadow-xl shadow-[#011842]/5 group">
                  <Image
                    src={page?.image || "/about/hero.png"}
                    alt="Carvia Realex Sourcing Partner"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    priority
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#011842]/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </BlurReveal>
          </div>
          
          {/* Right Column: Hero Image with Frame Card Design */}
         <div className="lg:col-span-6 flex flex-col justify-center">
            <BlurReveal>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#478FDD] mb-4 ">
               
               {page?.sub || "About Carvia Realex"}
              </span>
            </BlurReveal>

            <BlurReveal delay={0.1}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#011842] leading-[1.15] tracking-tight mb-6">
                {heading}
              </h2>
            </BlurReveal>

            <BlurReveal delay={0.2}>
              <div className="text-[#011842]/75 text-base md:text-lg leading-relaxed mb-8 max-w-xl" dangerouslySetInnerHTML={{__html:coreMessage}} />

              <div className="flex flex-wrap items-center gap-4">
                <Button 
                  href="/about" 
                  variant="primary"
                  className="bg-[#011842] hover:bg-[#478FDD] text-white px-7 py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 group"
                >
                  Learn More 
                  <IconArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </BlurReveal>
          </div>


        </div>
      </div>
    </section>
  );
}