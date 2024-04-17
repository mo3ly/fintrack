"use client";
import * as React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "next-view-transitions";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useIsRTL } from "@/lib/hooks/useIsRTL";
import { useScopedI18n } from "@/locales/client";

export default function PeriodSelector() {
  const searchParams = useSearchParams();
  const isRTL = useIsRTL();

  function getValidPeriod(period: any) {
    const validPeriods = ["daily", "monthly", "yearly"];
    return validPeriods.includes(period) ? period : "daily";
  }

  const period = getValidPeriod(searchParams.get("period"));
  const t = useScopedI18n("common");

  return (
    <Tabs
      defaultValue={period}
      className={cn("space-y-4  my-4", isRTL && "rtl-grid")}>
      <TabsList>
        <Link href={"/dashboard?period=daily"}>
          <TabsTrigger value="daily">{t("daily")}</TabsTrigger>
        </Link>
        <Link href={"/dashboard?period=monthly"}>
          <TabsTrigger value="monthly">{t("monthly")}</TabsTrigger>
        </Link>
        <Link href={"/dashboard?period=yearly"}>
          <TabsTrigger value="yearly">{t("yearly")}</TabsTrigger>
        </Link>
      </TabsList>
    </Tabs>
  );
}
