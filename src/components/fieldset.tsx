import React from 'react';

interface FieldsetProps extends React.HTMLProps<HTMLFieldSetElement> {
  columns?: number;
  legend: string;
}

function Fieldset({ columns = 1, legend, children }: FieldsetProps) {
  return (
    <fieldset className={`grid grid-cols-${columns} gap-4 mt-4 mb-4 p-4 border-2`}>
      <legend className="text-lg font-semibold pl-2 pr-2">{legend}</legend>
      {children}
    </fieldset>
  );
}

export default Fieldset;
