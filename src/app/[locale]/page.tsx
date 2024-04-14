/**
 * v0 by Vercel.
 * @see https://v0.dev/t/PmwTvNfrVgf
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/constant/config";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div
      dir="ltr"
      className="flex flex-col min-h-screen items-center justify-center bg-primary-green text-black">
      <div className="duration-500 mx-auto text-center animate-in fade-in-5 slide-in-from-bottom-2 flex flex-col items-center justify-center">
        <div className="text-4xl lg:text-6xl font-bold">{siteConfig.title}</div>
        <div className="text-lg lg:text-2xl">{siteConfig.description}</div>
        <Link href={"/sign-in"} className="mt-8">
          <Button size={"lg"}>Let&apos;s start!</Button>
        </Link>
      </div>
    </div>
  );
}
