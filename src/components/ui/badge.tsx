import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border-2 px-2.5 py-0.5 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-sm",
  {
    variants: {
      variant: {
        default:
          "border-blue-200 bg-primary text-primary-foreground hover:bg-primary/80 hover:shadow-md",
        secondary:
          "border-gray-200 bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-md",
        destructive:
          "border-red-200 bg-destructive text-destructive-foreground hover:bg-destructive/80 hover:shadow-md",
        outline: "text-foreground border-gray-300 hover:bg-gray-50 hover:shadow-md",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }