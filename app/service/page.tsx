import React from "react";
import { Metadata } from "next";
import Service from "./service";
interface ProductResponse {
  seo: {
    meta_title: string;
    meta_key: string;
    meta_desc: string;
  };
  hero: {
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

async function getSEO(): Promise<ProductResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}/service`, {
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
      <Service hero={data?.hero} value={data?.value} />
    </div>
  );
}
