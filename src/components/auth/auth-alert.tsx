import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

interface AuthAlertProps {
  variant?: "error" | "info" | "warning" | "success";
  children: React.ReactNode;
  className?: string;
}

/**
 * AuthAlert - Consistent alert component for authentication pages
 */
export function AuthAlert({
  variant = "error",
  children,
  className,
}: AuthAlertProps) {
  const variantClasses = {
    error: "border-error/30 bg-error/10 text-error",
    info: "border-primary/30 bg-primary/10 text-primary dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-400",
    warning: "border-warning/30 bg-warning/10 text-warning",
    success: "border-success/30 bg-success/10 text-success",
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border p-3 text-sm font-medium",
        variantClasses[variant],
        className
      )}
    >
      <AlertCircle className="h-4 w-4 shrink-0" />
      <span>{children}</span>
    </div>
  );
}
