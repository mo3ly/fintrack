import { sql } from "drizzle-orm";
import { text, sqliteTable } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getCategories } from "@/lib/api/categories/queries";

import { nanoid, timestamps } from "@/lib/utils";

export const categories = sqliteTable("categories", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
  type: text("type").notNull(),

  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// Schema for categories - used to validate API requests
const baseSchema = createSelectSchema(categories).omit(timestamps);

export const insertCategorySchema =
  createInsertSchema(categories).omit(timestamps);
export const insertCategoryParams = baseSchema
  .extend({
    name: z
      .string({ required_error: "required" })
      .min(2, { message: "Can't be less than 2 characters!" }),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateCategorySchema = baseSchema;
export const updateCategoryParams = baseSchema
  .extend({
    name: z
      .string({ required_error: "required" })
      .min(2, { message: "Can't be less than 2 characters!" }),
  })
  .omit({
    userId: true,
  });
export const categoryIdSchema = baseSchema.pick({ id: true });

// Types for categories - used to type API request params and within Components
export type Category = typeof categories.$inferSelect;
export type NewCategory = z.infer<typeof insertCategorySchema>;
export type NewCategoryParams = z.infer<typeof insertCategoryParams>;
export type UpdateCategoryParams = z.infer<typeof updateCategoryParams>;
export type CategoryId = z.infer<typeof categoryIdSchema>["id"];

// this type infers the return from getCategories() - meaning it will include any joins
export type CompleteCategory = Awaited<
  ReturnType<typeof getCategories>
>["categories"][number];
