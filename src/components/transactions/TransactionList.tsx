"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  type Transaction,
  CompleteTransaction,
} from "@/lib/db/schema/transactions";
import Modal from "@/components/shared/Modal";
import { type Category, type CategoryId } from "@/lib/db/schema/categories";
import { useOptimisticTransactions } from "@/app/(app)/transactions/useOptimisticTransactions";
import { Button } from "@/components/ui/button";
import TransactionForm from "./TransactionForm";
import { ChevronUp, ChevronDown, Eye, PlusIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import StatsCard from "@/app/(app)/dashboard/StatsCard";

type TOpenModal = (transaction?: Transaction) => void;

export default function TransactionList({
  transactions,
  categories,
  categoryId,
}: {
  transactions: CompleteTransaction[];
  categories: Category[];
  categoryId?: CategoryId;
}) {
  const { optimisticTransactions, addOptimisticTransaction } =
    useOptimisticTransactions(transactions, categories);
  const [open, setOpen] = useState(false);
  const [activeTransaction, setActiveTransaction] =
    useState<Transaction | null>(null);
  const openModal = (transaction?: Transaction) => {
    setOpen(true);
    transaction
      ? setActiveTransaction(transaction)
      : setActiveTransaction(null);
  };
  const closeModal = () => setOpen(false);

  const totalRevenues = transactions.reduce((acc, transaction) => {
    if (transaction.type === "revenues") {
      return acc + transaction.amount;
    }
    return acc;
  }, 0);

  const totalExpenses = transactions.reduce((acc, transaction) => {
    if (transaction.type === "expenses") {
      return acc + transaction.amount;
    }
    return acc;
  }, 0);

  const netIncome = totalRevenues - totalExpenses;

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activeTransaction ? "تعديل العملية" : "إنشاء عملية"}>
        <TransactionForm
          transaction={activeTransaction}
          addOptimistic={addOptimisticTransaction}
          openModal={openModal}
          closeModal={closeModal}
          categories={categories}
          categoryId={categoryId}
        />
      </Modal>
      <div className="absolute end-0 top-0 ">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
      {optimisticTransactions.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <>
          <div className="grid gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3 ">
            <StatsCard
              revenue={new Intl.NumberFormat("ar-EG", {
                style: "currency",
                currency: "EGP",
                currencyDisplay: "symbol",
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })
                .format(totalRevenues)
                .replace("ج.م.", "ج.م")}
              change=""
              title="إجمالي الإيرادات"
              className="bg-green-200 border-green-100 dark:border-green-800  text-black"
            />
            <StatsCard
              revenue={new Intl.NumberFormat("ar-EG", {
                style: "currency",
                currency: "EGP",
                currencyDisplay: "symbol",
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })
                .format(totalExpenses)
                .replace("ج.م.", "ج.م")}
              change=""
              title="إجمالي المصروفات"
              className="bg-red-200 border-red-100 dark:border-red-800  text-black"
            />
            <StatsCard
              revenue={new Intl.NumberFormat("ar-EG", {
                style: "currency",
                currency: "EGP",
                currencyDisplay: "symbol",
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })
                .format(netIncome)
                .replace("ج.م.", "ج.م")}
              change=""
              title="الدخل الصافي"
              className="bg-yellow-200 border-yellow-100 dark:border-yellow-800  text-black"
            />
          </div>

          <ul className="animate-in fade-in-5 slide-in-from-bottom-2">
            {optimisticTransactions.map((transaction) => (
              <Transaction
                transaction={transaction}
                key={transaction.id}
                openModal={openModal}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

const Transaction = ({
  transaction,
  openModal,
}: {
  transaction: CompleteTransaction;
  openModal: TOpenModal;
}) => {
  const optimistic = transaction.id === "optimistic";
  const deleting = transaction.id === "delete";
  const mutating = optimistic || deleting;
  const pathname = usePathname();
  const basePath = pathname.includes("transactions")
    ? pathname
    : pathname + "/transactions/";

  return (
    <li
      className={cn(
        "flex justify-between items-center my-2 border px-3 py-2 rounded-lg ",
        mutating ? "opacity-30 animate-pulse" : "",
        deleting ? "text-destructive" : ""
      )}>
      <div className="w-full truncate">
        <div className="flex items-center">
          <div className="inline-flex me-2">
            {transaction.type === "revenues" ? (
              <div className="flex items-center text-green-500">
                <ChevronUp className="w-4 h-4 text-green-500 md:me-2" />
                <span className="hidden md:block">ايرادات</span>
              </div>
            ) : (
              <div className="flex items-center text-red-500">
                <ChevronDown className="w-4 h-4 text-red-500 md:me-2" />
                <span className="hidden md:block">مصروفات</span>
              </div>
            )}
          </div>
          {transaction.category?.name && (
            <Link href={`/categories/${transaction.category?.id}`}>
              <Badge className="inline-flex me-2">
                {transaction.category?.name}
              </Badge>
            </Link>
          )}
          {transaction.title}
        </div>
      </div>

      <div className="w-44 font-semibold">
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

      <div className="w-44 truncate">
        {transaction.date
          ? new Intl.DateTimeFormat("ar-EG", {
              day: "2-digit", // Display two digits for the day
              month: "long", // Display the full name of the month
              year: "numeric", // Display the year numerically
            }).format(new Date(transaction.date))
          : "غير محدد"}
      </div>
      <Button variant={"link"} asChild>
        <Link href={basePath + "/" + transaction.id}>
          <span className="hidden md:block">معاينة</span>{" "}
          <Eye className="ms-1 h-4 w-4" />
        </Link>
      </Button>
    </li>
  );
};

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        لا توجد معاملات
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        ابدأ بإنشاء معاملة جديدة.
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> معاملات جديدة
        </Button>
      </div>
    </div>
  );
};
