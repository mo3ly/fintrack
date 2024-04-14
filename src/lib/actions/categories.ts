"use server";

import { revalidatePath } from "next/cache";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/lib/api/categories/mutations";
import {
  CategoryId,
  NewCategoryParams,
  UpdateCategoryParams,
  categoryIdSchema,
  insertCategoryParams,
  updateCategoryParams,
} from "@/lib/db/schema/categories";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCategories = () => revalidatePath("/categories");

export const createCategoryAction = async (input: NewCategoryParams) => {
  try {
    const payload = insertCategoryParams.parse(input);
    await createCategory(payload);
    revalidateCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCategoryAction = async (input: UpdateCategoryParams) => {
  try {
    const payload = updateCategoryParams.parse(input);
    await updateCategory(payload.id, payload);
    revalidateCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCategoryAction = async (input: CategoryId) => {
  try {
    const payload = categoryIdSchema.parse({ id: input });
    await deleteCategory(payload.id);
    revalidateCategories();
  } catch (e) {
    return handleErrors(e);
  }
};