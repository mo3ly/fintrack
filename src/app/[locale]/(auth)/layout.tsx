import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import Title from "@/components/auth/Title";
import { getUserAuth } from "@/lib/auth/utils";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserAuth();
  if (session?.session) redirect("/dashboard");

  return (
    <div className="bg-primary-green flex items-center mx-auto h-screen">
      <div className="mx-auto w-full">
        <Title />
        <div className="w-full">{children}</div>
        <div className="w-full flex items-center justify-center mx-auto">
          <LanguageSwitcher className="rounded-none md:rounded-md w-[90px] bg-primary-green border-0 text-black" />
        </div>
      </div>
    </div>
  );
}
