import SignOutBtn from "@/components/auth/SignOutBtn";
import UserSettings from "./UserSettings";
import { checkAuth, getUserAuth } from "@/lib/auth/utils";

export default async function Account() {
  await checkAuth();
  const { session } = await getUserAuth();

  return (
    <main>
      <h1 className="text-2xl font-semibold mb-2">الحساب</h1>
      <div className="space-y-4 duration-500 animate-in fade-in-5 slide-in-from-bottom-2">
        <UserSettings session={session} />
        <SignOutBtn />
      </div>
    </main>
  );
}
