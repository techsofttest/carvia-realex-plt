import { Metadata } from "next";

import React from "react";
import { Header } from "@/components/global/Header";
import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { About } from "@/components/home/About";
import { Process } from "@/components/home/Process";
import { Products } from "@/components/home/Products";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Testimonials } from "@/components/home/Testimonials";
import {AboutPage} from "@/components/home/aboutPage";
import { IconGlobe, IconShield, IconTrendingUp, IconPackage, IconArrowRight } from "@/components/ui/Icons";
interface TestimonialItem {
  image: string ;
  content: string;
  name: string;
  role: string;
}
interface Metric {
  title: string;
  icon: string;
  description: string;
}
const iconMap = { 
  IconGlobe, 
  IconShield, 
  IconTrendingUp, 
  IconPackage, 
  IconArrowRight 
};
interface ProductResponse {
  seo: {
    meta_title: string;
    meta_key: string;
    meta_desc: string;
  };
  hero: {
    title: string;
    sub_title: string;
    content: string;
    image: string;
  }[];
  about: {
    title: string;
    content: string;
    image: string;
  };
  page: {
    title: string;
    content: string;
    image: string;
  };
  export: {
    title: string;
    content: string;
    image: string;
    detail:Metric[];
  };
  product:{
    title: string;
    slug: string;
    image: string;
    content:string[];
  }[];
   why: {
    title: string;
    detail: {
  title: string;
  icon: keyof typeof iconMap;
  description: string;
}[];
  } | undefined;
  stat: Metric[];
  testimony:TestimonialItem[];

}

async function getSEO(): Promise<ProductResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}/pages`, {
   next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch SEO data");
  }

  return res.json();
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getSEO();

    return {
      title: data?.seo?.meta_title ?? "Home",
      description: data?.seo?.meta_desc ?? "",
      keywords: data?.seo?.meta_key ?? "",
    };
  } catch (error) {
    return {
      title: "Home",
    };
  }
}

export default async function Home() {
   let data: ProductResponse | null = null;

  try {
    data = await getSEO();
  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }

  return (
    <div className="flex flex-col w-full font-sans antialiased text-[#011842] bg-white">
      {/* Earth background overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "url('/earth.png')",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />
      <main className="relative z-10">
        <Hero hero={data?.hero ?? [] } />
        <AboutPage page={data?.page}/>
        <Products product={data?.product ?? []} />
        <Stats stat={data?.stat ??[]} />
        <About about={data?.about} />
        <Process exportData={data?.export} />
        <WhyChooseUs why={data?.why} />
        <Testimonials testimony={data?.testimony ? data.testimony : []} />
        {/* <Partners /> */}
      </main>
    </div>
  );
}