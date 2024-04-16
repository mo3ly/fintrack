"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { AccountCard, AccountCardFooter, AccountCardBody } from "./AccountCard";
import { updateUser } from "@/lib/actions/users";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, Save } from "lucide-react";

export default function UpdateEmailCard({ email }: { email: string }) {
  const [state, formAction] = useFormState(updateUser, {
    error: "",
  });

  useEffect(() => {
    if (state.success == true) toast.success("تم تحديث البريد الإلكتروني");
    if (state.error) toast.error("خطأ", { description: state.error });
  }, [state]);

  return (
    <AccountCard
      params={{
        header: "بريدك الإلكتروني",
        description:
          "الرجاء إدخال عنوان البريد الإلكتروني الذي ترغب في استخدامه مع حسابك.",
      }}>
      <form action={formAction}>
        <AccountCardBody>
          <Input defaultValue={email ?? ""} name="email" />
        </AccountCardBody>
        <AccountCardFooter description="سنرسل إليك بريدًا إلكترونيًا للتحقق من التغيير.">
          <Submit />
        </AccountCardFooter>
      </form>
    </AccountCard>
  );
}

const Submit = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>
      {pending ? (
        <Loader className="me-1 h-4 w-4 animate-spin" />
      ) : (
        <Save className="me-1 h-4 w-4" />
      )}
      حفظ
    </Button>
  );
};
