"use client";
import * as React from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/constant/config";
import { useIsRTL } from "@/lib/hooks/useIsRTL";

import Link from "next/link";
import { useScopedI18n } from "@/locales/client";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

export default function Header() {
  const isRTL = useIsRTL();

  const t = useScopedI18n("landing");

  return (
    <>
      <div className="duration-500 mx-auto text-center animate-in fade-in-5 slide-in-from-bottom-2 flex flex-col items-center justify-center">
        <div className="fixed top-3 flex items-center space-s-1">
          <Link
            href={"https://x.com/mo3lyy"}
            target="_blank"
            rel="noopener noreferrer">
            <Button variant={"linkHover2"}>
              <ExternalLinkIcon className="me-1" /> X/Twitter
            </Button>
          </Link>
          <Link
            href={"https://github.com/mo3ly/fintrack"}
            target="_blank"
            rel="noopener noreferrer">
            <Button variant={"linkHover2"}>
              <ExternalLinkIcon className="me-1" /> Github
            </Button>
          </Link>
        </div>
        <div className="text-4xl lg:text-6xl font-bold rtl:mb-1">
          {isRTL ? siteConfig.titleAr : siteConfig.title}
        </div>
        <div className="text-lg lg:text-2xl">
          {isRTL ? siteConfig.descriptionAr : siteConfig.description}
        </div>
        <Link href={"/sign-in"} className="mt-8">
          <Button size={"lg"}>{t("CTA")}</Button>
        </Link>
      </div>
      <div className="fixed bottom-4">
        <LanguageSwitcher className="rounded-none md:rounded-md bg-primary-green border-0 w-[90px] text-black" />
      </div>
    </>
  );
}
