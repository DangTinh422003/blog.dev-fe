const FormFieldError = ({ errorMsg }: { errorMsg: string }) => {
  return <p className="mt-1 px-6 text-xs text-destructive">{errorMsg}</p>;
};

export default FormFieldError;
