"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { type Category, CompleteCategory } from "@/lib/db/schema/categories";
import Modal from "@/components/shared/Modal";

import { useOptimisticCategories } from "@/app/(app)/categories/useOptimisticCategories";
import { Button } from "@/components/ui/button";
import CategoryForm from "./CategoryForm";
import { Eye, PlusIcon } from "lucide-react";

type TOpenModal = (category?: Category) => void;

export default function CategoryList({
  categories,
}: {
  categories: CompleteCategory[];
}) {
  const { optimisticCategories, addOptimisticCategory } =
    useOptimisticCategories(categories);
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const openModal = (category?: Category) => {
    setOpen(true);
    category ? setActiveCategory(category) : setActiveCategory(null);
  };
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activeCategory ? "تعديل التصنيف" : "إنشاء تصنيف"}>
        <CategoryForm
          category={activeCategory}
          addOptimistic={addOptimisticCategory}
          openModal={openModal}
          closeModal={closeModal}
        />
      </Modal>
      <div className="absolute end-0 top-0 ">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
      {optimisticCategories.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ul className="animate-in fade-in-5 slide-in-from-bottom-2">
          {optimisticCategories.map((category) => (
            <Category
              category={category}
              key={category.id}
              openModal={openModal}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

const Category = ({
  category,
  openModal,
}: {
  category: CompleteCategory;
  openModal: TOpenModal;
}) => {
  const optimistic = category.id === "optimistic";
  const deleting = category.id === "delete";
  const mutating = optimistic || deleting;
  const pathname = usePathname();
  const basePath = pathname.includes("categories")
    ? pathname
    : pathname + "/categories/";

  return (
    <li
      className={cn(
        "flex justify-between items-center my-2 border px-3 py-2 rounded-lg ",
        mutating ? "opacity-30 animate-pulse" : "",
        deleting ? "text-destructive" : ""
      )}>
      <div className="w-full">
        <div>{category.name}</div>
      </div>
      <Button variant={"link"} asChild>
        <Link href={basePath + "/" + category.id}>
          معاينة <Eye className="ms-1 h-4 w-4" />
        </Link>
      </Button>
    </li>
  );
};

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        لا توجد تصنيفات
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        ابدأ بإنشاء تصنيف جديد.
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> تصنيفات جديدة{" "}
        </Button>
      </div>
    </div>
  );
};
