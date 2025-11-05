import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-[#EFEEEA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#161616] cursor-pointer hover:scale-[1.04] active:scale-[0.90]",
  {
    variants: {
      variant: {
        default: "bg-[#EFEEEA] text-[#161616] hover:bg-[#e0ded9]",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
        outline:
          "border border-[#99a1af] text-[#EFEEEA] bg-transparent hover:bg-[#99a1af]/10",
        secondary:
          "bg-[#99a1af] text-[#161616] hover:bg-[#99a1af]/80",
        ghost:
          "text-[#EFEEEA] hover:bg-[#2a2a2a] hover:text-[#EFEEEA]",
        link: "text-[#EFEEEA] underline-offset-4 hover:underline",
      },
      size: {
        default: "px-5 py-2.5",
        sm: "px-4 text-sm",
        lg: "px-6 py-3 text-lg",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  label?: string
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  label,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {label || children}
    </Comp>
  )
}

export { Button, buttonVariants }