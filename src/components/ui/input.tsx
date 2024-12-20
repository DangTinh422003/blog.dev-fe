import React from 'react';

import { cn } from '@/lib/utils';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        autoComplete="off"
        className={cn(
          `
            flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm

            disabled:cursor-not-allowed disabled:opacity-50

            file:border-0 file:bg-transparent file:text-sm file:font-medium
            file:text-foreground

            focus:outline-primary

            placeholder:text-muted-foreground
          `,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
