import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { type Cookie } from "lucia";

import { validateRequest } from "./lucia";
import {
  RegistrationSchema,
  UsernameAndPassword,
  authenticationSchema,
  registrationSchema,
} from "../db/schema/auth";

export type AuthSession = {
  session: {
    user: {
      id: string;
      name?: string;
      email?: string;
      username?: string;
      avatarUrl?: string;
      currency?: string;
      role?: "admin" | "supporter" | "user";
    };
  } | null;
};

export const getUserAuth = async (): Promise<AuthSession> => {
  const { session, user } = await validateRequest();
  if (!session) return { session: null };
  return {
    session: {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
        currency: user.currency,
        role: user.role,
      },
    },
  };
};

export const checkAuth = async () => {
  const { session } = await validateRequest();
  if (!session) redirect("/sign-in");
};

export const genericError = { error: "Error, please try again." };

export const setAuthCookie = (cookie: Cookie) => {
  // cookies().set(cookie.name, cookie.value, cookie.attributes); // <- suggested approach from the docs, but does not work with `next build` locally
  cookies().set(cookie);
};

const getErrorMessage = (errors: any): string => {
  if (errors) return "البريد الإلكتروني وكلمة المرور غير صالحين!";
  // if (errors.email) return "البريد الإلكتروني غير صالح!";
  // if (errors.password) return "Invalid Password - " + errors.password[0];
  return ""; // return a default error message or an empty string
};

export const validateAuthFormData = (
  formData: FormData
):
  | { data: UsernameAndPassword; error: null }
  | { data: null; error: string } => {
  const email = formData.get("email");
  const password = formData.get("password");
  const result = authenticationSchema.safeParse({ email, password });

  if (!result.success) {
    return {
      data: null,
      error: getErrorMessage(result.error.flatten().fieldErrors),
    };
  }

  return { data: result.data, error: null };
};

export const validateRegistrationFormData = (
  formData: FormData
):
  | { data: RegistrationSchema; error: null }
  | { data: null; error: string } => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const result = registrationSchema.safeParse({ name, email, password });

  if (!result.success) {
    return {
      data: null,
      error: getErrorMessage(result.error.flatten().fieldErrors),
    };
  }

  return { data: result.data, error: null };
};
