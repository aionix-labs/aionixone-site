import * as React from 'react';
import clsx from 'clsx';

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_80px_rgba(0,229,255,0.08)]',
        className
      )}
      {...props}
    />
  );
}
