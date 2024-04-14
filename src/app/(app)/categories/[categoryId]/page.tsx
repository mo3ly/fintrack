import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getCategoryByIdWithTransactions } from "@/lib/api/categories/queries";
import OptimisticCategory from "./OptimisticCategory";
import { checkAuth } from "@/lib/auth/utils";
import TransactionList from "@/components/transactions/TransactionList";

import Loading from "@/app/loading";

export const revalidate = 0;

export default async function CategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  return (
    <main className="overflow-auto">
      <Category id={params.categoryId} />
    </main>
  );
}

const Category = async ({ id }: { id: string }) => {
  await checkAuth();

  const { category, transactions } = await getCategoryByIdWithTransactions(id);

  if (!category) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <OptimisticCategory category={category} />
      </div>
      <div className="relative mt-8 ">
        <h3 className="text-xl font-medium mb-4">
          المعاملات الخاصة ب {category.name}
        </h3>
        <TransactionList
          categories={[]}
          categoryId={category.id}
          transactions={transactions}
        />
      </div>
    </Suspense>
  );
};
