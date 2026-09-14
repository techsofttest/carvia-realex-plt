import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { EnquiryBreadcrumb } from "@/components/enquiry/EnquiryBreadcrumb";
import { EnquiryProductCard } from "@/components/enquiry/EnquiryProductCard";
import { EnquiryForm } from "@/components/enquiry/EnquiryForm";
import { notFound } from "next/navigation";

interface Product {
  id: string;
  slug: string;
  subslug: string;
  category: string;
  image: string;
  name: string;
  spec: string;
  origin: string;
  packing: string;
  content: string;
  imgs: string[];
}

interface ProductResponse {
  seo: {
    meta_title: string;
    meta_key: string;
    meta_desc: string;
  };
  product: Product;
  related_products: Product[];
  faq: {
    title: string;
    detail: {
      title: string;
      description: string;
    }[];
  };
}

interface PageProps {
  params: Promise<{
    slug: string;
    subslug: string;
  }>;
}

async function getProduct(slug: string,subslug:string): Promise<ProductResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const res = await fetch(`${baseUrl}/product/${slug}/${subslug}`, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }

    throw new Error("Failed to fetch product data");
  }

  return res.json();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug, subslug } = await params;
    const data = await getProduct(slug, subslug);

    const baseTitle = data?.seo?.meta_title || data?.product?.name || "Product";

    return {
      title: `${baseTitle} - Enquiry`,
      description: data?.seo?.meta_desc ?? "",
      keywords: data?.seo?.meta_key ?? "",
    };
  } catch (error) {
    return {
      title: "Product Enquiry",
    };
  }
}

export default async function ProductEnquiryPage({ params }: PageProps) {
  const { slug, subslug } = await params;

  // Fetch product from Laravel API
  const data = await getProduct(slug, subslug);

  const product = data.product;

  // Related products
  const relatedProducts = data.related_products
    .filter((p) => p.id !== product.id)
    .sort((a, b) => (a.category === product.category ? -1 : 1))
    .slice(0, 4);

  return (
    <div className="w-full min-h-screen bg-white pt-24 lg:pt-24 pb-16 text-[#011842]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-14 lg:px-24">

        <EnquiryBreadcrumb product={product} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-4 items-start mb-10">
          <EnquiryProductCard product={product} />
          <EnquiryForm product={product} />
        </div>

        <div className="border-t border-gray-200 pt-16 mt-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#1b64b3] block mb-1">
                Complementary Lines
              </span>
              <h3 className="text-2xl font-bold text-[#011842]">
                Explore Related Export Goods
              </h3>
            </div>
            <Link
              href="/products"
              className="text-xs font-bold text-[#1b64b3] hover:underline"
            >
              View Full Product Catalog →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}