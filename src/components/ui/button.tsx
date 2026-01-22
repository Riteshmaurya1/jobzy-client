import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/50 hover:shadow-xl hover:shadow-orange-500/60 hover:scale-105 active:scale-98",
        secondary: "border-2 border-violet-500/50 text-violet-400 bg-transparent hover:bg-gray-900/50 hover:border-violet-400 backdrop-blur-sm",
        ghost: "hover:bg-gray-900/50 text-violet-400 backdrop-blur-sm",
        outline: "border-2 border-gray-800 text-white hover:bg-gray-900 hover:border-violet-500/30",
      },
      size: {
        default: "h-11 px-6 py-2",
        lg: "h-14 px-8 text-lg font-semibold",
        sm: "h-9 px-4 text-sm",
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
  VariantProps<typeof buttonVariants> { }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
