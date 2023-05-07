import React from 'react';

function Progress({ className = '', ...rest }: React.HTMLProps<HTMLProgressElement>) {
  const [inputCount, setInputCount] = React.useState<number>(0);

  React.useEffect(() => {
    const inputs = document.querySelectorAll('input[required],textarea[required],select[required]');

    if (inputs.length) {
      setInputCount(inputs.length);
    }
  }, []);

  return (
    <div className={className}>
      <p>Completion %</p>
      <progress
        {...rest}
        max={inputCount}
        className="w-full [&::-webkit-progress-bar]:bg-transparent [&::-webkit-progress-value]:bg-blue-500 border-2"
      />
    </div>
  );
}

export default Progress;
