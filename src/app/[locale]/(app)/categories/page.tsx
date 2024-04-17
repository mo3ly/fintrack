import { Suspense } from "react";

import Loading from "@/app/[locale]/(app)/dashboard/loading";
import CategoryList from "@/components/categories/CategoryList";
import { getCategories } from "@/lib/api/categories/queries";

import { checkAuth } from "@/lib/auth/utils";
import { getScopedI18n } from "@/locales/server";

export const revalidate = 0;

export default async function CategoriesPage() {
  const t = await getScopedI18n("categories");

  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl mb-2">{t("title")}</h1>
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
