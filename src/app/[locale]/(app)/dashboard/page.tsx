import { OverviewChart } from "@/app/[locale]/(app)/dashboard/_components/OverviewChart";
import RecentTransactions from "@/app/[locale]/(app)/dashboard/_components/RecentTransactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserAuth } from "@/lib/auth/utils";
import {
  TimeInterval,
  getTransactionSummary,
  getRecentTransactions,
} from "@/lib/api/transactions/queries";
import PeriodSelector from "@/app/[locale]/(app)/dashboard/_components/PeriodSelector";
import SummaryCards from "@/app/[locale]/(app)/dashboard/_components/SummaryCards";
import RevenueExpensesChart from "@/app/[locale]/(app)/dashboard/_components/RevenueExpensesChart";

export default async function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { session } = await getUserAuth();

  function getValidPeriod(period: any) {
    const validPeriods = ["daily", "monthly", "yearly"];
    return validPeriods.includes(period) ? period : "daily";
  }

  const period = getValidPeriod(searchParams?.period);

  // @ts-ignore
  const result = await getTransactionSummary(period);
  const { transactions } = await getRecentTransactions(5);

  return (
    <main className="">
      <h1 className="text-2xl font-semibold mb-2">لوحة التحكم</h1>
      <PeriodSelector />
      <div className="animate-in fade-in-5 slide-in-from-bottom-2 tour-step-2">
        <SummaryCards summary={result} currency={session?.user.currency} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8 my-4">
          <Card className="col-span-4  tour-step-3">
            <CardHeader>
              <CardTitle>احصائيات</CardTitle>
            </CardHeader>
            <CardContent className="ps-2" dir="ltr">
              <RevenueExpensesChart
                totalExpenses={result.totalExpenses}
                totalRevenues={result.totalRevenues}
                currency={session?.user.currency}
              />
              {/* <OverviewChart /> */}
            </CardContent>
          </Card>

          <RecentTransactions
            transactions={transactions}
            currency={session?.user.currency}
          />
        </div>
      </div>
    </main>
  );
}
