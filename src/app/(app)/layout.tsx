import { checkAuth } from "@/lib/auth/utils";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import TrpcProvider from "@/lib/trpc/Provider";
import { cookies } from "next/headers";
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth();
  return (
    <div>
      <TrpcProvider cookies={cookies().toString()}>
        <div className="md:flex">
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
