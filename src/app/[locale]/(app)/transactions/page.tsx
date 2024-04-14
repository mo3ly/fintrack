import { Suspense } from "react";

import Loading from "@/app/[locale]/(app)/settings/loading";
import TransactionList from "@/components/transactions/TransactionList";
import { getTransactions } from "@/lib/api/transactions/queries";
import { getCategories } from "@/lib/api/categories/queries";
import { checkAuth } from "@/lib/auth/utils";

export const revalidate = 0;

export default async function TransactionsPage() {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">المعاملات</h1>
        </div>
        <Transactions />
      </div>
    </main>
  );
}

const Transactions = async () => {
  await checkAuth();

  const { transactions } = await getTransactions();
  const { categories } = await getCategories();
  return (
    <Suspense fallback={<Loading />}>
      <TransactionList transactions={transactions} categories={categories} />
    </Suspense>
  );
};
