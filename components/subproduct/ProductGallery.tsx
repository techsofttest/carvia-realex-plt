"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  image: string;
  imgs?: string[];
  name: string;
}

export function ProductGallery({ imgs, image, name }: ProductGalleryProps) {
  const galleryImages = [
    image,
    ...(imgs ? imgs.filter((img) => img !== image) : []),
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const isMultiple = galleryImages.length > 1;

  return (
    <div className="space-y-4 lg:sticky lg:top-28">
      {/* Main Display Image */}
      <div className="relative aspect-square w-full bg-gray-50 overflow-hidden border border-gray-200 group">
        <Image
          src={galleryImages[currentIndex]}
          alt={`${name} - Image ${currentIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-all duration-300"
        />

        {/* Carousel Controls */}
        {isMultiple && (
          <>
            <button
              onClick={prevSlide}
              aria-label="Previous Image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#011842] shadow-md flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#011842] shadow-md flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Slide Index Badge */}
            <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
              {currentIndex + 1} / {galleryImages.length}
            </span>
          </>
        )}
      </div>

      {/* Thumbnails Navigation Strip */}
      {isMultiple && (
        <div className="w-full max-w-full overflow-x-auto flex gap-3 py-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent snap-x snap-mandatory touch-pan-x">
          {galleryImages.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-20 h-20 aspect-square shrink-0 snap-start overflow-hidden border-2 transition-all cursor-pointer rounded-none ${
                currentIndex === idx
                  ? "border-[#011842] ring-2 ring-[#011842]/20"
                  : "border-gray-200 opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={src}
                alt={`${name} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
