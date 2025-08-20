import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Avatar = forwardRef(({ className, src, alt, size = "md", fallback, ...props }, ref) => {
  const sizes = {
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-lg",
    xl: "w-20 h-20 text-xl"
  };

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 text-primary-700 font-medium overflow-hidden shadow-soft",
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      ) : fallback ? (
        fallback
      ) : (
        <ApperIcon name="User" className="w-1/2 h-1/2" />
      )}
    </div>
  );
});

Avatar.displayName = "Avatar";

export default Avatar;