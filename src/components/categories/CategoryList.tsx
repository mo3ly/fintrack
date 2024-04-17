"use client";

import { useState } from "react";
// import Link from "next/link";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";

import { type Category, CompleteCategory } from "@/lib/db/schema/categories";
import Modal from "@/components/shared/Modal";

import { useOptimisticCategories } from "@/app/[locale]/(app)/categories/useOptimisticCategories";
import { Button } from "@/components/ui/button";
import CategoryForm from "./CategoryForm";
import { Eye, PlusIcon } from "lucide-react";
import { useScopedI18n } from "@/locales/client";

type TOpenModal = (category?: Category) => void;

export default function CategoryList({
  categories,
}: {
  categories: CompleteCategory[];
}) {
  const t = useScopedI18n("categories");
  const { optimisticCategories, addOptimisticCategory } =
    useOptimisticCategories(categories);
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CompleteCategory | null>(
    null
  );

  const openModal = (category?: CompleteCategory) => {
    setOpen(true);
    category ? setActiveCategory(category) : setActiveCategory(null);
  };
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activeCategory ? t("editCategory") : t("createCategory")}>
        <CategoryForm
          category={activeCategory}
          addOptimistic={addOptimisticCategory}
          closeModal={closeModal}
        />
      </Modal>
      <div className="absolute end-0 top-0">
        <Button onClick={() => openModal()} variant="secondary">
          <PlusIcon className="h-4 w-4 me-1" /> {t("newCategory")}
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
  const t = useScopedI18n("categories");

  return (
    <li
      className={`flex justify-between items-center my-2 border px-3 py-2 rounded-lg ${
        mutating ? "opacity-30 animate-pulse" : ""
      } ${deleting ? "text-destructive" : ""}`}>
      <div className="w-full">
        <div>{category.name}</div>
      </div>
      <Button className="px-1" variant="link" asChild>
        <Link href={`${basePath}/${category.id}`}>
          {t("preview")} <Eye className="ms-1 h-4 w-4" />
        </Link>
      </Button>
    </li>
  );
};

const EmptyState = ({ openModal }: { openModal: () => void }) => {
  const t = useScopedI18n("categories");
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        {t("noCategories")}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {t("startCreatingCategories")}
      </p>
      <div className="mt-6">
        <Button onClick={openModal}>
          <PlusIcon className="h-4" /> {t("newCategory")}
        </Button>
      </div>
    </div>
  );
};
