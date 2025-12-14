import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface QuickActionCardProps {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string;
  iconBgColor?: string;
  className?: string;
}

/**
 * QuickActionCard - Reusable card for quick action links
 * Used in dashboard quick actions section
 */
export function QuickActionCard({
  href,
  icon: Icon,
  title,
  description,
  iconColor = "text-primary",
  iconBgColor = "bg-primary/10",
  className,
}: QuickActionCardProps) {
  return (
    <Link href={href} className={cn("group", className)}>
      <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/50 hover:bg-accent hover:shadow-md dark:shadow-black/5">
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105",
            iconBgColor
          )}
        >
          <Icon className={cn("h-6 w-6", iconColor)} />
        </div>
        <div>
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Link>
  );
}
