import React from "react";
import { PageBanner } from "@/components/global/PageBanner";

export function AboutHero({ hero }: { hero:any }) {
  return (
    <PageBanner
      title={hero?.title || "Connecting Quality"}
      highlightText={hero?.sub || "With Global Markets"}
      bgImage={hero?.image || "/about/banner.png"}
    />
  );
}
