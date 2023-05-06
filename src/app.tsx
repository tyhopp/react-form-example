import React from "react"

function App() {
  const formRef = React.useRef<HTMLFormElement>(null)
  const submittedFormDataRef = React.useRef<HTMLDivElement>(null)

  const [inputCount, setInputCount] = React.useState<number>(0)
  const [finishedInputs, setFinishedInputs] = React.useState<Set<string>>(new Set())
  const [formData, setFormData] = React.useState<FormData | null>(null)

  React.useEffect(() => {
    if (!formRef.current) {
      return
    }

    const inputs = formRef.current.querySelectorAll("input[required],textarea[required],select[required]")
    
    if (inputs.length) {
      setInputCount(inputs.length)
    }
  }, [])

  function onClear() {
    formRef.current?.reset()
    setFormData(null)
    setFinishedInputs(new Set())
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setFormData(new FormData(formRef.current as HTMLFormElement))

    setTimeout(() => {
      if (submittedFormDataRef.current) {
      submittedFormDataRef.current.scrollIntoView()
      }
    }, 0)
  }

  function onChange(event: React.FormEvent<HTMLFormElement>) {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

    if (!target.required) {
      return
    }

    if (target.value && !finishedInputs.has(target.name)) {
      setFinishedInputs((ids) => new Set(ids).add(target.name))
    }

    if (!target.value && finishedInputs.has(target.name)) {
      setFinishedInputs((ids) => {
        const newIds = new Set(ids)
        newIds.delete(target.name)
        return newIds
      })
    }
  }

  return (
    <main className="flex flex-col justify-center items-center w-vw h-vh p-4">
      <section className="max-w-2xl">
        <h1 className="text-3xl font-bold">React Form</h1>

        <p className="mt-2 mb-8">An example form built with React and Tailwind.</p>

        <div className="mt-4 mb-2">
          <p>Completion %</p>
          <progress value={finishedInputs.size} max={inputCount} className="w-full [&::-webkit-progress-bar]:bg-transparent [&::-webkit-progress-value]:bg-blue-500 border-2" />
        </div>

        <form ref={formRef} name="profile" className="flex flex-col max-w-2xl" onChange={onChange} onSubmit={onSubmit}>
          <fieldset className="grid grid-cols-2 gap-4 mt-4 mb-4 p-4 border-2">
            <legend className="text-lg font-semibold pl-2 pr-2">Profile</legend>
            <input name="first-name" type="text" required placeholder="First Name" />
            <input name="second-name" type="text" required placeholder="Last Name" />
            <input name="email" type="email" placeholder="Email" className="col-span-2" />
            <input name="telephone" type="tel" placeholder="Telephone" className="col-span-2" />
            <textarea name="bio" placeholder="Bio" className="col-span-2" />
            <label className="flex flex-col col-span-2">
              <span className="pb-1">Birthday</span>
              <input name="date" type="date" placeholder="Birthday" />
            </label>
            <label className="flex flex-col">
              <span className="pb-1">Team</span>
              <select name="team">
                <option value="team-1">Team 1</option>
                <option value="team-2">Team 2</option>
              </select>
            </label>
            <label className="flex flex-col">
              <span className="pb-1">Color</span>
              <select name="color">
                <option value="red">Red</option>
                <option value="blue">Blue</option>
              </select>
            </label>
          </fieldset>

          <fieldset className="grid grid-cols-1 gap-4 mt-4 mb-4 p-4 border-2">
            <legend className="text-lg font-semibold pl-2 pr-2">Pet</legend>
            <input name="pet-name" type="text" required placeholder="Name" />
            <textarea name="pet-bio" placeholder="Bio" />
            <label className="flex flex-col">
              <span className="pb-1">Birthday</span>
              <input name="pet-date" type="date" placeholder="Birthday" />
            </label>
          </fieldset>

          <div className="self-end">
            <button type="button" onClick={onClear} className="pt-2 pb-2 pl-6 pr-6 mt-4 mr-4 border-2 hover:border-slate-300 active:border-slate-400">Clear</button>
            <button type="submit" className="text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 pt-2 pb-2 pl-6 pr-6 mt-4">Submit</button>
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
  )
}

export default App
