// import Link from "next/link";
import { Link } from "next-view-transitions";

import SidebarItems from "./SidebarItems";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import { AuthSession, getUserAuth } from "@/lib/auth/utils";
import { siteConfig } from "@/constant/config";
import SignOutBtn from "@/components/auth/SignOutBtn";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import SidebarLogo from "@/components/SidebarLogo";
import { ModeToggle } from "@/components/ui/ThemeToggle";

const Sidebar = async () => {
  const session = await getUserAuth();
  if (session.session === null) return null;

  return (
    <aside className="h-screen min-w-52 bg-primary-green text-black sticky top-0 hidden md:block p-4 pt-8 ">
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-4 tour-step-1">
          <div className="flex items-center justify-between"></div>
          <SidebarLogo />
          <SidebarItems />
        </div>
        <div className="w-full">
          <div className="flex items-center justify-between mb-1">
            <LanguageSwitcher className="text-xs bg-transparent border-0 md:flex hidden w-[90px] rounded-none px-2" />
            <ModeToggle />
          </div>
          <UserDetails session={session} />
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
          <AvatarImage
            src={
              user.avatarUrl ||
              `https://api.dicebear.com/8.x/initials/svg?backgroundType=solid&fontFamily=Tahoma&fontSize=36&seed=${user.name}`
            }
          />
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
