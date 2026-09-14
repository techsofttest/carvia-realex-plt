"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { IconArrowRight } from "@/components/ui/Icons";
import { BlurReveal } from "@/components/ui/ScrollReveal";

interface CategoryItem {
  category: string;
}

interface ContactInfo {
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  email?: string;
  address?: string;
  whatsapp?: string;
}
interface ctaData {
  title: string;
  content: string;
  image: string;
}
interface FooterProps {
  categories?: CategoryItem[];
  contact?: ContactInfo;
  cta?: ctaData;
}
const href = [{ name: "About Us", link: "/about" }, { name: "Testimony", link: "/testimony" }, { name: "Contact", link: "/contact" },  { name: "Sourcing From India", href: "/source" },
  { name: "Export Services", href: "/service" },
  { name: "Why Us", href: "/why" },]
export function Footer({ categories = [], contact = {}, cta }: FooterProps) {
  return (
    <footer id="footer" className="relative w-full text-white pt-16 lg:pt-20 pb-8 overflow-hidden z-10">
      {/* Background Image with Black Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={cta?.image || "/images/footer-bg.jpg"}
          alt="Footer Background"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <BlurReveal>
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12 border-b border-white/10 pb-10">
            <div className="text-left">
              <h2 className="text-2xl lg:text-5xl font-bold text-white leading-tight">
                {cta?.title}
              </h2>
            </div>
            <div className="flex flex-col items-start lg:items-end gap-6 text-left lg:text-right">
              <div className="text-white text-lg max-w-xl" dangerouslySetInnerHTML={{ __html: cta?.content || "" }} />
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button href="/contact#contact" variant="primary" className="hover:gap-4 transition-all text-sm">
                  Get Your Quote Now <IconArrowRight className="w-5 h-5" />
                </Button>
                <Button href={`mailto:${contact.email}`} variant="outline" className="text-white border-white hover:bg-white/10 text-sm">
                  Email Us Directly
                </Button>
              </div>
            </div>
          </div>
        </BlurReveal>

        <BlurReveal delay={0.2}>
          <div className="bg-white px-6 lg:px-16 py-10 lg:py-16 rounded-none mb-10 text-[#011842]">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0">
              <div className="lg:col-span-1 lg:border-r border-gray-200 lg:pr-10">
                <div className="flex items-start gap-3 mb-6">
                  <div className="relative w-48 sm:w-60 h-20 transition-transform hover:scale-105">
                    <Image src="/logo/logo.png" alt="Carvia Realex" fill sizes="(max-width: 768px) 160px, 160px" className="object-contain object-left-top" />
                  </div>
                </div>
                <p className="text-[#011842]/90 text-sm leading-relaxed mb-6">
                  Global export solutions connecting premium produce and products to markets worldwide.
                </p>
                <div className="flex gap-3">
                  {contact?.linkedin && (
                    <a href={contact.linkedin} aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-[#011842]/5 text-[#011842] flex items-center justify-center hover:bg-brand-accent hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  )}
                  {contact?.twitter && (
                    <a href={contact.twitter} aria-label="Twitter" className="w-9 h-9 rounded-full bg-[#011842]/5 text-[#011842] flex items-center justify-center hover:bg-brand-accent hover:text-white transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  )}
                  {contact?.instagram && (
                    <a href={contact.instagram} aria-label="Instagram" className="w-9 h-9 rounded-full bg-[#011842]/5 text-[#011842] flex items-center justify-center hover:bg-brand-accent hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              <div className="lg:px-10 lg:border-r border-gray-200">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#011842] mb-6">Company</h4>
                <ul className="flex flex-col gap-3">
                  {href.map((item, indx) => (
                    <li key={indx}><a href={item.link} className="text-[#011842]/90 text-sm hover:text-brand-accent transition-colors">{item.name}</a></li>
                  ))}
                </ul>
              </div>

              <div className="lg:px-10 lg:border-r border-gray-200">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#011842] mb-6">Export Categories</h4>
                <ul className="flex flex-col gap-3">
                  {categories.map((cat, index) => (
                    <li key={index}><a href={`/products?category=${encodeURIComponent(cat.category)}`} className="text-[#011842]/90 text-sm hover:text-brand-accent transition-colors">{cat.category}</a></li>
                  ))}
                  <li><a href="/products" className="text-[#011842]/90 text-sm hover:text-brand-accent transition-colors">More Category</a></li>
                </ul>
              </div>

              <div className="lg:pl-10">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#011842] mb-6">Contact</h4>
                <ul className="flex flex-col gap-4">
                  {contact?.email && <li className="text-[#011842]/90 text-sm">{contact.email}</li>}
                  {contact?.address && <li className="text-[#011842]/90 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: contact.address }} />}
                </ul>
              </div>
            </div>
          </div>
        </BlurReveal>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white text-xs">© {new Date().getFullYear()} Carvia Realex Private Limited. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-white text-xs hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="text-white text-xs hover:text-white/60 transition-colors">Terms of Service</a>
            <a href="#" className="text-white text-xs hover:text-white/60 transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}