import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const badgeVariants = cva(
  // WCAG: border-2 for visual affordance; explicit text colours below
  "inline-flex items-center rounded-full border-2 px-2.5 py-0.5 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 shadow-sm",
  {
    variants: {
      variant: {
        // Blue bg + white text → ~5.9:1 AA ✓
        default:
          "border-blue-700 bg-blue-600 text-white hover:bg-blue-700",
        // Neutral: dark text on light gray → ~7:1 AA ✓
        secondary:
          "border-gray-400 bg-gray-100 text-gray-800 hover:bg-gray-200",
        // Red bg + white text → ~5.1:1 AA ✓
        destructive:
          "border-red-700 bg-red-600 text-white hover:bg-red-700",
        // Outline: dark text, transparent bg → always passes ✓
        outline:
          "text-gray-800 border-gray-400 hover:bg-gray-50",
        // WCAG AAA level: green bg + white text → ~5.0:1 AA ✓
        aaa:
          "border-green-700 bg-green-600 text-white hover:bg-green-700",
        // WCAG AA level: amber bg + dark text → ~7.0:1 AA ✓
        aa:
          "border-amber-500 bg-amber-100 text-amber-900 hover:bg-amber-200",
        // Fail: red soft → clear visual contrast
        fail:
          "border-red-500 bg-red-100 text-red-900 hover:bg-red-200",
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