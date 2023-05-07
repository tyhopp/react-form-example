import Label from './label';

function Input({ className, ...rest }: React.HTMLProps<HTMLInputElement>) {
  return (
    <Label label={rest.placeholder} className={className}>
      <input {...rest} />
    </Label>
  );
}

export default Input;
