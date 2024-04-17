"use client";
import { siteConfig } from "@/constant/config";
import { useIsRTL } from "@/lib/hooks/useIsRTL";
// import Link from 'next/link';
import { Link } from "next-view-transitions";
import * as React from "react";

export default function SidebarLogo() {
  const isRTL = useIsRTL();
  return (
    <Link href={"/dashboard"}>
      <h3 className="text-2xl font-semibold ms-4">
        {isRTL ? siteConfig.titleAr : siteConfig.title}
      </h3>
    </Link>
  );
}
