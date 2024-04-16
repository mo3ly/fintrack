"use client";
import * as React from "react";

import { siteConfig } from "@/constant/config";

import Link from "next/link";
import { useIsRTL } from "@/lib/hooks/useIsRTL";

export default function Title() {
  const isRTL = useIsRTL();

  return (
    <Link href={"/"}>
      <h3 className="text-3xl md:text-4xl text-black font-semibold text-center">
        {isRTL ? siteConfig.titleAr : siteConfig.title}
      </h3>
    </Link>
  );
}
