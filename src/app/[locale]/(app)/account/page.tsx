import SignOutBtn from "@/components/auth/SignOutBtn";
import UserSettings from "./UserSettings";
import { checkAuth, getUserAuth } from "@/lib/auth/utils";
import { getScopedI18n } from "@/locales/server";

export default async function Account() {
  await checkAuth();
  const { session } = await getUserAuth();
  const t = await getScopedI18n("account");
  return (
    <main>
      <h1 className="text-2xl font-semibold mb-2">{t("title")}</h1>
      <div className="space-y-4 duration-500 animate-in fade-in-5 slide-in-from-bottom-2">
        <UserSettings session={session} />
        <SignOutBtn />
      </div>
    </main>
  );
}
