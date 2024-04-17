"use client";

import { useState } from "react";
// import Link from "next/link";
import { Link } from "next-view-transitions";
import { usePathname, useRouter } from "next/navigation";

import { cn, formatCurrency, formatDate } from "@/lib/utils";
import {
  type Transaction,
  CompleteTransaction,
} from "@/lib/db/schema/transactions";
import Modal from "@/components/shared/Modal";
import { type Category, type CategoryId } from "@/lib/db/schema/categories";
import { useOptimisticTransactions } from "@/app/[locale]/(app)/transactions/useOptimisticTransactions";
import { Button } from "@/components/ui/button";
import TransactionForm from "./TransactionForm";
import {
  ChevronUp,
  ChevronDown,
  Eye,
  PlusIcon,
  Plus,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import StatsCard from "@/app/[locale]/(app)/dashboard/_components/StatsCard";
import { useIsRTL } from "@/lib/hooks/useIsRTL";
import { useScopedI18n } from "@/locales/client";

type TOpenModal = (transaction?: Transaction) => void;

export default function TransactionList({
  transactions,
  categories,
  categoryId,
  currency,
}: {
  transactions: CompleteTransaction[];
  categories: Category[];
  categoryId?: CategoryId;
  currency: string | undefined;
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
  const isRTL = useIsRTL();

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

  const t = useScopedI18n("transactions");

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={
          activeTransaction ? t("editTransaction") : t("createTransaction")
        }>
        <TransactionForm
          transaction={activeTransaction}
          addOptimistic={addOptimisticTransaction}
          openModal={openModal}
          closeModal={closeModal}
          categories={categories}
          categoryId={categoryId}
          currency={currency}
        />
      </Modal>
      <div className="absolute end-0 top-0 ">
        <Button onClick={() => openModal()} variant={"secondary"}>
          <Plus className="h-4 w-4 me-1" /> {t("newTransaction")}
        </Button>
      </div>
      {optimisticTransactions.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <>
          {/* grid gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3  */}
          <div className="flex space-s-2 md:grid md:gap-4 md:grid-cols-3 w-full overflow-x-auto my-4">
            <StatsCard
              revenue={formatCurrency(totalRevenues, currency, isRTL)}
              change=""
              title={t("totalRevenues")}
              className="bg-green-200 border-green-100 dark:border-green-800  text-black"
            />
            <StatsCard
              revenue={formatCurrency(totalExpenses, currency, isRTL)}
              change=""
              title={t("totalExpenses")}
              className="bg-red-200 border-red-100 dark:border-red-800  text-black"
            />
            <StatsCard
              revenue={formatCurrency(netIncome, currency, isRTL)}
              change=""
              title={t("netIncome")}
              className="bg-yellow-200 border-yellow-100 dark:border-yellow-800  text-black"
            />
          </div>

          <ul className="animate-in fade-in-5 slide-in-from-bottom-2">
            {optimisticTransactions.map((transaction) => (
              <Transaction
                transaction={transaction}
                key={transaction.id}
                openModal={openModal}
                currency={currency}
                isRTL={isRTL}
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
  currency,
  isRTL,
}: {
  transaction: CompleteTransaction;
  openModal: TOpenModal;
  currency: string | undefined;
  isRTL: boolean;
}) => {
  const optimistic = transaction.id === "optimistic";
  const deleting = transaction.id === "delete";
  const mutating = optimistic || deleting;
  const pathname = usePathname();
  const basePath = pathname.includes("transactions")
    ? pathname
    : pathname + "/transactions/";
  const router = useRouter();

  return (
    <li
      className={cn(
        "flex justify-between items-center  border-b py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-900 px-3",
        mutating ? "opacity-30 animate-pulse" : "",
        deleting ? "text-destructive" : ""
      )}
      onClick={() => router.push(`/transactions/${transaction.id}`)}>
      <div className="w-full truncate">
        <div className="flex items-center">
          <div className="inline-flex me-2">
            {transaction.type === "revenues" ? (
              <div className="flex items-center text-green-500">
                <ArrowRight className="w-4 h-4 text-green-500 rtl:rotate-180 md:me-2" />
                {/* <span className="hidden md:block">ايرادات</span> */}
              </div>
            ) : (
              <div className="flex items-center text-red-500">
                <ArrowLeft className="w-4 h-4 text-red-500 rtl:rotate-180 md:me-2" />
                {/* <span className="hidden md:block">مصروفات</span> */}
              </div>
            )}
          </div>
          <div className="flex items-center">
            {transaction.category?.name && (
              <Link href={`/categories/${transaction.category?.id}`}>
                <Badge
                  variant={"secondary"}
                  className="inline-flex md: md:text-xs text-[0.6rem] me-2 px-1.5 md:font-medium font-normal md:px-2.5">
                  {transaction.category?.name}
                </Badge>
              </Link>
            )}
            <span className="/block text-xs md:text-sm">
              {transaction.title}
            </span>
          </div>
        </div>
      </div>

      <div className="text-xs md:text-sm w-32 md:w-44 font-medium">
        {formatCurrency(transaction.amount, currency, isRTL)}
      </div>

      <div className="text-xs md:text-sm w-32 md:w-44 text-end text-zinc-400">
        {transaction.date ? formatDate(transaction.date, isRTL) : "غير محدد"}
      </div>
      {/* <Button variant={"link"} asChild className="px-1">
        <Link href={basePath + "/" + transaction.id}>
          <span className="hidden md:block">معاينة</span>{" "}
          <Eye className="ms-1 h-4 w-4" />
        </Link>
      </Button> */}
    </li>
  );
};

const EmptyState = ({ openModal }: { openModal: () => void }) => {
  const t = useScopedI18n("transactions");

  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        {t("noTransactions")}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {t("startCreatingTransaction")}
      </p>
      <div className="mt-6">
        <Button onClick={openModal}>
          <PlusIcon className="h-4" /> {t("newTransaction")}
        </Button>
      </div>
    </div>
  );
};
