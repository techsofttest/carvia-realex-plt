import React, { Suspense } from "react";
import { Products } from "./product";
import { Metadata } from "next";

interface ProductResponse {
  seo: {
    meta_title: string;
    meta_key: string;
    meta_desc: string;
  };
  categories:{
     slug: string;
    title: string;
    image: string;
    content: string[];
  }[];
}

async function getSEO(): Promise<ProductResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}/product`, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product data");
  }

  return res.json();
}

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  try {
    const data = await getSEO();
    const resolvedParams = await searchParams;
    const selectedCatTitle = resolvedParams.category;



    return {
      title:  data?.seo?.meta_title || "Export Product Catalog",
      description:  data?.seo?.meta_desc || "",
      keywords:  data?.seo?.meta_key || "",
    };
  } catch (error) {
    return {
      title: "Export Product Catalog",
    };
  }
}

export default async function ProductsPage() {
  let data: ProductResponse | null = null;
  try {
    data = await getSEO();
  } catch (error) {
    console.error("Error fetching product page data:", error);
  }

  return (
    <main className="w-full bg-white">
      <Suspense fallback={<div className="min-h-screen pt-24 text-center">Loading...</div>}>
        <Products     product={data?.categories ?? []} 
        />
      </Suspense>
    </main>
  );
}