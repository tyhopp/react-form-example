import Label from './label';

function Textarea({ className, ...rest }: React.HTMLProps<HTMLTextAreaElement>) {
  return (
    <Label label={rest.placeholder} className={className}>
      <textarea {...rest} />
    </Label>
  );
}

export default Textarea;
