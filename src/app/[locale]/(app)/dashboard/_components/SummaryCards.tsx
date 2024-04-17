"use client";
import * as React from "react";

import StatsCard from "@/app/[locale]/(app)/dashboard/_components/StatsCard";
import { useIsRTL } from "@/lib/hooks/useIsRTL";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { TransactionSummary } from "@/lib/api/transactions/queries";

export default function SummaryCards({
  currency,
  summary,
}: {
  currency: string | undefined;
  summary: TransactionSummary;
}) {
  const isRTL = useIsRTL();

  return (
    <div className="flex space-s-2 md:grid md:gap-4 md:grid-cols-3 w-full overflow-x-auto">
      <StatsCard
        revenue={`${formatNumber(summary.totalCount, isRTL)} معاملة`}
        change=""
        title="عدد المعاملات"
        className="w-44 flex-shrink-0 md:w-auto"
      />
      <StatsCard
        revenue={formatCurrency(summary.totalRevenues, currency, isRTL)}
        change=""
        title="إجمالي الإيرادات"
        className="w-44 flex-shrink-0 md:w-auto"
      />
      <StatsCard
        revenue={formatCurrency(summary.totalExpenses, currency, isRTL)}
        change=""
        title="إجمالي المصروفات"
        className="w-44 flex-shrink-0 md:w-auto"
      />
    </div>
  );
}
