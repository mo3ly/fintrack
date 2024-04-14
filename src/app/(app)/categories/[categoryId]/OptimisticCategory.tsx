"use client";

import { useOptimistic, useState } from "react";
import { TAddOptimistic } from "@/app/(app)/categories/useOptimisticCategories";
import { type Category } from "@/lib/db/schema/categories";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import CategoryForm from "@/components/categories/CategoryForm";

export default function OptimisticCategory({
  category,
}: {
  category: Category;
}) {
  const [open, setOpen] = useState(false);
  const openModal = (_?: Category) => {
    setOpen(true);
  };
  const closeModal = () => setOpen(false);
  const [optimisticCategory, setOptimisticCategory] = useOptimistic(category);
  const updateCategory: TAddOptimistic = (input) =>
    setOptimisticCategory({ ...input.data });

  return (
    <div className="m-4">
      <Modal title="تعديل التصنيف" open={open} setOpen={setOpen}>
        <CategoryForm
          category={optimisticCategory}
          closeModal={closeModal}
          openModal={openModal}
          addOptimistic={updateCategory}
        />
      </Modal>
      <div className="flex justify-between items-end mb-4">
        <h1 className="font-semibold text-2xl">{optimisticCategory.name}</h1>
        <Button className="" onClick={() => setOpen(true)}>
          تعديل
        </Button>
      </div>
      {/* <pre
        className={cn(
          "bg-secondary p-4 rounded-lg break-all text-wrap",
          optimisticCategory.id === "optimistic" ? "animate-pulse" : ""
        )}>
        {JSON.stringify(optimisticCategory, null, 2)}
      </pre> */}
    </div>
  );
}
