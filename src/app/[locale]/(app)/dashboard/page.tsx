import { OverviewChart } from "@/app/[locale]/(app)/dashboard/OverviewChart";
import RecentTransactions from "@/app/[locale]/(app)/dashboard/RecentTransactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserAuth } from "@/lib/auth/utils";
import {
  TimeInterval,
  getTransactionSummary,
} from "@/lib/api/transactions/queries";
import PeriodSelector from "@/app/[locale]/(app)/dashboard/PeriodSelector";
import SummaryCards from "@/app/[locale]/(app)/dashboard/SummaryCards";

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
              <OverviewChart />
            </CardContent>
          </Card>

          <RecentTransactions />
        </div>
      </div>
    </main>
  );
}
