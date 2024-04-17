"use client";
// import Link from "next/link";
import { Link } from "next-view-transitions";
import {
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Eye,
  Plus,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CompleteTransaction } from "@/lib/db/schema/transactions";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useIsRTL } from "@/lib/hooks/useIsRTL";
import { useRouter } from "next/navigation";
import { EmptyCard } from "@/components/EmptyCard";
import { useScopedI18n } from "@/locales/client";
export default function FinanceTransactions({
  transactions,
  currency,
}: {
  transactions: CompleteTransaction[];
  currency: string | undefined;
}) {
  const isRTL = useIsRTL();
  const router = useRouter();
  const t = useScopedI18n("finance");

  return (
    <Card className="col-span-4 overflow-x-auto">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>{t("financialTransactions")}</CardTitle>
          <CardDescription>{t("latestTransactionsRecorded")}</CardDescription>
        </div>
        {transactions.length > 0 && (
          <Button asChild size="sm" className="ms-auto gap-1">
            <Link href="/transactions">
              {t("viewAll")}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {transactions.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("operation")}</TableHead>
                <TableHead>{t("amount")}</TableHead>
                <TableHead className="text-end">{t("date")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow
                  key={index}
                  className="cursor-pointer"
                  onClick={() =>
                    router.push(`/transactions/${transaction.id}`)
                  }>
                  <TableCell>
                    <div className="flex items-center">
                      {transaction.type === "revenues" ? (
                        <div className="flex items-center text-green-500 me-1">
                          <ArrowRight className="w-4 h-4 text-green-500 rtl:rotate-180 me-1" />
                        </div>
                      ) : (
                        <div className="flex items-center text-red-500 me-1">
                          <ArrowLeft className="w-4 h-4 text-red-500 rtl:rotate-180 me-1" />
                        </div>
                      )}
                      {transaction.category && (
                        <Link href={`/categories/${transaction.category.id}`}>
                          <Badge className="text-xs me-2" variant="secondary">
                            {transaction.category.name}
                          </Badge>
                        </Link>
                      )}
                      <span>{transaction.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {formatCurrency(transaction.amount, currency, isRTL)}
                  </TableCell>
                  <TableCell className="text-end">
                    {formatDate(transaction.date, isRTL)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <EmptyCard
            className="py-7"
            title={t("noTransactions")}
            description={t("noRecentTransactions")}
            icon={
              <ArrowLeftRight
                className="size-8 text-muted-foreground"
                aria-hidden="true"
              />
            }
            action={
              <Link href={"/transactions"}>
                <Button className="tour-step-3">
                  {t("create")} <Plus className="h-4 w-4 ms-1" />
                </Button>
              </Link>
            }
          />
        )}
      </CardContent>
    </Card>
  );
}
