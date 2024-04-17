import { checkAuth } from "@/lib/auth/utils";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import TrpcProvider from "@/lib/trpc/Provider";
import { cookies } from "next/headers";
import NextTopLoader from "nextjs-toploader";
import JoyrideTour from "@/components/JoyrideTour";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth();
  return (
    <div>
      <TrpcProvider cookies={cookies().toString()}>
        <NextTopLoader
          color="#13f999"
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #13f999,0 0 5px #13f999"
          zIndex={1600}
          showAtBottom={false}
        />
        <div className="md:flex">
          <JoyrideTour />
          <Sidebar />
          <main className="md:flex-1 md:p-8 pt-2 p-8 md:overflow-y-auto">
            <Navbar />
            {children}
          </main>
        </div>
      </TrpcProvider>

      <Toaster richColors />
    </div>
  );
}
