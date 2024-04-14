import { DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  revenue: string;
  change: string;
  className?: string;
}

export default function StatsCard({
  revenue,
  change,
  title,
  className = "",
}: StatsCardProps) {
  return (
    <Card className={`${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs md:text-sm font-medium">
          {title}
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground hidden md:block" />
      </CardHeader>
      <CardContent>
        <div className="text-xl md:text-2xl font-bold">{revenue}</div>
        <p className="text-xs text-muted-foreground">{change}</p>
      </CardContent>
    </Card>
  );
}
