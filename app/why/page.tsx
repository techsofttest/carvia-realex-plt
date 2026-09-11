import React from "react";
import { Metadata } from "next";
import WhyPage  from "./why";

interface ProductResponse {
  seo: {
    meta_title: string;
    meta_key: string;
    meta_desc: string;
  };
  value?: {
    title: string;
    sub: string;
    detail: {
      title: string;
      icon: string;
      description: string;
    }[];
  } | undefined;
}
async function getSEO(): Promise<ProductResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}/why`, {
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

export default async function AboutPage() {
  let data: ProductResponse | null = null;
  try {
    data = await getSEO();
  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }

  return (
    <div className="flex flex-col w-full font-sans antialiased text-[#011842] bg-white">
      <WhyPage value={data?.value} />

    </div>
  );
}
