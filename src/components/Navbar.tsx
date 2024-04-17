"use client";

// import Link from "next/link";
import { Link } from "next-view-transitions";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

import { AlignRight } from "lucide-react";
import { defaultLinks } from "@/config/nav";
import { siteConfig } from "@/constant/config";
import SignOutBtn from "@/components/auth/SignOutBtn";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useCurrentLocale } from "@/locales/client";
import { useIsRTL } from "@/lib/hooks/useIsRTL";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const currentLocale = useCurrentLocale();
  const isRTL = useIsRTL();

  return (
    <div className="md:hidden mb-4 pb-2 w-full /sticky-top sticky top-4 z-10 block">
      <nav className="flex justify-between w-full items-center bg-primary-green text-black p-2 rounded-lg">
        <Link href={"/dashboard"}>
          <div className="font-semibold ps-3 text-lg">
            {isRTL ? siteConfig.titleAr : siteConfig.title}
          </div>
        </Link>
        <div></div>
        <Button
          className="tour-step-mobile-1"
          variant="ghost"
          onClick={() => setOpen(!open)}>
          <AlignRight />
        </Button>
      </nav>
      {open ? (
        <div className="mt-2 rounded-lg absolute mb-4 p-4 w-full bg-muted  duration-500 animate-in fade-in-5 slide-in-from-top-2">
          <ul className="space-y-2">
            {defaultLinks.map((link) => (
              <li
                key={isRTL ? link.titleAr : link.titleEn}
                onClick={() => setOpen(false)}
                className="w-full">
                <Link
                  href={link.href}
                  className={cn(
                    pathname === link.href
                      ? "text-primary hover:text-primary font-semibold"
                      : "text-muted-foreground hover:text-primary",
                    "w-full block"
                  )}>
                  <link.icon className="h-4 mb-1 me-1 inline-flex" />
                  {isRTL ? link.titleAr : link.titleEn}
                </Link>
              </li>
            ))}
            <div className="flex items-center space-s-2 pt-2">
              <SignOutBtn />
              <LanguageSwitcher className="w-[120px]" />
            </div>
          </ul>
        </div>
      ) : null}
    </div>
  );
}
