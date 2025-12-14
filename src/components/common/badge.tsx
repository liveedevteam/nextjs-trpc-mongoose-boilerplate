import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "rounded-full bg-muted px-2.5 py-0.5 text-xs text-foreground/80",
        notification:
          "min-w-[1.25rem] rounded-full bg-primary px-1.5 py-0.5 text-xs text-primary-foreground font-semibold shadow-sm",
        status: "rounded-full px-2.5 py-0.5 text-xs font-medium",
        outline:
          "rounded-full border border-border bg-transparent px-2.5 py-0.5 text-xs text-foreground/70",
      },
      color: {
        default: "",
        success: "bg-success/20 text-success dark:bg-success/15",
        warning: "bg-warning/20 text-warning dark:bg-warning/15",
        error: "bg-error/20 text-error dark:bg-error/15",
        blue: "bg-primary/20 text-primary dark:bg-primary/15",
      },
    },
    defaultVariants: {
      variant: "default",
      color: "default",
    },
  }
);

interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>,
    VariantProps<typeof badgeVariants> {}

export function Badge({
  className,
  variant,
  color,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, color }), className)}
      {...props}
    />
  );
}

