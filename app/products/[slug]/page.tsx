import React, { Suspense } from "react";
import { ProductCatalog } from "@/components/products/ProductCatalog";
import { Metadata } from "next";

interface ProductItem {
  slug: string;
  subslug: string;
  category: string;
  image: string;
  name: string;
  spec: string;
  origin: string;
  packing: string;
}

interface CategoryData {
  category: {
    title: string;
    content: string;
    meta_title: string;
    meta_key: string;
    meta_desc: string;
  };
  products: ProductItem[];
}

interface ProductResponse {
  seo: {
    meta_title: string;
    meta_key: string;
    meta_desc: string;
  };
  category?: {
      title: string;
  slug?: string;
  content?: string;
    meta_title: string;
    meta_key: string;
    meta_desc: string;
  };
  product: CategoryData[];
}

interface PageProps {
  params: Promise<{
    slug?: string;
  }>;
  searchParams: Promise<{ category?: string }>;
}

async function getSEO(slug?: string): Promise<ProductResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
  const endpoint = slug ? `${baseUrl}/product/${slug}` : `${baseUrl}/product`;

  const res = await fetch(endpoint, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product data");
  }

  return res.json();
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;

    const data = await getSEO(resolvedParams.slug);
    const selectedCatTitle = resolvedSearchParams.category;

    const matchedCategoryGroup = data?.product?.find(
      (c) => c.category?.title === selectedCatTitle
    );

    const categorySEO = matchedCategoryGroup?.category;

    return {
      title: categorySEO?.meta_title || data?.seo?.meta_title || "Export Product Catalog",
      description: categorySEO?.meta_desc || data?.seo?.meta_desc || "",
      keywords: categorySEO?.meta_key || data?.seo?.meta_key || "",
    };
  } catch (error) {
    return {
      title: "Export Product Catalog",
    };
  }
}

export default async function ProductsPage({ params }: PageProps) {
  const resolvedParams = await params;
  let data: ProductResponse | null = null;

  try {
    data = await getSEO(resolvedParams.slug);
  } catch (error) {
    console.error("Error fetching product page data:", error);
  }

  return (
    <main className="w-full bg-white">
      <Suspense fallback={<CatalogSkeleton />}>
        <ProductCatalog
          categories={data?.product ?? []}
          defaultSeo={data?.seo}
          categorySlug={resolvedParams.slug}
        />
      </Suspense>
    </main>
  );
}

function CatalogSkeleton() {
  return (
    <div className="min-h-screen pt-24 max-w-7xl mx-auto px-6 lg:px-8 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-4" />
      <div className="h-4 bg-gray-100 rounded w-1/2 mb-12" />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="h-96 bg-gray-100 rounded-lg" />
        <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-64 bg-gray-100 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}