import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80 px-2 py-1",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 px-2 py-1",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80 px-2 py-1",
        outline: "border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground px-2 py-1",
        accent: "border-transparent bg-accent/90 text-accent-foreground px-2 py-1",
        success: "border-transparent bg-green-500/90 text-white px-2 py-1",
        error: "border-transparent bg-red-500/90 text-white px-2 py-1",
        muted: "border-transparent bg-muted/90 text-muted-foreground px-2 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  // Debug logging for problematic badges
  if (typeof props.children === 'string' && (props.children.includes('Eco-friendly') || props.children.includes('Trending'))) {
    console.log('Rendering badge:', { variant, className, children: props.children });
  }
  return <div className={cn(badgeVariants({ variant }), "!text-xs !px-2 !py-1 !font-medium", className)} {...props} />;
}

export { Badge, badgeVariants };
