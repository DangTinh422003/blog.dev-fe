import { cn } from '@/lib/utils';

interface FormFieldErrorProps extends React.HTMLAttributes<HTMLSpanElement> {
  errorMsg?: string;
}

const FormFieldError = ({
  errorMsg = '',
  className,
  ...rest
}: FormFieldErrorProps) => {
  return (
    <span
      className={cn('mt-1 px-6 text-xs text-destructive', className)}
      {...rest}
    >
      {errorMsg}
    </span>
  );
};

export default FormFieldError;
