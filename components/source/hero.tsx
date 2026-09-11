import Image from "next/image";
import { Button } from "@/components/ui/Button";
export default function Hero({hero}:{hero:any}) {
  const scrollToForm = () => {
    const element = document.getElementById("requirement-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    
      <section className="relative overflow-hidden bg-[#011842] pb-20 pt-36 text-white lg:pb-28 lg:pt-44">
      <div className="absolute inset-0 pointer-events-none">
        {/* Fallback Color and Glow Layer */}<div className="absolute inset-0 z-0">

        {/* Background Image Layer */}
        <Image
          src={hero?.image || "banner/b2.png"}
          alt="Hero Background"
          fill
          priority
          className="object-cover object-center opacity-40 mix-blend-overlay"
        />
   <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/70 to-transparent z-10 pointer-events-none" />
      </div></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="mb-6 inline-block border-l-2 border-[#80BDFF] pl-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#80BDFF]">
              India Sourcing Support
            </span>
            <h1 className="mb-6 text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-6xl">
             {hero?.title}
            </h1>
            <p className="mb-6 text-xl font-medium leading-snug text-[#80BDFF] sm:text-2xl">
             {hero?.sub}
            </p>
            <div className="mb-8 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg" dangerouslySetInnerHTML={{__html:hero?.content }} />
           <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                       <Button href="#requirement-form" variant="outline" className="text-white border-white/40 hover:bg-white/10">
                         Send Your Requirement
                       </Button>
                     </div>
          </div>
        </div>
      </section>
      ) 
    }