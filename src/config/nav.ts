import { SidebarLink } from "@/components/SidebarItems";
import { ArrowLeftRight, Cog, Home, Tag, User } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  {
    href: "/dashboard",
    titleAr: "لوحة التحكم",
    titleEn: "Dashboard",
    icon: Home,
  },
  {
    href: "/transactions",
    titleAr: "المعاملات",
    titleEn: "Transactions",
    icon: ArrowLeftRight,
  },
  {
    href: "/categories",
    titleAr: "التصنيفات",
    titleEn: "Categories",
    icon: Tag,
  },
  { href: "/account", titleAr: "الحساب", titleEn: "Account", icon: User },
  { href: "/settings", titleAr: "الإعدادات", titleEn: "Settings", icon: Cog },
];

export const additionalLinks: AdditionalLinks[] = [
  // {
  //   title: "Entities",
  //   links: [
  //     {
  //       href: "/transactions",
  //       title: "Transactions",
  //       icon: ArrowLeftRight,
  //     },
  //     {
  //       href: "/categories",
  //       title: "Categories",
  //       icon: Tag,
  //     },
  //   ],
  // },
];
