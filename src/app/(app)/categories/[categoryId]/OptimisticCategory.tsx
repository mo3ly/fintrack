"use client";

import { useOptimistic, useState } from "react";
import { TAddOptimistic } from "@/app/(app)/categories/useOptimisticCategories";
import { type Category } from "@/lib/db/schema/categories";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import CategoryForm from "@/components/categories/CategoryForm";
import { Pen } from "lucide-react";
import { BackButton } from "@/components/shared/BackButton";

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
    <div className="/my-4">
      <Modal title="تعديل التصنيف" open={open} setOpen={setOpen}>
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
        <Button
          className=""
          variant={"secondary"}
          onClick={() => setOpen(true)}>
          تعديل <Pen className="w-4 h-4 ms-1" />
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
