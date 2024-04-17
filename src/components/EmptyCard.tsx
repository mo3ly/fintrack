import { ImageIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

interface EmptyCardProps extends React.ComponentPropsWithoutRef<typeof Card> {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }> | React.ReactNode;
}

// https://github.com/sadmann7/file-uploader/blob/main/src/components/empty-card.tsx
export function EmptyCard({
  title,
  description,
  icon: Icon = ImageIcon,
  action,
  className,
  ...props
}: EmptyCardProps) {
  const isComponent = Icon && typeof Icon === "function";
  return (
    <Card
      className={cn(
        "flex w-full flex-col items-center justify-center space-y-6 bg-transparent p-16",
        className
      )}
      {...props}>
      <div className="shrink-0 rounded-full border border-dashed p-4">
        {isComponent ? (
          <Icon className="size-8 text-muted-foreground" aria-hidden="true" />
        ) : (
          Icon
        )}
      </div>
      <div className="flex flex-col items-center gap-1.5 text-center">
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </div>
      {action ? action : null}
    </Card>
  );
}
