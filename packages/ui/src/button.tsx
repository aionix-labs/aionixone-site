import * as React from 'react';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'ghost';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  asChild?: boolean;
  children: React.ReactNode;
};

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-cyan-500 text-black hover:bg-cyan-400',
  ghost: 'border border-white/20 text-white hover:border-white/60'
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className, asChild, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium transition';
    const Comp: any = asChild ? 'span' : 'button';

    return (
      <Comp ref={ref} className={clsx(baseStyles, variants[variant], className)} {...props}>
        {children}
      </Comp>
    );
  }
);

Button.displayName = 'Button';
