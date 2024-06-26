"use client";

import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { signOutAction } from "@/lib/actions/users";
import { useScopedI18n } from "@/locales/client";

export default function SignOutBtn() {
  return (
    <form action={signOutAction} className="w-full text-start">
      <Btn />
    </form>
  );
}

const Btn = () => {
  const t = useScopedI18n("auth");
  const { pending } = useFormStatus();
  return (
    <Button
      type={pending ? "button" : "submit"}
      aria-disabled={pending}
      variant={"destructive"}
      disabled={pending}>
      {pending ? (
        <>
          <svg
            className="animate-spin h-4 w-4 text-black"
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
        <>{t("signout")}</>
      )}
      <span aria-live="polite" className="sr-only" role="status">
        {pending ? "Loading" : "Submit form"}
      </span>
    </Button>
  );
};
