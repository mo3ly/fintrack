"use client";

import { useOptimistic, useState } from "react";
import { TAddOptimistic } from "@/app/[locale]/(app)/transactions/useOptimisticTransactions";
import { type Transaction } from "@/lib/db/schema/transactions";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import TransactionForm from "@/components/transactions/TransactionForm";
import { type Category, type CategoryId } from "@/lib/db/schema/categories";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronDown,
  ChevronUp,
  Coins,
  Image,
  Notebook,
  NotebookPen,
  Pen,
  Tag,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
// import Link from "next/link";
import { Link } from "next-view-transitions";
import { BackButton } from "@/components/shared/BackButton";
import { useIsRTL } from "@/lib/hooks/useIsRTL";
import { useScopedI18n } from "@/locales/client";

export default function OptimisticTransaction({
  transaction,
  categories,
  categoryId,
  categoryType,
  currency,
}: {
  transaction: Transaction;

  categories: Category[];
  categoryId?: CategoryId;
  categoryType?: string;
  currency: string | undefined;
}) {
  const [open, setOpen] = useState(false);
  const openModal = (_?: Transaction) => {
    setOpen(true);
  };
  const closeModal = () => setOpen(false);
  const [optimisticTransaction, setOptimisticTransaction] =
    useOptimistic(transaction);
  const updateTransaction: TAddOptimistic = (input) =>
    setOptimisticTransaction({ ...input.data });

  const isRTL = useIsRTL();
  const t = useScopedI18n("transactions");
  return (
    <div className="/my-4">
      <Modal title={t("editTransaction")} open={open} setOpen={setOpen}>
        <TransactionForm
          transaction={optimisticTransaction}
          categories={categories}
          categoryId={categoryId}
          categoryType={categoryType}
          closeModal={closeModal}
          openModal={openModal}
          addOptimistic={updateTransaction}
          currency={currency}
        />
      </Modal>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-s-2">
          <BackButton currentResource="transactions" />
          <h1 className="font-semibold text-2xl">
            {optimisticTransaction.title}
          </h1>
        </div>
        <Button
          className=""
          variant={"secondary"}
          onClick={() => setOpen(true)}>
          <Pen className="w-4 h-4 me-1" />
          {t("edit")}
        </Button>
      </div>
      <div
        className={cn(
          "/bg-secondary border p-4 rounded-lg break-all text-wrap",
          optimisticTransaction.id === "optimistic" ? "animate-pulse" : ""
        )}>
        <div className="w-full mb-2">
          <div className="inline-flex me-2">
            {transaction.type === "revenues" ? (
              <div className="flex items-center text-green-500">
                <ArrowRight className="w-4 h-4 text-green-500 rtl:rotate-180 md:me-2" />
                <span className="hidden md:block">{t("revenues")}</span>
              </div>
            ) : (
              <div className="flex items-center text-red-500">
                <ArrowLeft className="w-4 h-4 text-red-500 rtl:rotate-180 md:me-2" />
                <span className="hidden md:block">{t("expenses")}</span>
              </div>
            )}
          </div>
        </div>

        {/* @ts-ignore */}
        {transaction.category != null && (
          <div className="w-full mb-2">
            <Tag className="me-2 w-4 h-4 inline-flex" />
            <Link href={`/categories/${transaction.categoryId}`}>
              {/* @ts-ignore */}
              <Badge className="inline-flex me-2">
                {/* @ts-ignore */}
                {transaction.category?.name}
              </Badge>
            </Link>
          </div>
        )}

        <div className="w-full mb-2">
          <Coins className="me-2 w-4 h-4 inline-flex" />
          {formatCurrency(transaction.amount, currency, isRTL)}
        </div>

        <div className="w-full mb-2">
          <Calendar className="me-2 w-4 h-4 inline-flex" />
          {transaction.date ? formatDate(transaction.date, isRTL) : "غير محدد"}
        </div>

        {optimisticTransaction.description && (
          <div className="w-full mb-2">
            <NotebookPen className="me-2 w-4 h-4 inline-flex" />
            {optimisticTransaction.description}
          </div>
        )}

        <div className="w-full">
          <Image className="me-2 w-4 h-4 inline-flex" />
          {optimisticTransaction.images ? (
            <img
              src={optimisticTransaction.images}
              alt="image"
              className="rounded-lg w-44 object-cover"
            />
          ) : (
            <>{t("noImage")}</>
          )}
        </div>
      </div>
    </div>
  );
}
