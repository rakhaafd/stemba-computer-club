import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const formVariants = cva(
  "space-y-6 w-full",
  {
    variants: {
      variant: {
        default: "",
        inline: "flex flex-col md:flex-row gap-4 items-end",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface FormProps extends React.ComponentProps<"form">, VariantProps<typeof formVariants> {
  asChild?: boolean
}

function Form({
  className,
  variant,
  asChild = false,
  ...props
}: FormProps) {
  const Comp = asChild ? Slot : "form"

  return (
    <Comp
      data-slot="form"
      className={cn(formVariants({ variant, className }))}
      {...props}
    />
  )
}

const FormField = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="form-field"
    className={cn("space-y-2", className)}
    {...props}
  />
))
FormField.displayName = "FormField"

const FormLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    data-slot="form-label"
    className={cn(
      "text-sm font-medium leading-none text-[#EFEEEA] peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
))
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="form-control"
    className={cn("relative", className)}
    {...props}
  />
))
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="form-description"
    className={cn("text-sm text-[#99a1af]", className)}
    {...props}
  />
))
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="form-message"
    className={cn("text-sm font-medium text-red-400", className)}
    {...props}
  />
))
FormMessage.displayName = "FormMessage"

export {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  formVariants,
}