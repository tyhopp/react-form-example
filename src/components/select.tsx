import Label from './label';

interface SelectProps extends React.HTMLProps<HTMLSelectElement> {
  options: Array<React.HTMLProps<HTMLOptionElement>>;
}

function Select({ label: selectLabel, className, options = [], ...selectRest }: SelectProps) {
  return (
    <Label label={selectLabel} className={className}>
      <select className="bg-white dark:bg-slate-900" {...selectRest}>
        {options.map(({ label: optionLabel, ...optionRest }) => (
          <option key={optionLabel} {...optionRest}>
            {optionLabel}
          </option>
        ))}
      </select>
    </Label>
  );
}

export default Select;
