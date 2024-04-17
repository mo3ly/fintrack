"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { AccountCard, AccountCardFooter, AccountCardBody } from "./AccountCard";
import { updateUser } from "@/lib/actions/users";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, Save } from "lucide-react";
import { useScopedI18n } from "@/locales/client";

export default function UpdateEmailCard({ email }: { email: string }) {
  const t = useScopedI18n("account");
  const [state, formAction] = useFormState(updateUser, {
    error: "",
  });

  useEffect(() => {
    if (state.success) toast.success(t("emailUpdated"));
    if (state.error) toast.error(t("error"), { description: state.error });
  }, [state]);

  return (
    <AccountCard
      params={{
        header: t("yourEmail"),
        description: t("enterEmailDescription"),
      }}>
      <form action={formAction}>
        <AccountCardBody>
          <Input defaultValue={email ?? ""} name="email" />
        </AccountCardBody>
        <AccountCardFooter description={t("verificationEmailSent")}>
          <Submit />
        </AccountCardFooter>
      </form>
    </AccountCard>
  );
}

const Submit = () => {
  const t = useScopedI18n("account");
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>
      {pending ? (
        <Loader className="me-1 h-4 w-4 animate-spin" />
      ) : (
        <Save className="me-1 h-4 w-4" />
      )}
      {t("save")}
    </Button>
  );
};
