import { cookies } from "next/headers";

// @ts-ignore
import { generateState, Google, OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { z } from "zod";

import { oauthAccount, users } from "@/lib/db/schema";

import { lucia } from "../lucia";
import { getBaseUrl } from "@/lib/trpc/utils";
import { env } from "@/lib/env.mjs";
import { db } from "@/lib/db";
import { DEFAULT_CURRENCY } from "@/constant/config";

const baseUrl = getBaseUrl();

// https://github.com/ixahmedxi/orbitkit/blob/main/packages/auth/src/providers/google.ts
const google = new Google(
  env.GOOGLE_ID,
  env.GOOGLE_SECRET,
  `${process.env.NEXT_PUBLIC_APP_URL}/api/login/google/callback`
);

// add rate limited for it
export async function createGoogleAuthorizationURL(): Promise<Response> {
  const state = generateState();
  const url = await google.createAuthorizationURL(
    state,
    env.GOOGLE_CODE_VERIFIER,
    {
      scopes: ["profile", "email"],
    }
  );

  cookies().set("google_oauth_state", state, {
    path: "/",
    secure: env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  return Response.redirect(url);
}

const googleUser = z.object({
  sub: z.string(),
  email: z.string(),
  picture: z.string(),
  name: z.string(),
});

// check here if localhost then redirect to app.localhost
export async function validateGoogleCallback(
  request: Request
): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("google_oauth_state")?.value ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(
      code,
      env.GOOGLE_CODE_VERIFIER
    );
    const googleUserResponse = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
    const parsedRes = googleUser.safeParse(await googleUserResponse.json());

    if (!parsedRes.success) {
      return new Response(null, {
        status: 400,
      });
    }

    const { sub, email, picture, name } = parsedRes.data;

    const existingAccount = await db.query.oauthAccount.findFirst({
      where: (table, { and, eq }) =>
        and(eq(table.providerId, "google"), eq(table.providerUserId, sub)),
    });

    if (existingAccount) {
      const session = await lucia.createSession(existingAccount.userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );

      return new Response(null, {
        status: 302,
        headers: {
          Location: "/dashboard",
        },
      });
    }

    const existingUser = await db.query.users.findFirst({
      where: (table, { eq }) => eq(table.email, email),
    });

    if (existingUser) {
      console.log(
        "User's email is already associated with an existing account."
      );
      return new Response(null, {
        status: 302,
        headers: {
          Location: `/sign-in?error=account_exists&email=${email}`,
        },
      });
    }

    const userId = generateId(15);
    await db.insert(users).values({
      id: userId,
      email,
      avatarUrl: picture,
      currency: DEFAULT_CURRENCY,
      name,
    });
    await db.insert(oauthAccount).values({
      providerId: "google",
      providerUserId: sub,
      userId,
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/dashboard",
      },
    });
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400,
      });
    }

    return new Response(null, {
      status: 500,
    });
  }
}
