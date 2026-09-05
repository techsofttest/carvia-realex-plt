import React, { Suspense } from "react";
import { ProductCatalog } from "@/components/products/ProductCatalog";
import { Metadata } from "next";

interface ProductResponse {
  seo: {
    meta_title: string;
    meta_key: string;
    meta_desc: string;
  };
   categories:{
    category: string;
    products: {
      slug:string; 
      category:string;
      image:string;
      name:string
      spec:string;
      origin:string;
      packing:string}[];
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

export default async function ProductsPage() {
    let data: ProductResponse | null = null;
  try {
    data = await getSEO();
  } catch (error) {
    console.error("Error fetching testimony page data:", error);
  }

  return (
    <main className="w-full bg-white">
      <Suspense fallback={<div className="min-h-screen pt-24 text-center">Loading...</div>}>
        <ProductCatalog categories={data?.categories ?? []} />
      </Suspense>
    </main>
  );
}

