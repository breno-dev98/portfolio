import React from "react";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export function StatsPainel({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: LucideIcon;
}) {
  return (
    <Card className="p-5 gap-0 bg-[image:var(--gradient-card)] border-border">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <p className="font-display text-3xl font-semibold mt-2">{value}</p>
    </Card>
  );
}
