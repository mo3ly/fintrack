"use client";

import { useChangeLocale, useCurrentLocale } from "@/locales/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useIsRTL } from "@/lib/hooks/useIsRTL";

export function LanguageSwitcher({ className }: { className?: string }) {
  // Uncomment to preserve the search params. Don't forget to also uncomment the Suspense in the layout
  const changeLocale = useChangeLocale(/*{ preserveSearchParams: true }*/);
  const currentLocale = useCurrentLocale();
  const isRTL = useIsRTL();

  const onChange = (value: "en" | "ar") => {
    changeLocale(value);
  };

  // https://github.com/QuiiBz/next-international/blob/main/examples/next-app/app/%5Blocale%5D/layout.tsx
  return (
    <div className="/absolute /end-8 /bottom-4">
      <Select onValueChange={onChange} defaultValue={currentLocale}>
        <SelectTrigger
          className={cn(
            "w-[160px] bg-background h-8 text-sm",
            className,
            isRTL && "rtl-grid text-start"
          )}>
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem className="h-8" value="ar">
            العربية
          </SelectItem>
          <SelectItem className="h-8" value="en">
            English
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
