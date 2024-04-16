"use client";
import * as React from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/constant/config";
import { useIsRTL } from "@/lib/hooks/useIsRTL";

import Link from "next/link";

export default function Header() {
  const isRTL = useIsRTL();

  return (
    <>
      <div className="duration-500 mx-auto text-center animate-in fade-in-5 slide-in-from-bottom-2 flex flex-col items-center justify-center">
        <div className="text-4xl lg:text-6xl font-bold rtl:mb-1">
          {isRTL ? siteConfig.titleAr : siteConfig.title}
        </div>
        <div className="text-lg lg:text-2xl">
          {isRTL ? siteConfig.descriptionAr : siteConfig.description}
        </div>
        <Link href={"/sign-in"} className="mt-8">
          <Button size={"lg"}>
            {isRTL ? "سجل وابدأ الآن!" : "Let's start!"}
          </Button>
        </Link>
      </div>
      <div className="fixed bottom-4">
        <LanguageSwitcher className="rounded-none md:rounded-md bg-primary-green border-0 w-[90px] text-black" />
      </div>
    </>
  );
}
