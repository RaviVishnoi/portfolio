import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded border-2 px-6 py-3 text-center font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb77b] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'border-[#ffb77b] bg-[#ffb77b] text-[#15121a] hover:bg-white',
        outline: 'border-[#ffb77b] bg-transparent text-white hover:bg-[#ffb77b] hover:text-[#15121a]'
      }
    },
    defaultVariants: { variant: 'primary' }
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant }), className)} ref={ref} {...props} />;
});

Button.displayName = 'Button';

export { Button, buttonVariants };
