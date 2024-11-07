import { ErrorMessage, useField } from 'formik';

import { Input } from '@/components/ui/input';

interface FormFieldProps {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
}

const FormField = (props: FormFieldProps) => {
  const [field] = useField(props.name);
  return (
    <div className="w-full">
      <label
        className="ml-2 text-xs font-medium text-textGray/80"
        htmlFor={props.name}
      >
        {props.label}
      </label>
      <div
        className={`
          flex w-full items-center gap-3 rounded-full bg-secondary p-2
        `}
      >
        <Input
          {...field}
          type={props.type}
          id={props.name}
          placeholder={props.placeholder || ''}
          className={`
            w-full border-none bg-transparent px-3 text-sm outline-none

            hover:border-none hover:outline-none
          `}
        />
      </div>
      <ErrorMessage name={props.name}>
        {(msg) => <p className="mt-2 text-sm italic text-red-500">{msg}</p>}
      </ErrorMessage>
    </div>
  );
};

export default FormField;
