import { getCategoryById, getCategories } from "@/lib/api/categories/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  categoryIdSchema,
  insertCategoryParams,
  updateCategoryParams,
} from "@/lib/db/schema/categories";
import { createCategory, deleteCategory, updateCategory } from "@/lib/api/categories/mutations";

export const categoriesRouter = router({
  getCategories: publicProcedure.query(async () => {
    return getCategories();
  }),
  getCategoryById: publicProcedure.input(categoryIdSchema).query(async ({ input }) => {
    return getCategoryById(input.id);
  }),
  createCategory: publicProcedure
    .input(insertCategoryParams)
    .mutation(async ({ input }) => {
      return createCategory(input);
    }),
  updateCategory: publicProcedure
    .input(updateCategoryParams)
    .mutation(async ({ input }) => {
      return updateCategory(input.id, input);
    }),
  deleteCategory: publicProcedure
    .input(categoryIdSchema)
    .mutation(async ({ input }) => {
      return deleteCategory(input.id);
    }),
});
