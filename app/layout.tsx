import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/global/Header";
import { Footer } from "@/components/global/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
interface ProductResponse {
  categories:{
    category:  {slug:string; name:string};
    products: {id:string; name:string}[];
  }[];
  contact:{
address: string;
instagram: string;
linkedin: string;
email: string;
twitter: string;
whatsapp:string;
},
  cta:{
    title: string;
    content: string;
    image: string;};
}

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Carvia Realex | Premium Global Exports",
  description: "Carvia Realex Private Limited — a trusted exporter of agriculture & food, seafood, handicrafts, coconut & coir products, and textiles to 40+ countries.",
};
async function getSEO(): Promise<ProductResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}/layout`, {
   next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch SEO data");
  }

  return res.json();
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    let data: ProductResponse | null = null;
     data = await getSEO();
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header categories={data.categories} />
        <WhatsAppButton whatsapp={data.contact.whatsapp} />
        {children}
          
        <Footer categories={data.categories} contact={data.contact} cta={data.cta} />
      </body>
    </html>
  );
}