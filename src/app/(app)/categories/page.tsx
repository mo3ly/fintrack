import { Suspense } from "react";

import Loading from "@/app/(app)/settings/loading";
import CategoryList from "@/components/categories/CategoryList";
import { getCategories } from "@/lib/api/categories/queries";

import { checkAuth } from "@/lib/auth/utils";

export const revalidate = 0;

export default async function CategoriesPage() {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">التصنيفات</h1>
        </div>
        <Categories />
      </div>
    </main>
  );
}

const Categories = async () => {
  await checkAuth();

  const { categories } = await getCategories();

  return (
    <Suspense fallback={<Loading />}>
      <CategoryList categories={categories} />
    </Suspense>
  );
};
