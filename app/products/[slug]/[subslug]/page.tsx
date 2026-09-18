import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";

import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ProductBreadcrumb } from "@/components/product-detailed/ProductBreadcrumb";
import { ProductGallery } from "@/components/product-detailed/ProductGallery";
import { ProductSpecs } from "@/components/product-detailed/ProductSpecs";
import { ProductFaqAccordion } from "@/components/product-detailed/ProductFaqAccordion";
import { ProductMainCta } from "@/components/product-detailed/ProductMainCta";
import { RelatedProducts } from "@/components/product-detailed/RelatedProducts";
import { ProductStickyCta } from "@/components/product-detailed/ProductStickyCta";
import { ProductCard } from "@/components/product-detailed/ProductCard";

import {
  IconGlobe,
  IconShield,
  IconTrendingUp,
  IconPackage,
  IconArrowRight,
} from "@/components/ui/Icons";

interface Product {
  id: string;
  slug: string;
  subslug: string;
  category: string;
  image: string;
  name: string;
  sub:string;
  spec: string;
  origin: string;
  packing: string;
  content: string;
  imgs: string[];
}
const iconMap = {
  IconGlobe,
  IconShield,
  IconTrendingUp,
  IconPackage,
  IconArrowRight,
};

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

  why: {
    title: string;
    detail: {
      title: string;
      icon: keyof typeof iconMap;
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

async function getProduct(
  slug: string,
  subslug: string
): Promise<ProductResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const res = await fetch(
    `${baseUrl}/product/${slug}/${subslug}`,
    {
        cache: "no-store",
    }
  );

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }

    throw new Error("Failed to fetch product data");
  }

  return res.json();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const { slug, subslug } = await params;

    const data = await getProduct(slug, subslug);

    return {
      title: data?.seo?.meta_title ?? data?.product?.name ?? "Product",
      description: data?.seo?.meta_desc ?? "",
      keywords: data?.seo?.meta_key ?? "",
    };
  } catch (error) {
    return {
      title: "Product",
    };
  }
}

export default async function ProductDetailPage({
  params,
}: PageProps) {
  const { slug, subslug } = await params;

  // Fetch product using both category slug and product subslug
  const data = await getProduct(slug, subslug);

  const product = data.product;

  if (!product) {
    notFound();
  }

  // Related products
  const relatedProducts = (data.related_products ?? [])
    .filter((p) => p.id !== product.id)
    .sort((a, b) => {
      if (
        a.category === product.category &&
        b.category !== product.category
      ) {
        return -1;
      }

      if (
        a.category !== product.category &&
        b.category === product.category
      ) {
        return 1;
      }

      return 0;
    })
    .slice(0, 4);

  return (
    <main className="w-full min-h-screen bg-white pt-24 lg:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">

        {/* Breadcrumb */}
        <ProductBreadcrumb
          category={product.slug}
          name={product.name}
        />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">

          {/* Left - Product Gallery */}
          <ProductGallery
            image={product.image}
            imgs={product.imgs}
            name={product.name}
          />

          {/* Right - Product Information */}
          <div className="flex flex-col h-full justify-between">
            <div>

              {/* Category */}
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#1b64b3] mb-3">
                {product.category}
              </span>

              {/* Product Name */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
                {product.name}
              </h1> {product.sub &&<span className="text-sm font-bold tracking-wider uppercase text-gray-900 mb-3"> [{product.sub}]</span>}

              {/* Description */}
              <div
                className="text-sm text-gray-700 leading-relaxed mb-4"
                dangerouslySetInnerHTML={{
                  __html: product.content || "",
                }}
              />

              {/* Specifications */}
              {product.spec && product.origin && product.packing &&<ProductSpecs
                spec={product.spec}
                origin={product.origin}
                packing={product.packing}
              />}

              {/* FAQ */}
              <ProductFaqAccordion faqs={data?.faq} />

              {/* Main CTA */}
              <ProductMainCta
                productName={product.slug}
                productId={product.subslug}
              />

            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <RelatedProducts
          relatedProducts={relatedProducts}
        />
      </div>

      {/* Why Choose Us */}
      <div className="border-t border-gray-200">
        <WhyChooseUs why={data?.why} />
      </div>

      {/* Sticky CTA */}
      <ProductStickyCta
        productName={product.name}
        productId={product.slug}
        product={product.subslug}
      />
    </main>
  );
}

