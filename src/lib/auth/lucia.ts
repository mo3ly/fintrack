import { cookies } from "next/headers";
import { cache } from "react";

import { type Session, type User, Lucia, TimeSpan } from "lucia";
import { db } from "@/lib/db/index";

import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { sessions, users } from "../db/schema/auth";

export const adapter = new DrizzleSQLiteAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  sessionExpiresIn: new TimeSpan(30, "d"), // https://github.com/iamtouha/next-lucia-auth/blob/main/src/lib/auth/index.ts
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      email: attributes.email,
      name: attributes.name,
      avatarUrl: attributes.avatarUrl,
      role: attributes.role,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  email: string;
  name: string;
  avatarUrl: string;
  role: "admin" | "supporter" | "user";
}

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    // next.js throws when you attempt to set cookie when rendering page
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
    } catch {}
    return result;
  }
);
