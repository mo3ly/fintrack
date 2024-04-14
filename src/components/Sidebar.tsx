import Link from "next/link";

import SidebarItems from "./SidebarItems";
import { Avatar, AvatarFallback } from "./ui/avatar";

import { AuthSession, getUserAuth } from "@/lib/auth/utils";
import { siteConfig } from "@/constant/config";
import SignOutBtn from "@/components/auth/SignOutBtn";

const Sidebar = async () => {
  const session = await getUserAuth();
  if (session.session === null) return null;

  return (
    <aside className="h-screen min-w-52 bg-primary-green text-black sticky top-0 hidden md:block p-4 pt-8 ">
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-4">
          <Link href={"/dashboard"}>
            <h3 className="text-lg font-semibold ms-4">{siteConfig.titleAr}</h3>
          </Link>
          <SidebarItems />
        </div>
        <div className="w-full">
          <UserDetails session={session} />
          {/* <br />
          <SignOutBtn /> */}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

const UserDetails = ({ session }: { session: AuthSession }) => {
  if (session.session === null) return null;
  const { user } = session.session;

  if (!user?.name || user.name.length == 0) return null;

  return (
    <Link href="/account">
      <div className="flex items-center justify-between w-full border-t border-black pt-4 px-2">
        <div className="text-black">
          <p className="text-xs">{user.name ?? "John Doe"}</p>
          <p className="text-xs font-light pe-4">
            {user.email ?? "john@doe.com"}
          </p>
        </div>
        <Avatar className="h-10 w-10">
          <AvatarFallback className="border-black bg-black border-2 text-zinc-400">
            {user.name
              ? user.name
                  ?.split(" ")
                  .map((word) => word[0].toUpperCase())
                  .join("")
              : "~"}
          </AvatarFallback>
        </Avatar>
      </div>
    </Link>
  );
};
