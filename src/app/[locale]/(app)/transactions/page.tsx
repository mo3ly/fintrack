import { Suspense } from "react";

import Loading from "@/app/[locale]/(app)/dashboard/loading";
import TransactionList from "@/components/transactions/TransactionList";
import { getTransactions } from "@/lib/api/transactions/queries";
import { getCategories } from "@/lib/api/categories/queries";
import { checkAuth, getUserAuth } from "@/lib/auth/utils";

export const revalidate = 0;

export default async function TransactionsPage() {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl mb-2">المعاملات</h1>
        </div>
        <Transactions />
      </div>
    </main>
  );
}

const Transactions = async () => {
  await checkAuth();
  const { session } = await getUserAuth();

  const { transactions } = await getTransactions();
  const { categories } = await getCategories();
  return (
    <Suspense fallback={<Loading />}>
      <TransactionList
        transactions={transactions}
        categories={categories}
        currency={session?.user.currency}
      />
    </Suspense>
  );
};
