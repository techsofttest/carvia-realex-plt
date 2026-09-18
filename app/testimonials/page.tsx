import React from "react";
import { Metadata } from "next";
import Testimony from "./testimony";

interface TestimonialItem {
  image: string;
  content: string;
  name: string;
  role: string;
  company?: string;
}

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
  testimony: TestimonialItem[];
}

async function getSEO(): Promise<ProductResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}/testimony`, {
      cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch testimony data");
  }

  return res.json();
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getSEO();

    return {
      title: data?.seo?.meta_title ?? "Testimonials",
      description: data?.seo?.meta_desc ?? "",
      keywords: data?.seo?.meta_key ?? "",
    };
  } catch (error) {
    return {
      title: "Testimonials",
    };
  }
}

export default async function AboutPage() {
  let data: ProductResponse | null = null;
  try {
    data = await getSEO();
  } catch (error) {
    console.error("Error fetching testimony page data:", error);
  }

  return (
    <div className="flex flex-col w-full font-sans antialiased text-[#011842] bg-white">
      <Testimony hero={data?.hero!} testimony={data?.testimony!} />
    </div>
  );
}