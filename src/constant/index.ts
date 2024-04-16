export const DOMAINS = {
  LOCALHOST: "localhost:3000",
  ROOT_DOMAIN:
    (process.env.NEXT_PUBLIC_ROOT_DOMAIN as string) || "www.fintrack.cash",
};

export const ROOT_DOMAIN =
  process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
    ? DOMAINS.ROOT_DOMAIN
    : DOMAINS.LOCALHOST;

export const FULL_ROOT_DOMAIN =
  process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
    ? "https://" + DOMAINS.ROOT_DOMAIN
    : "http://" + DOMAINS.LOCALHOST;
