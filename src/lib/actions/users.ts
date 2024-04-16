"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { Argon2id } from "oslo/password";
import { lucia, validateRequest } from "../auth/lucia";
import { generateId } from "lucia";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/index";

import {
  genericError,
  setAuthCookie,
  validateAuthFormData,
  getUserAuth,
  validateRegistrationFormData,
} from "../auth/utils";
import { users, updateUserSchema } from "../db/schema/auth";
import { DEFAULT_CURRENCY } from "@/constant/config";

interface ActionResult {
  error: string;
}

export async function signInAction(
  _: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const { data, error } = validateAuthFormData(formData);
  if (error !== null) return { error };

  try {
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email.toLowerCase()));
    if (!existingUser) {
      return {
        error: "البريد الإلكتروني وكلمة المرور غير صالحين",
      };
    }

    // special cased created for users with oauth
    if (!existingUser.hashedPassword) {
      return {
        error:
          "It looks like you've previously signed in with Google. Please use Google Sign-In to continue.",
      };
    }

    const validPassword = await new Argon2id().verify(
      existingUser.hashedPassword,
      data.password
    );
    if (!validPassword) {
      return {
        error: "البريد الإلكتروني وكلمة المرور غير صالحين",
      };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    setAuthCookie(sessionCookie);

    return redirect("/dashboard");
  } catch (e) {
    return genericError;
  }
}

export async function signUpAction(
  _: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const { data, error } = validateRegistrationFormData(formData);

  if (error !== null) return { error };

  const hashedPassword = await new Argon2id().hash(data.password);
  const userId = generateId(15);

  try {
    await db.insert(users).values({
      id: userId,
      email: data.email,
      name: data.name,
      currency: DEFAULT_CURRENCY,
      hashedPassword,
    });
  } catch (e) {
    if (typeof e === "object" && e !== null && "code" in e) {
      const error = e as { code: string };
      if (error.code === "SQLITE_CONSTRAINT") {
        return {
          error:
            "The email address is already in use. Please use a different email or log in to your existing account.",
        };
      }
    }
    return genericError;
  }

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  setAuthCookie(sessionCookie);
  return redirect("/dashboard");
}

export async function signOutAction(): Promise<ActionResult> {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  setAuthCookie(sessionCookie);
  redirect("/sign-in");
}

export async function updateUser(
  _: any,
  formData: FormData
): Promise<ActionResult & { success?: boolean }> {
  const { session } = await getUserAuth();
  if (!session) return { error: "Unauthorised" };

  const name = formData.get("name") ?? undefined;
  const email = formData.get("email") ?? undefined;

  const result = updateUserSchema.safeParse({ name, email });

  if (!result.success) {
    const error = result.error.flatten().fieldErrors;
    if (error.name) return { error: "Invalid name - " + error.name[0] };
    if (error.email) return { error: "Invalid email - " + error.email[0] };
    return genericError;
  }

  try {
    await db
      .update(users)
      .set({ ...result.data })
      .where(eq(users.id, session.user.id));
    revalidatePath("/account");
    return { success: true, error: "" };
  } catch (e) {
    return genericError;
  }
}
