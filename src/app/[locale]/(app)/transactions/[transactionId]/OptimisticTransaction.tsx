"use client";

import { useOptimistic, useState } from "react";
import { TAddOptimistic } from "@/app/[locale]/(app)/transactions/useOptimisticTransactions";
import { type Transaction } from "@/lib/db/schema/transactions";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import TransactionForm from "@/components/transactions/TransactionForm";
import { type Category, type CategoryId } from "@/lib/db/schema/categories";
import {
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

export default function OptimisticTransaction({
  transaction,
  categories,
  categoryId,
}: {
  transaction: Transaction;

  categories: Category[];
  categoryId?: CategoryId;
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

  return (
    <div className="/my-4">
      <Modal title="تعديل المعاملة" open={open} setOpen={setOpen}>
        <TransactionForm
          transaction={optimisticTransaction}
          categories={categories}
          categoryId={categoryId}
          closeModal={closeModal}
          openModal={openModal}
          addOptimistic={updateTransaction}
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
          تعديل <Pen className="w-4 h-4 ms-1" />
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
                <ChevronUp className="w-4 h-4 text-green-500 md:me-2" />
                ايرادات
              </div>
            ) : (
              <div className="flex items-center text-red-500">
                <ChevronDown className="w-4 h-4 text-red-500 md:me-2" />
                مصروفات
              </div>
            )}
          </div>
        </div>

        <div className="w-full mb-2">
          <Tag className="me-2 w-4 h-4 inline-flex" />
          <Link href={`/categories/${transaction.categoryId}`}>
            {/* @ts-ignore */}
            {transaction.category?.name ? (
              <Badge className="inline-flex me-2">
                {/* @ts-ignore */}
                {transaction.category?.name}
              </Badge>
            ) : (
              "غير مصنف"
            )}
          </Link>
        </div>

        <div className="w-full mb-2">
          <Coins className="me-2 w-4 h-4 inline-flex" />
          {new Intl.NumberFormat("ar-EG", {
            style: "currency",
            currency: "EGP",
            currencyDisplay: "symbol", // Options are 'symbol', 'narrowSymbol', 'code', or 'name'
            minimumFractionDigits: 0, // Do not show decimals if they are zero
            maximumFractionDigits: 2, // Maximum of 2 decimal places
          })
            .format(transaction.amount)
            .replace("ج.م.", "ج.م")}
        </div>

        <div className="w-full mb-2">
          <Calendar className="me-2 w-4 h-4 inline-flex" />
          {transaction.date
            ? new Intl.DateTimeFormat("ar-EG", {
                day: "2-digit", // Display two digits for the day
                month: "long", // Display the full name of the month
                year: "numeric", // Display the year numerically
              }).format(new Date(transaction.date))
            : "غير محدد"}
        </div>

        <div className="w-full mb-2">
          <NotebookPen className="me-2 w-4 h-4 inline-flex" />
          {optimisticTransaction.description || "لا توجد ملاحظات"}
        </div>

        <div className="w-full">
          <Image className="me-2 w-4 h-4 inline-flex" />
          {optimisticTransaction.images ? (
            <img
              src={optimisticTransaction.images}
              alt="image"
              className="rounded-lg w-44 object-cover"
            />
          ) : (
            "لا توجد صور"
          )}
        </div>
      </div>
      {/* <pre
        className={cn(
          "bg-secondary p-4 rounded-lg break-all text-wrap",
          optimisticTransaction.id === "optimistic" ? "animate-pulse" : ""
        )}>
        {JSON.stringify(optimisticTransaction, null, 2)}
      </pre> */}
    </div>
  );
}
