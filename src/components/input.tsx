import Label from './label';

function Input({ className, ...rest }: React.HTMLProps<HTMLInputElement>) {
  return (
    <Label label={rest.placeholder} className={className}>
      <input className="bg-white dark:bg-slate-900" {...rest} />
    </Label>
  );
}

export default Input;
