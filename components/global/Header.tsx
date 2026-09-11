"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { IconMenu, IconX, IconArrowRight } from "@/components/ui/Icons";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Sourcing From India", href: "/source" },
  { label: "Export Services", href: "/service" },
  { label: "Why Us", href: "/why" },
  { label: "Contact", href: "/contact" },
];

interface ProductItem {
  id: string;
  name: string;
}

interface CategoryGroup {
  category: string;
  products: ProductItem[];
}

interface HeaderProps {
  categories?: CategoryGroup[];
}

export function Header({ categories = [] }: HeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDarkHeroPage = pathname === "/" || pathname === "/about" || pathname === "/contact" || pathname === "/testimonials";
  const showSolidHeader = scrolled || !isDarkHeroPage;

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("/")) {
      window.location.href = href;
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = `/${href}`;
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${showSolidHeader ? "bg-white/95 backdrop-blur-md border-b border-gray-100" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="flex items-center gap-3 group">
            <div className="relative w-40 sm:w-52 lg:w-60 h-16 sm:h-20 transition-transform group-hover:scale-105">
              <Image
                src="/logo/logo.png"
                alt="Carvia Realex"
                fill
                priority
                sizes="(max-width: 790px) 160px, 160px"
                className="object-contain object-left transition-all duration-300"
                style={{ filter: showSolidHeader ? "none" : "brightness(0) invert(1)" }}
              />
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8 h-full">
            {navLinks.map((l) => {
              const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));

              if (l.label === "Products") {
                return (
                  <div key={l.href} className="group relative h-full flex items-center">
                    <button
                      onClick={() => scrollTo(l.href)}
                      className={`flex items-center gap-1 text-sm font-semibold tracking-wide uppercase transition-colors cursor-pointer ${active
                        ? "text-[#478FDD]"
                        : showSolidHeader
                          ? "text-[#011842] hover:text-[#478FDD]"
                          : "text-white hover:text-[#478FDD]"
                        }`}
                    >
                      {l.label}
                      <svg className={`w-4 h-4 transition-transform duration-300 group-hover:rotate-180`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Mega Menu Dropdown */}
                    <div className="fixed top-[80px] left-0 w-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="bg-white shadow-2xl border-t border-gray-100 relative overflow-hidden">
                        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 flex gap-10">
                          {categories.map((catGroup, idx) => {
                            const categoryName = catGroup?.category || "";
                            const categoryProducts = (catGroup?.products || []).slice(0, 5);

                            return (
                              <div key={idx} className="flex-1 flex flex-col">
                                <h4 className="text-[14px] font-semibold text-[#011842] mb-4 tracking-widest border-b-2 border-gray-100 pb-3">
                                  {categoryName}
                                </h4>
                                <ul className="flex flex-col gap-1 mb-6 flex-1">
                                  {categoryProducts.map((p) => (
                                    <li key={p.id}>
                                      <Link
                                        href={`/products/${p.id}`}
                                        className="text-sm text-gray-700 hover:text-[#1b64b3] font-normal flex items-start gap-2 transition-all p-2 -mx-2 rounded-lg hover:bg-gray-50/80"
                                      >
                                        <svg className="w-[18px] h-[18px] text-[#1b64b3] shrink-0 mt-[2px] opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 5v9a2 2 0 002 2h6" />
                                        </svg>
                                        <span className="leading-snug">{p.name}</span>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                                <Link
                                  href={`/products?category=${encodeURIComponent(categoryName)}`}
                                  className="group/btn inline-flex items-center mt-auto text-[11px] font-bold uppercase tracking-widest text-[#1b64b3] hover:text-[#011842] transition-colors gap-1.5 pt-2"
                                >
                                  View More
                                  <IconArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                                </Link>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className={`text-sm font-semibold tracking-wide uppercase transition-colors cursor-pointer flex items-center h-full ${active
                    ? "text-[#478FDD]"
                    : showSolidHeader
                      ? "text-[#011842] hover:text-[#478FDD]"
                      : "text-white hover:text-[#478FDD]"
                    }`}
                >
                  {l.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Button href="/contact#contact" variant="primary" className="hidden lg:inline-flex">
              Get a Quote <IconArrowRight className="w-4 h-4" />
            </Button>
            <button onClick={() => setMenuOpen(!menuOpen)} className={`lg:hidden p-2 cursor-pointer ${showSolidHeader ? "text-[#011842]" : "text-white"}`}>
              {menuOpen ? <IconX className="w-6 h-6" /> : <IconMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 max-h-[calc(100dvh-5rem)] overflow-y-auto">
          <div className="px-4 sm:px-6 py-5 flex flex-col gap-3">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-left text-[#011842] font-medium uppercase tracking-wide py-2 border-b border-gray-100 cursor-pointer"
              >
                {l.label}
              </button>
            ))}
            <Button href="/contact#contact" variant="primary" className="mt-2 w-full">
              Get a Quote
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}