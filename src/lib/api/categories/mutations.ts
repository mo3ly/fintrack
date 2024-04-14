import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  CategoryId, 
  NewCategoryParams,
  UpdateCategoryParams, 
  updateCategorySchema,
  insertCategorySchema, 
  categories,
  categoryIdSchema 
} from "@/lib/db/schema/categories";
import { getUserAuth } from "@/lib/auth/utils";

export const createCategory = async (category: NewCategoryParams) => {
  const { session } = await getUserAuth();
  const newCategory = insertCategorySchema.parse({ ...category, userId: session?.user.id! });
  try {
    const [c] =  await db.insert(categories).values(newCategory).returning();
    return { category: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCategory = async (id: CategoryId, category: UpdateCategoryParams) => {
  const { session } = await getUserAuth();
  const { id: categoryId } = categoryIdSchema.parse({ id });
  const newCategory = updateCategorySchema.parse({ ...category, userId: session?.user.id! });
  try {
    const [c] =  await db
     .update(categories)
     .set({...newCategory, updatedAt: new Date().toISOString().slice(0, 19).replace("T", " ") })
     .where(and(eq(categories.id, categoryId!), eq(categories.userId, session?.user.id!)))
     .returning();
    return { category: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCategory = async (id: CategoryId) => {
  const { session } = await getUserAuth();
  const { id: categoryId } = categoryIdSchema.parse({ id });
  try {
    const [c] =  await db.delete(categories).where(and(eq(categories.id, categoryId!), eq(categories.userId, session?.user.id!)))
    .returning();
    return { category: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

