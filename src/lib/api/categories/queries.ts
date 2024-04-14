import { db } from "@/lib/db/index";
import { eq, and, desc } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import {
  type CategoryId,
  categoryIdSchema,
  categories,
} from "@/lib/db/schema/categories";
import {
  transactions,
  type CompleteTransaction,
} from "@/lib/db/schema/transactions";

export const getCategories = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(categories)
    .where(eq(categories.userId, session?.user.id!))
    .orderBy(desc(categories.createdAt));
  const c = rows;
  return { categories: c };
};

export const getCategoryById = async (id: CategoryId) => {
  const { session } = await getUserAuth();
  const { id: categoryId } = categoryIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(categories)
    .where(
      and(
        eq(categories.id, categoryId),
        eq(categories.userId, session?.user.id!)
      )
    );
  if (row === undefined) return {};
  const c = row;
  return { category: c };
};

export const getCategoryByIdWithTransactions = async (id: CategoryId) => {
  const { session } = await getUserAuth();
  const { id: categoryId } = categoryIdSchema.parse({ id });
  const rows = await db
    .select({ category: categories, transaction: transactions })
    .from(categories)
    .where(
      and(
        eq(categories.id, categoryId),
        eq(categories.userId, session?.user.id!)
      )
    )
    .leftJoin(transactions, eq(categories.id, transactions.categoryId));
  if (rows.length === 0) return {};
  const c = rows[0].category;
  const ct = rows
    .filter((r) => r.transaction !== null)
    .map((t) => t.transaction) as CompleteTransaction[];

  return { category: c, transactions: ct };
};
