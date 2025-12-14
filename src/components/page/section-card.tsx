import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { IconButton } from "@/components/common/icon-button";
import type { LucideIcon } from "lucide-react";

interface SectionCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  onIconClick?: () => void;
  iconTooltip?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export function SectionCard({
  title,
  description,
  icon,
  onIconClick,
  iconTooltip,
  children,
  className,
  contentClassName,
}: SectionCardProps) {
  return (
    <Card className={cn("border-border bg-card shadow-sm dark:shadow-lg dark:shadow-black/5", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          {title}
        </CardTitle>
        {description && <CardDescription className="text-muted-foreground">{description}</CardDescription>}
        {icon && (
          <CardAction>
            <IconButton
              icon={icon}
              variant="ghost"
              onClick={onIconClick}
              aria-label={iconTooltip}
              className="text-primary hover:bg-primary/10"
            />
          </CardAction>
        )}
      </CardHeader>
      <CardContent className={contentClassName}>{children}</CardContent>
    </Card>
  );
}

