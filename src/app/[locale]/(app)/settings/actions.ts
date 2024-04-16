"use server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { ActionResult } from "next/dist/server/app-render/types";
import { revalidatePath } from "next/cache";
import { currencies } from "@/constant/config";

export async function updateCurrency(
  _: any,
  formData: FormData
): Promise<ActionResult & { success?: boolean }> {
  const { session } = await getUserAuth();
  if (!session) return { error: "Unauthorised" };

  const code = (formData.get("currency") as string) ?? undefined;
  if (!code || !currencies.some((currency) => currency.code === code))
    return { error: "invalid option" };

  try {
    await db
      .update(users)
      .set({ currency: code })
      .where(eq(users.id, session?.user.id));

    revalidatePath("/settings");
    return { success: true, error: "" };
  } catch {
    return { error: "Error, try again later." };
  }
}
