import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsRTL } from "@/lib/hooks/useIsRTL";
import { cn } from "@/lib/utils";

export default function Modal({
  title,
  open,
  setOpen,
  children,
}: {
  title?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) {
  const isRTL = useIsRTL();
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent>
        <DialogHeader className="px-5 pt-5">
          <DialogTitle className="text-start">{title ?? "Modal"}</DialogTitle>
        </DialogHeader>
        <ScrollArea
          className={cn(
            "h-full max-h-[calc(100vh-10rem)]",
            isRTL && " rtl-grid"
          )}>
          <div className="px-5 pb-5">{children}</div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
