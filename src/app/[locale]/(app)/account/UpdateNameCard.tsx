"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { AccountCard, AccountCardFooter, AccountCardBody } from "./AccountCard";
import { updateUser } from "@/lib/actions/users";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, Save } from "lucide-react";
export default function UpdateNameCard({ name }: { name: string }) {
  const [state, formAction] = useFormState(updateUser, {
    error: "",
  });

  useEffect(() => {
    if (state.success == true) toast.success("تم تحديث المستخدم");
    if (state.error) toast.error("خطأ", { description: state.error });
  }, [state]);

  return (
    <AccountCard
      params={{
        header: "اسمك",
        description:
          "الرجاء إدخال اسمك الكامل أو اسم العرض الذي ترتاح لاستخدامه.",
      }}>
      <form action={formAction}>
        <AccountCardBody>
          <Input defaultValue={name ?? ""} name="name" />
        </AccountCardBody>
        <AccountCardFooter description="الحد الأقصى 64 حرفًا">
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
