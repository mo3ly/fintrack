import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { categories } from "./categories";
import { type getTransactions } from "@/lib/api/transactions/queries";

import { nanoid, timestamps } from "@/lib/utils";
import { zNumber } from "@/lib/utils";

export const transactions = sqliteTable("transactions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  title: text("title").notNull(),
  description: text("description"),
  images: text("images"),
  amount: integer("amount").notNull(),
  type: text("type").notNull(),
  status: text("status"),
  date: integer("date", { mode: "timestamp" }).notNull(),
  categoryId: text("category_id").notNull(),
  userId: text("user_id").notNull(),

  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// Schema for transactions - used to validate API requests
const baseSchema = createSelectSchema(transactions).omit(timestamps);

export const insertTransactionSchema =
  createInsertSchema(transactions).omit(timestamps);
export const insertTransactionParams = baseSchema
  .extend({
    amount: zNumber,
    date: z.coerce.date(),
    title: z.coerce
      .string({ required_error: "عنوان المعاملة مطلوبة!" })
      .min(1, { message: "عنوان المعاملة مطلوبة!" }),
    categoryId: z.coerce
      .string({ required_error: "الفئة مطلوبة!" })
      .min(1, { message: "الفئة مطلوبة!" }),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateTransactionSchema = baseSchema;
export const updateTransactionParams = baseSchema
  .extend({
    amount: zNumber,
    date: z.coerce.date(),
    title: z.coerce
      .string({ required_error: "عنوان المعاملة مطلوبة!" })
      .min(1, { message: "عنوان المعاملة مطلوبة!" }),
    categoryId: z.coerce
      .string({ required_error: "الفئة مطلوبة!" })
      .min(1, { message: "الفئة مطلوبة!" }),
  })
  .omit({
    userId: true,
  });
export const transactionIdSchema = baseSchema.pick({ id: true });

// Types for transactions - used to type API request params and within Components
export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = z.infer<typeof insertTransactionSchema>;
export type NewTransactionParams = z.infer<typeof insertTransactionParams>;
export type UpdateTransactionParams = z.infer<typeof updateTransactionParams>;
export type TransactionId = z.infer<typeof transactionIdSchema>["id"];

// this type infers the return from getTransactions() - meaning it will include any joins
export type CompleteTransaction = Awaited<
  ReturnType<typeof getTransactions>
>["transactions"][number];
