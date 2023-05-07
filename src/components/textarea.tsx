import Label from './label';

function Textarea({ className, ...rest }: React.HTMLProps<HTMLTextAreaElement>) {
  return (
    <Label label={rest.placeholder} className={className}>
      <textarea className="bg-white dark:bg-slate-900" {...rest} />
    </Label>
  );
}

export default Textarea;
