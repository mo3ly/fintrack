"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

import { AlignRight } from "lucide-react";
import { defaultLinks } from "@/config/nav";
import { siteConfig } from "@/constant/config";
import SignOutBtn from "@/components/auth/SignOutBtn";
import { AuthSession } from "@/lib/auth/utils";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useCurrentLocale } from "@/locales/client";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const currentLocale = useCurrentLocale();
  return (
    <div className="md:hidden mb-4 pb-2 w-full /sticky-top sticky top-4 z-10 block">
      <nav className="flex justify-between w-full items-center bg-primary-green text-black p-2 rounded-lg">
        <Link href={"/dashboard"}>
          <div className="font-semibold ps-3 text-lg">
            {currentLocale == "en" ? siteConfig.title : siteConfig.titleAr}
            {/* | {siteConfig.title} */}
          </div>
        </Link>
        <div></div>
        <Button variant="ghost" onClick={() => setOpen(!open)}>
          <AlignRight />
        </Button>
      </nav>
      {open ? (
        <div className="mt-2 rounded-lg mb-4 p-4 bg-muted  duration-500 animate-in fade-in-5 slide-in-from-top-2">
          <ul className="space-y-2">
            {defaultLinks.map((link) => (
              <li
                key={link.title}
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
                  {link.title}
                </Link>
              </li>
            ))}
            <div className="flex items-center space-s-2">
              <SignOutBtn />
              <LanguageSwitcher />
            </div>
          </ul>
        </div>
      ) : null}
    </div>
  );
}

const UserDetails = ({ session }: { session: AuthSession }) => {
  if (session.session === null) return null;
  const { user } = session.session;

  if (!user?.name || user.name.length == 0) return null;

  return (
    <Link href="/account">
      <div className="flex items-center justify-between w-full border-t border-border pt-4 px-2">
        <div className="text-muted">
          <p className="text-xs">{user.name ?? "John Doe"}</p>
          <p className="text-xs font-light pe-4">
            {user.email ?? "john@doe.com"}
          </p>
        </div>
        <Avatar className="h-10 w-10">
          <AvatarFallback className="border-border bg-black border-2 text-muted-foreground">
            {user.name
              ? user.name
                  ?.split(" ")
                  .map((word) => word[0].toUpperCase())
                  .join("")
              : "~"}
          </AvatarFallback>
        </Avatar>
      </div>
    </Link>
  );
};
