"use client";

import Link from "next/link";
// import { Link } from "next-view-transitions";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";

import { signUpAction } from "@/lib/actions/users";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthFormError from "@/components/auth/AuthFormError";
import { Icons } from "@/components/icons/icons";
import { useScopedI18n } from "@/locales/client";

export default function SignUpPage() {
  const t = useScopedI18n("auth");
  const [state, formAction] = useFormState(signUpAction, {
    error: "",
  });

  return (
    <main className="max-w-lg w-full mx-auto my-4 bg-background md:rounded-lg p-10 duration-500 animate-in fade-in-5 slide-in-from-bottom-2">
      <h1 className="text-2xl font-bold text-center">{t("createAccount")}</h1>
      <AuthFormError state={state} />
      <form action={formAction}>
        <Label htmlFor="name" className="text-muted-foreground">
          {t("nameLabel")}
        </Label>
        <Input name="name" type="name" id="name" required />
        <br />
        <Label htmlFor="email" className="text-muted-foreground">
          {t("emailLabel")}
        </Label>
        <Input name="email" type="email" id="email" required />
        <br />
        <Label htmlFor="password" className="text-muted-foreground">
          {t("passwordLabel")}
        </Label>
        <Input type="password" name="password" id="password" required />
        <br />
        <SubmitButton label={t("createAccountButton")} />
      </form>
      <div className="mt-4 text-sm text-center text-muted-foreground">
        <Link href="/sign-in/google">
          <Button variant={"secondary"} className="w-full">
            <Icons.Google className="h-4 w-4 me-2" /> {t("continueWithGoogle")}
          </Button>
        </Link>
      </div>
      <div className="mt-4 text-sm text-center text-muted-foreground">
        {t("alreadyHaveAccount")}{" "}
        <Link href="/sign-in" className="text-secondary-foreground underline">
          {t("login")}
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
