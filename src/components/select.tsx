import Label from './label';

interface SelectProps extends React.HTMLProps<HTMLSelectElement> {
  options: Array<React.HTMLProps<HTMLOptionElement>>;
}

function Select({ label: selectLabel, className, options = [], ...selectRest }: SelectProps) {
  return (
    <Label label={selectLabel} className={className}>
      <select {...selectRest}>
        {options.map(({ label: optionLabel, ...optionRest }) => (
          <option {...optionRest}>{optionLabel}</option>
        ))}
      </select>
    </Label>
  );
}

export default Select;
