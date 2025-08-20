import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ className, variant = "default", children, ...props }, ref) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary/10 to-primary-600/10 text-primary-700 border border-primary/20",
    secondary: "bg-gradient-to-r from-secondary/10 to-secondary-600/10 text-secondary-700 border border-secondary/20",
    success: "bg-gradient-to-r from-accent/10 to-accent-600/10 text-accent-700 border border-accent/20",
    warning: "bg-gradient-to-r from-warning/10 to-warning/20 text-orange-700 border border-warning/20",
    error: "bg-gradient-to-r from-error/10 to-error/20 text-red-700 border border-error/20",
    placed: "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200",
    accepted: "bg-gradient-to-r from-secondary/10 to-secondary-600/10 text-secondary-700 border border-secondary/20",
    "in-transit": "bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 border border-purple-200",
    delivered: "bg-gradient-to-r from-accent/10 to-accent-600/10 text-accent-700 border border-accent/20",
    cancelled: "bg-gradient-to-r from-error/10 to-error/20 text-red-700 border border-error/20"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all duration-200",
        variants[variant],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;