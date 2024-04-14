import { cn } from "@/lib/utils";

interface LogoProps extends React.HTMLAttributes<HTMLImageElement> {}
export function Logo({ className, ...props }: LogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/images/logo.jpg" alt="logo" className={cn("h-8", className)} {...props} />
  );
}
