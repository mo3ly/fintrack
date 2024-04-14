import { SidebarLink } from "@/components/SidebarItems";
import { ArrowLeftRight, Cog, Home, Tag, User } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard", title: "لوحة التحكم", icon: Home },
  {
    href: "/transactions",
    title: "المعاملات",
    icon: ArrowLeftRight,
  },
  {
    href: "/categories",
    title: "التصنيفات",
    icon: Tag,
  },
  { href: "/account", title: "الحساب", icon: User },
  { href: "/settings", title: "الإعدادات", icon: Cog },
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
