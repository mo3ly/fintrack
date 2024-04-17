"use client";

import Link from "next/link";
// import { Link } from "next-view-transitions";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";

import { signInAction } from "@/lib/actions/users";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthFormError from "@/components/auth/AuthFormError";
import { Icons } from "@/components/icons/icons";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useScopedI18n } from "@/locales/client";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const t = useScopedI18n("auth");

  const [state, formAction] = useFormState(signInAction, {
    error: "",
  });

  const email = searchParams.get("email");
  const accountExists = searchParams.get("error");

  const hasToastBeenShown = useRef(false);
  useEffect(() => {
    if (accountExists === "account_exists" && !hasToastBeenShown.current) {
      toast.error(t("accountExistsError"));
      hasToastBeenShown.current = true;
    }
  }, [accountExists]);

  return (
    <main className="max-w-lg mx-auto my-4 bg-background md:rounded-lg p-10 duration-500 animate-in fade-in-5 slide-in-from-bottom-2">
      <h1 className="text-2xl font-bold text-center">{t("loginTitle")}</h1>
      <AuthFormError state={state} />
      <form action={formAction}>
        <Label htmlFor="email" className="text-muted-foreground">
          {t("emailLabel")}
        </Label>
        <Input name="email" id="email" type="email" required value={email!} />
        <br />
        <Label htmlFor="password" className="text-muted-foreground">
          {t("passwordLabel")}
        </Label>
        <Input type="password" name="password" id="password" required />
        <br />
        <SubmitButton label={t("submitButton")} />
      </form>
      <div className="mt-4 text-sm text-center text-muted-foreground">
        <Link href="/sign-in/google">
          <Button variant={"secondary"} className="w-full">
            <Icons.Google className="h-4 w-4 me-2" /> {t("continueWithGoogle")}
          </Button>
        </Link>
      </div>
      <div className="mt-4 text-sm text-center text-muted-foreground">
        {t("noAccountYet")}{" "}
        <Link
          href="/sign-up"
          className="text-accent-foreground underline hover:text-primary">
          {t("createAccount")}
        </Link>
      </div>
    </main>
  );
}

const SubmitButton = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      className="w-full"
      type={pending ? "button" : "submit"}
      aria-disabled={pending}
      disabled={pending}>
      {pending ? (
        <>
          <svg
            className="animate-spin ml-2 h-4 w-4 text-black"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </>
      ) : (
        <>{label}</>
      )}
      <span aria-live="polite" className="sr-only" role="status">
        {pending ? "Loading" : "Submit form"}
      </span>
    </Button>
  );
};
