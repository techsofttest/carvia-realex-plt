import React from "react";
import { Metadata } from "next";

import { AboutHero } from "@/components/about/AboutHero";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutValues } from "@/components/about/AboutValues";
import { AboutCertifications } from "@/components/about/AboutCertifications";
import { AboutCTA } from "@/components/about/AboutCTA";
import { IconGlobe, IconShield, IconTrendingUp, IconPackage } from "@/components/ui/Icons";

const iconMap = {
  IconGlobe,
  IconShield,
  IconTrendingUp,
  IconPackage,
};
interface ProductResponse {
  seo: {
    meta_title: string;
    meta_key: string;
    meta_desc: string;
  };
  hero: {
    title: string;
    sub: string
    image: string;
  }[];
  about: {
    title: string;
    sub: string;
    content: string;
    image: string;
  };
  value?: {
    title: string;
    sub: string;
    detail: {
      title: string;
      icon: keyof typeof iconMap;
      description: string;
    }[];
  } | undefined;
  cta?: {
    title: string;
    sub: string;
    content: string;
    image: string;
    detail: {
      title: string;
    }[];
  };
}

async function getSEO(): Promise<ProductResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}/about`, {
     cache: "no-store",
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

export default async function AboutPage() {
  let data: ProductResponse | null = null;
  try {
    data = await getSEO();
  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }

  return (
    <div className="flex flex-col w-full font-sans antialiased text-[#011842] bg-white">
      <AboutHero hero={data?.hero} />
      <AboutStory about={data?.about} />
      {/* <AboutCTA /> */}
      <AboutValues value={data?.value} />
      <AboutCertifications cta={data?.cta} />

    </div>
  );
}
