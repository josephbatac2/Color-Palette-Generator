import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  // Base: explicit text colour, high-contrast focus ring, no opacity-based text
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 hover:scale-[1.02]",
  {
    variants: {
      variant: {
        // AA-compliant: white text on blue-600/purple-600 (≥4.5:1)
        default:
          "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-blue-500/25",
        // AA-compliant: white text on red-600/pink-600 (≥4.5:1)
        destructive:
          "bg-gradient-to-r from-red-600 to-pink-700 text-white hover:from-red-700 hover:to-pink-800 shadow-red-500/25",
        // Outline: explicit dark text on near-white bg (≥7:1)
        outline:
          "border-2 border-gray-300 bg-white text-gray-900 hover:bg-gray-50 hover:border-gray-400",
        // Secondary: dark text on white/near-white (≥7:1)
        secondary:
          "bg-white text-gray-800 hover:bg-gray-100 border border-gray-200 shadow-sm",
        // Ghost: dark text, transparent bg
        ghost: "text-gray-900 hover:bg-gray-100 hover:text-gray-900",
        // Link: always dark text with underline affordance
        link: "text-blue-700 underline-offset-4 hover:underline shadow-none",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xlg: "h-14 rounded-lg px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }