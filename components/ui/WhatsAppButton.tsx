"use client";

import React from "react";


export default function WhatsAppButton({whatsapp}:{whatsapp:any}) {

  return (
    <a
      href={whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    className="
    fixed
    right-4
    bottom-5
    z-[9999]
    group
    flex
    items-center
    md:right-0
    md:top-[58%]
    md:bottom-auto
    md:-translate-y-1/2
    "
    >
      {/* Button */}
      <div
        className="
          flex items-center
          gap-2
          bg-[#25D366]
          text-white
          shadow-lg
          rounded-l-full
          pl-3
          pr-4
          py-3
          transition-all
          duration-300
          hover:pr-5
          hover:shadow-xl
        "
      >
        {/* WhatsApp Icon */}
        <div className="w-10 h-10 flex items-center justify-center">
          <svg
            className="w-7 h-7"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.49 0 .15 5.34.15 11.9c0 2.1.55 4.15 1.6 5.96L.05 24l6.29-1.65a11.85 11.85 0 0 0 5.7 1.46h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.43-8.43ZM12.05 21.8h-.01a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.73.98 1-3.64-.23-.37a9.9 9.9 0 1 1 8.37 4.62Zm5.43-7.43c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.77-1.64-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.64-.93-2.25-.24-.59-.49-.51-.68-.52h-.58c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.24 5.13 4.54.72.31 1.28.5 1.72.64.72.23 1.37.2 1.88.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
          </svg>
        </div>

        {/* Text */}
        <span
          className="
            max-w-0
            overflow-hidden
            whitespace-nowrap
            opacity-0
            group-hover:max-w-[150px]
            group-hover:opacity-100
            transition-all
            duration-300
            font-semibold
            text-sm
          "
        >
          Chat on WhatsApp
        </span>
      </div>
    </a>
  );
}

