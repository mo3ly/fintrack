"use client";
import * as React from "react";

import StatsCard from "@/app/[locale]/(app)/dashboard/_components/StatsCard";
import { useIsRTL } from "@/lib/hooks/useIsRTL";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { TransactionSummary } from "@/lib/api/transactions/queries";
import { useScopedI18n } from "@/locales/client";

export default function SummaryCards({
  currency,
  summary,
}: {
  currency: string | undefined;
  summary: TransactionSummary;
}) {
  const isRTL = useIsRTL();
  const t = useScopedI18n("dashboard");

  return (
    <div className="flex space-s-2 md:grid md:gap-4 md:grid-cols-3 w-full overflow-x-auto">
      <StatsCard
        revenue={`${formatNumber(summary.totalCount, isRTL)} ${t(
          "transactionsCount"
        )}`}
        change=""
        title={t("transactionsCountTitle")}
        className="w-44 flex-shrink-0 md:w-auto"
      />
      <StatsCard
        revenue={formatCurrency(summary.totalRevenues, currency, isRTL)}
        change=""
        title={t("totalRevenuesTitle")}
        className="w-44 flex-shrink-0 md:w-auto"
      />
      <StatsCard
        revenue={formatCurrency(summary.totalExpenses, currency, isRTL)}
        change=""
        title={t("totalExpensesTitle")}
        className="w-44 flex-shrink-0 md:w-auto"
      />
    </div>
  );
}
