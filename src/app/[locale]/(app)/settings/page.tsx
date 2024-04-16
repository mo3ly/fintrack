import CurrencySelect from "@/app/[locale]/(app)/settings/CurrencySelect";
import ModeToggle from "@/app/[locale]/(app)/settings/ModeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getUserAuth } from "@/lib/auth/utils";

export default async function Page() {
  const { session } = await getUserAuth();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">الإعدادات</h1>
      <div className="space-y-4 my-4 duration-500 animate-in fade-in-5 slide-in-from-bottom-2">
        <div className="mb-4">
          <div className="mb-4">
            <h3 className="text-lg font-medium">العملة</h3>
            <p className="text-sm text-muted-foreground">
              قم بتحديد العملة المناسبة للدولة.
            </p>
          </div>
          <CurrencySelect currency={session?.user?.currency} />
        </div>
        <div className="mb-4">
          <div className="mb-4">
            <h3 className="text-lg font-medium">اللغة</h3>
            <p className="text-sm text-muted-foreground">
              قم بتحديد اللغة المناسبة للنظام.
            </p>
          </div>
          <LanguageSwitcher className="w-[220px]" />
        </div>
        <ModeToggle />
      </div>
    </div>
  );
}
