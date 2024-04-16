"use client";
import React, { useRef, useEffect, useCallback } from "react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { currencies } from "@/constant/config";
import { updateCurrency } from "@/app/[locale]/(app)/settings/actions";

import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { debounce } from "@/lib/utils";

export default function CurrencySelect({
  currency,
}: {
  currency: string | undefined;
}) {
  const [state, formAction] = useFormState(updateCurrency, {
    error: "",
  });
  const { pending } = useFormStatus();
  const formRef = useRef(null);

  React.useEffect(() => {
    if (state.success == true) toast.success("تم تحديث العملة بنجاح");
    if (state.error) toast.error("خطأ", { description: state.error });
  }, [state]);

  const onValueChange = useCallback(
    debounce((code: string) => {
      if (formRef.current && code !== currency && !pending) {
        // @ts-ignore
        formRef.current.requestSubmit();
      }
    }, 300),
    [currency, pending]
  );

  return (
    <form ref={formRef} action={formAction} method="POST">
      <Select
        defaultValue={currency}
        name="currency"
        onValueChange={onValueChange}>
        <SelectTrigger
          className={"rtl-grid w-[220px] h-8 text-sm text-start bg-background"}
          disabled={pending}>
          <SelectValue placeholder="حدد العملة" />
        </SelectTrigger>
        <SelectContent>
          {currencies?.map((currency, index) => (
            <SelectItem key={index} value={currency.code} className="rtl-grid">
              {currency.name} ( {currency.symbol} )
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </form>
  );
}
