import RecentTransactions from "@/app/(app)/dashboard/RecentTransactions";
import StatsCard from "@/app/(app)/dashboard/StatsCard";
import SignOutBtn from "@/components/auth/SignOutBtn";
import { getUserAuth } from "@/lib/auth/utils";

export default async function Home() {
  const { session } = await getUserAuth();
  return (
    <main className="">
      <h1 className="text-2xl font-semibold mb-4">لوحة التحكم</h1>
      {/* <pre className="bg-secondary p-4 rounded-lg my-2">
        {JSON.stringify(session, null, 2)}
      </pre> */}
      <div className="animate-in fade-in-5 slide-in-from-bottom-2">
        <div className="grid gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3 ">
          <StatsCard
            revenue="٠ معاملة"
            // change="زيادة 15.5% من الشهر الماضي"
            change=""
            title="عدد المعاملات"
            // className="bg-yellow-200 border-yellow-100 dark:border-yellow-800  text-black"
          />
          <StatsCard
            revenue="٠ جنيه"
            // change="زيادة 20.1% من الشهر الماضي"
            change=""
            title="إجمالي الإيرادات"
            // className="bg-blue-200 border-blue-100 dark:border-blue-800 text-black"
          />
          <StatsCard
            revenue="٠ جنيه"
            // change="زيادة 5.0% من الشهر الماضي"
            change=""
            title="إجمالي المصروفات"
            // className="bg-red-200 border-red-100 dark:border-red-800 text-black"
          />
        </div>

        <div className="my-8">
          <RecentTransactions />
        </div>
      </div>
    </main>
  );
}
