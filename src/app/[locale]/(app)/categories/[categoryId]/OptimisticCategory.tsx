"use client";

import { useOptimistic, useState } from "react";
import { TAddOptimistic } from "@/app/[locale]/(app)/categories/useOptimisticCategories";
import { type Category } from "@/lib/db/schema/categories";

import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import CategoryForm from "@/components/categories/CategoryForm";
import { Pen } from "lucide-react";
import { BackButton } from "@/components/shared/BackButton";
import { useScopedI18n } from "@/locales/client";
export default function OptimisticCategory({
  category,
}: {
  category: Category;
}) {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const [optimisticCategory, setOptimisticCategory] = useOptimistic(category);
  const updateCategory: TAddOptimistic = (input) =>
    setOptimisticCategory({ ...input.data });
  const t = useScopedI18n("categories");

  return (
    <div className="/my-4">
      <Modal title={t("editCategory")} open={open} setOpen={setOpen}>
        <CategoryForm
          category={optimisticCategory}
          closeModal={closeModal}
          openModal={openModal}
          addOptimistic={updateCategory}
        />
      </Modal>
      <div className="flex justify-between items-end mb-4">
        <div className="flex items-center space-s-2">
          <BackButton currentResource="categories" />
          <h1 className="font-semibold text-2xl">{optimisticCategory.name}</h1>
        </div>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          <Pen className="w-4 h-4 me-1" />
          {t("edit")}
        </Button>
      </div>
    </div>
  );
}
