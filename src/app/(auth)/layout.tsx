import { siteConfig } from "@/constant/config";
import { getUserAuth } from "@/lib/auth/utils";
import Link from "next/link";
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
        <Link href={"/"}>
          <h3 className="text-3xl md:text-4xl text-black font-semibold ms-4 text-center">
            {siteConfig.title}
          </h3>
        </Link>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
