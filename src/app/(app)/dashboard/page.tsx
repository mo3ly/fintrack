import { OverviewChart } from "@/app/(app)/dashboard/OverviewChart";
import RecentTransactions from "@/app/(app)/dashboard/RecentTransactions";
import StatsCard from "@/app/(app)/dashboard/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserAuth } from "@/lib/auth/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Home() {
  const { session } = await getUserAuth();
  return (
    <main className="">
      <h1 className="text-2xl font-semibold my-2">لوحة التحكم</h1>
      {/* <pre className="bg-secondary p-4 rounded-lg my-2">
        {JSON.stringify(session, null, 2)}
      </pre> */}

      <Tabs defaultValue="daily" className="space-y-4 rtl-grid my-4">
        <TabsList>
          <TabsTrigger value="daily">يومي</TabsTrigger>
          <TabsTrigger value="monthly" disabled>
            شهري
          </TabsTrigger>
          <TabsTrigger value="yearly" disabled>
            سنوي
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="animate-in fade-in-5 slide-in-from-bottom-2">
        <div className="flex space-s-2 md:grid md:gap-4 md:grid-cols-3 w-full overflow-x-auto">
          <StatsCard
            revenue="٠ معاملة"
            // change="زيادة 15.5% من الشهر الماضي"
            change=""
            title="عدد المعاملات"
            // className="bg-yellow-200 border-yellow-100 dark:border-yellow-800  text-black"
            className="w-44 flex-shrink-0 md:w-auto"
          />
          <StatsCard
            revenue="٠ جنيه"
            // change="زيادة 20.1% من الشهر الماضي"
            change=""
            title="إجمالي الإيرادات"
            // className="bg-blue-200 border-blue-100 dark:border-blue-800 text-black"

            className="w-44 flex-shrink-0 md:w-auto"
          />
          <StatsCard
            revenue="٠ جنيه"
            // change="زيادة 5.0% من الشهر الماضي"
            change=""
            title="إجمالي المصروفات"
            // className="bg-red-200 border-red-100 dark:border-red-800 text-black"

            className="w-44 flex-shrink-0 md:w-auto"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8 my-4">
          <Card className="col-span-4">
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
