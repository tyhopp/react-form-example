function Label({
  label,
  className = 'flex flex-col',
  children
}: React.HTMLProps<HTMLLabelElement>) {
  return (
    <label className={className}>
      <span className="pb-1">{label}</span>
      {children}
    </label>
  );
}

export default Label;
