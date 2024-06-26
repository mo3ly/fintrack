import { db } from "@/lib/db/index";
import { eq, and, desc, sql, between } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import {
  type TransactionId,
  transactionIdSchema,
  transactions,
} from "@/lib/db/schema/transactions";
import { categories } from "@/lib/db/schema/categories";

export const getTransactions = async () => {
  const { session } = await getUserAuth();
  // if (!session) return "UNAUTHRIZED";
  if (!session) return { transactions: [] };

  const rows = await db
    .select({ transaction: transactions, category: categories })
    .from(transactions)
    .leftJoin(categories, eq(transactions.categoryId, categories.id))
    .where(eq(transactions.userId, session?.user.id!))
    .orderBy(desc(transactions.createdAt));
  const t = rows.map((r) => ({ ...r.transaction, category: r.category }));
  return { transactions: t };
};

export const getTransactionById = async (id: TransactionId) => {
  const { session } = await getUserAuth();
  if (!session) return { transactions: [] };

  const { id: transactionId } = transactionIdSchema.parse({ id });
  const [row] = await db
    .select({ transaction: transactions, category: categories })
    .from(transactions)
    .where(
      and(
        eq(transactions.id, transactionId),
        eq(transactions.userId, session?.user.id!)
      )
    )
    .leftJoin(categories, eq(transactions.categoryId, categories.id));
  if (row === undefined) return {};
  const t = { ...row.transaction, category: row.category };
  return { transaction: t };
};

export enum TimeInterval {
  Daily = "daily",
  Monthly = "monthly",
  Yearly = "yearly",
}
export interface TransactionSummary {
  totalCount: number;
  totalRevenues: number;
  totalExpenses: number;
}
export const getTransactionSummary = async (
  interval: TimeInterval
): Promise<TransactionSummary> => {
  const { session } = await getUserAuth();
  if (!session) return { totalCount: 0, totalRevenues: 0, totalExpenses: 0 };

  const now = new Date();
  let startDate: Date;

  switch (interval) {
    case TimeInterval.Daily:
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case TimeInterval.Monthly:
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case TimeInterval.Yearly:
      startDate = new Date(now.getFullYear(), 0, 1);
      break;
    default:
      throw new Error("Invalid time interval");
  }

  const [summary] = await db
    .select({
      totalExpenses: sql`SUM(CASE WHEN type = 'expenses' THEN amount ELSE 0 END)`,
      totalRevenues: sql`SUM(CASE WHEN type = 'revenues' THEN amount ELSE 0 END)`,
      totalCount: sql`COUNT(*)`,
    })
    .from(transactions)
    .where(
      and(
        eq(transactions.userId, session?.user.id!),
        between(transactions.date, startDate, now)
      )
    );

  if (!summary) {
    return { totalCount: 0, totalRevenues: 0, totalExpenses: 0 };
  }

  return {
    totalCount: Number(summary?.totalCount ?? 0),
    totalRevenues: Number(summary?.totalRevenues ?? 0),
    totalExpenses: Number(summary?.totalExpenses ?? 0),
  };
};

export async function getRecentTransactions(limit: number) {
  const { session } = await getUserAuth();
  if (!session) return { transactions: [] };

  const rows = await db
    .select({ transaction: transactions, category: categories })
    .from(transactions)
    .leftJoin(categories, eq(transactions.categoryId, categories.id))
    .where(eq(transactions.userId, session?.user.id!))
    .orderBy(desc(transactions.createdAt))
    .limit(limit);

  const t = rows.map((r) => ({ ...r.transaction, category: r.category }));
  return { transactions: t };
}
