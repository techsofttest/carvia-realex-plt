import { Metadata } from "next";
import React, { Suspense } from "react";
import { PageBanner } from "@/components/global/PageBanner";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactMap } from "@/components/contact/ContactMap";
import { ContactFormSection } from "@/components/contact/ContactFormSection";
import { ContactMarquee } from "@/components/contact/ContactMarquee";

interface ProductResponse {
  seo: {
    meta_title: string;
    meta_key: string;
    meta_desc: string;
  };
  hero: {
    title: string;
    sub: string;
    image: string;
  };
contact:{
address: string;
phone: string;
phone2: string;
email: string;
map: string;
open: string;
},
   about?: {
    title: string;
    sub: string;
    image: string;
    detail: {
  title: string;
  icon: string;
  description: string;
  option: string;
}[];
  } | undefined;
marque?: {
    detail: {
  title: string;
}[];
  } 
};

async function getSEO(): Promise<ProductResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}/contact`, {
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


 
export default async function ContactPage() {
      let data: ProductResponse | null = null;
  try {
    data = await getSEO();
  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }
  return (
    <div className="flex flex-col w-full font-sans antialiased text-[#011842] bg-white">
      {/* Top Banner Component */}
      <PageBanner
        title={data?.hero.title}
        highlightText={data?.hero.sub || ""}
        bgImage={data?.hero.image || "/banner/b5.png"}
      />

      {/* 1. Contact Information Section (with Images & Icons) */}
      <ContactInfo info={data?.about} />

      {/* 2. Google Maps Location Section */}
      <ContactMap map={data?.contact?.map} />

      {/* 3. Contact Form Section (with Feature Image & Form) */}
      <Suspense fallback={<div className="py-20 text-center text-sm text-gray-500">Loading form...</div>}>
        <ContactFormSection />
      </Suspense>

      {/* 4. Contact Strip Marquee (White Background) */}
      <ContactMarquee marque={data?.marque?.detail ?? []} />
    </div>
  );
}
