"use client";
import { useCurrentLocale } from "@/locales/client";

export function useIsRTL() {
  const currentLocale = useCurrentLocale();
  return currentLocale == "ar";
}
