import Header from "@/components/web/Header";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-primary-green text-black">
      <div className="absolute top-3 flex items-center space-s-1">
        <Link
          href={"https://x.com/mo3lyy"}
          target="_blank"
          rel="noopener noreferrer">
          <Button variant={"linkHover2"}>
            <ExternalLinkIcon className="me-1" /> X/Twitter
          </Button>
        </Link>
        <Link
          href={"https://github.com/mo3ly/fintrack"}
          target="_blank"
          rel="noopener noreferrer">
          <Button variant={"linkHover2"}>
            <ExternalLinkIcon className="me-1" /> Github
          </Button>
        </Link>
      </div>
      <Header />
    </div>
  );
}
