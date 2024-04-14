import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getTransactionById } from "@/lib/api/transactions/queries";
import { getCategories } from "@/lib/api/categories/queries";
import OptimisticTransaction from "@/app/(app)/transactions/[transactionId]/OptimisticTransaction";
import { checkAuth } from "@/lib/auth/utils";

import Loading from "@/app/(app)/settings/loading";

export const revalidate = 0;

export default async function TransactionPage({
  params,
}: {
  params: { transactionId: string };
}) {
  return (
    <main className="overflow-auto">
      <Transaction id={params.transactionId} />
    </main>
  );
}

const Transaction = async ({ id }: { id: string }) => {
  await checkAuth();

  const { transaction } = await getTransactionById(id);
  const { categories } = await getCategories();

  if (!transaction) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <OptimisticTransaction
          transaction={transaction}
          categories={categories}
          categoryId={transaction.categoryId}
        />
      </div>
    </Suspense>
  );
};
