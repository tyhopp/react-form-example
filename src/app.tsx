import React from 'react';
import Progress from './components/progress.tsx';
import Fieldset from './components/fieldset.tsx';
import Input from './components/input.tsx';
import Textarea from './components/textarea.tsx';
import Select from './components/select.tsx';

function App() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const submittedFormDataRef = React.useRef<HTMLDivElement>(null);

  const [finishedInputs, setFinishedInputs] = React.useState<Set<string>>(new Set());
  const [formData, setFormData] = React.useState<FormData | null>(null);

  function onClear() {
    formRef.current?.reset();
    setFormData(null);
    setFinishedInputs(new Set());
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setFormData(new FormData(formRef.current as HTMLFormElement));

    setTimeout(() => {
      if (submittedFormDataRef.current) {
        submittedFormDataRef.current.scrollIntoView();
      }
    }, 0);
  }

  function onChange(event: React.FormEvent<HTMLFormElement>) {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

    if (!target.required) {
      return;
    }

    if (target.value && !finishedInputs.has(target.name)) {
      setFinishedInputs((ids) => new Set(ids).add(target.name));
    }

    if (!target.value && finishedInputs.has(target.name)) {
      setFinishedInputs((ids) => {
        const newIds = new Set(ids);
        newIds.delete(target.name);
        return newIds;
      });
    }
  }

  return (
    <main className="flex flex-col justify-center items-center w-vw h-vh p-4">
      <section className="max-w-2xl">
        <h1 className="text-3xl font-bold">React Form</h1>
        <p className="mt-2 mb-8">An example form built with React and Tailwind.</p>
        <Progress value={finishedInputs.size} className="mt-4 mb-2" />

        <form
          ref={formRef}
          name="profile"
          className="flex flex-col max-w-2xl"
          onChange={onChange}
          onSubmit={onSubmit}
        >
          <Fieldset columns={2} legend="Profile">
            <Input name="first-name" type="text" required placeholder="First Name" />
            <Input name="second-name" type="text" required placeholder="Last Name" />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              className="flex flex-col col-span-2"
            />
            <Input
              name="telephone"
              type="tel"
              placeholder="Telephone"
              className="flex flex-col col-span-2"
            />
            <Textarea name="bio" placeholder="Bio" className="flex flex-col col-span-2" />
            <Input
              name="date"
              type="date"
              placeholder="Birthday"
              className="flex flex-col col-span-2"
            />
            <Select
              name="team"
              label="Team"
              options={[
                { value: 'team-1', label: 'Team 1' },
                { value: 'team-2', label: 'Team 2' }
              ]}
            />
            <Select
              name="color"
              label="Color"
              options={[
                { value: 'red', label: 'Red' },
                { value: 'blue', label: 'Blue' }
              ]}
            />
          </Fieldset>

          <Fieldset legend="Pet">
            <Input name="pet-name" type="text" required placeholder="Name" />
            <Textarea name="pet-bio" placeholder="Bio" />
            <Input name="pet-date" type="date" placeholder="Birthday" />
          </Fieldset>

          <div className="self-end">
            <button
              type="button"
              onClick={onClear}
              className="pt-2 pb-2 pl-6 pr-6 mt-4 mr-4 border-2 hover:border-slate-300 active:border-slate-400"
            >
              Clear
            </button>
            <button
              type="submit"
              className="text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 pt-2 pb-2 pl-6 pr-6 mt-4"
            >
              Submit
            </button>
          </div>
        </form>

        {formData && (
          <div ref={submittedFormDataRef} className="mt-4">
            <h2 className="text-xl font-semibold pb-4">Submitted Form Data</h2>
            <pre className="font-mono border-2 p-4 text-sm">
              {JSON.stringify(Object.fromEntries(formData), null, 2)}
            </pre>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
