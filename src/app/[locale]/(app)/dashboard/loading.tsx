import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="grid place-items-center animate-pulse text-muted-foreground p-4">
      <div role="status">
        <Loader className="w-8 h-8 text-muted-foreground fill-muted animate-spin" />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
