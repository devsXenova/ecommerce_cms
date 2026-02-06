import { forwardRef, type FormHTMLAttributes, type LabelHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

const Form = forwardRef<HTMLFormElement, FormHTMLAttributes<HTMLFormElement>>(
  ({ className, ...props }, ref) => (
    <form ref={ref} className={cn('space-y-6', className)} {...props} />
  )
)
Form.displayName = 'Form'

interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('space-y-2', className)} {...props} />
  )
)
FormField.displayName = 'FormField'

interface FormControlProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

const FormControl = forwardRef<HTMLDivElement, FormControlProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props} />
  )
)
FormControl.displayName = 'FormControl'

interface FormItemProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

const FormItem = forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('space-y-2', className)} {...props} />
  )
)
FormItem.displayName = 'FormItem'

const FormLabel = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn('text-sm font-medium text-sage-900', className)}
      {...props}
    />
  )
)
FormLabel.displayName = 'FormLabel'

const FormMessage = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-red-600 font-medium', className)}
      {...props}
    />
  )
)
FormMessage.displayName = 'FormMessage'

const FormDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-sage-600', className)}
      {...props}
    />
  )
)
FormDescription.displayName = 'FormDescription'

export { Form, FormField, FormControl, FormItem, FormLabel, FormMessage, FormDescription }
