import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "accent" | "success" | "error" | "muted";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-full border text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 whitespace-nowrap shrink-0";
  
  const variantStyles = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
    accent: "border-transparent bg-accent text-accent-foreground",
    success: "border-transparent bg-green-500 text-white",
    error: "border-transparent bg-red-500 text-white",
    muted: "border-transparent bg-muted text-muted-foreground",
  };

  return (
    <span 
      className={cn(
        baseStyles,
        variantStyles[variant],
        className
      )}
      style={{
        fontSize: '12px',
        fontWeight: '500',
        padding: '1px 6px',
        minHeight: '14px',
        boxSizing: 'border-box',
        ...props.style
      }}
      {...props} 
    />
  );
}

export { Badge };