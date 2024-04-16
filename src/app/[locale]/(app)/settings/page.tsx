"use client";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { DEFAULT_CURRENCY, currencies } from "@/constant/config";
import { useTheme } from "next-themes";

export default function Page() {
  const { setTheme } = useTheme();
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
          {/* auto update on select  */}
          <Select defaultValue={DEFAULT_CURRENCY} name="currency">
            <SelectTrigger
              className={
                "rtl-grid w-[160px] h-8 text-sm text-start bg-background"
              }>
              <SelectValue placeholder="حدد العملة" />
            </SelectTrigger>
            <SelectContent>
              {currencies?.map((currency, index) => (
                <SelectItem
                  key={index}
                  value={currency.code}
                  className="rtl-grid">
                  {currency.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <div className="mb-4">
            <h3 className="text-lg font-medium">اللغة</h3>
            <p className="text-sm text-muted-foreground">
              قم بتحديد اللغة المناسبة للنظام.
            </p>
          </div>
          <LanguageSwitcher />
        </div>
        <div>
          <div className="mb-2">
            <h3 className="text-lg font-medium">المظهر</h3>
            <p className="text-sm text-muted-foreground">
              قم بتخصيص مظهر التطبيق. التبديل التلقائي بين النماذج النهارية
              والليلية.
            </p>
          </div>
          <Button
            asChild
            variant={"ghost"}
            className="w-fit h-fit"
            onClick={() => setTheme("light")}>
            <div className="flex flex-col">
              <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                  <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                </div>
              </div>
              <span className="block w-full p-2 text-center font-normal">
                فاتح
              </span>
            </div>
          </Button>
          <Button
            asChild
            variant={"ghost"}
            onClick={() => setTheme("dark")}
            className="w-fit h-fit">
            <div className="flex flex-col">
              <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                <div className="space-y-2 rounded-sm bg-neutral-950 p-2">
                  <div className="space-y-2 rounded-md bg-neutral-800 p-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-lg bg-neutral-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-neutral-800 p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-neutral-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-neutral-800 p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-neutral-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
                  </div>
                </div>
              </div>
              <span className="block w-full p-2 text-center font-normal">
                داكن
              </span>
            </div>
          </Button>
          <Button
            asChild
            variant={"ghost"}
            onClick={() => setTheme("system")}
            className="w-fit h-fit">
            <div className="flex flex-col">
              <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                <div className="space-y-2 rounded-sm bg-neutral-300 p-2">
                  <div className="space-y-2 rounded-md bg-neutral-600 p-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-lg bg-neutral-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-neutral-600 p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-neutral-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-neutral-600 p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-neutral-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
                  </div>
                </div>
              </div>
              <span className="block w-full p-2 text-center font-normal">
                النظام
              </span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
