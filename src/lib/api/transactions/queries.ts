import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type TransactionId, transactionIdSchema, transactions } from "@/lib/db/schema/transactions";
import { categories } from "@/lib/db/schema/categories";

export const getTransactions = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ transaction: transactions, category: categories }).from(transactions).leftJoin(categories, eq(transactions.categoryId, categories.id)).where(eq(transactions.userId, session?.user.id!));
  const t = rows .map((r) => ({ ...r.transaction, category: r.category})); 
  return { transactions: t };
};

export const getTransactionById = async (id: TransactionId) => {
  const { session } = await getUserAuth();
  const { id: transactionId } = transactionIdSchema.parse({ id });
  const [row] = await db.select({ transaction: transactions, category: categories }).from(transactions).where(and(eq(transactions.id, transactionId), eq(transactions.userId, session?.user.id!))).leftJoin(categories, eq(transactions.categoryId, categories.id));
  if (row === undefined) return {};
  const t =  { ...row.transaction, category: row.category } ;
  return { transaction: t };
};


