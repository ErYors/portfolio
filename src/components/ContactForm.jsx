import Button from './Button'

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-4 py-3 font-body text-base text-ink focus:outline-none focus:border-ink transition-colors'

const labelClass = 'font-body text-base text-ink'

const fields = [
  { id: 'name', label: 'Name', type: 'text', autoComplete: 'name' },
  { id: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
]

export default function ContactForm({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.(e)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-100 max-w-full flex-col items-end gap-6"
    >
      {fields.map((field) => (
        <div key={field.id} className="flex w-full flex-col gap-2">
          <label htmlFor={field.id} className={labelClass}>
            {field.label}
          </label>
          <input
            id={field.id}
            name={field.id}
            type={field.type}
            autoComplete={field.autoComplete}
            required
            className={inputClass}
          />
        </div>
      ))}

      <div className="flex w-full flex-col gap-2">
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={inputClass}
        />
      </div>

      <Button variant="primary" type="submit">
        Send
      </Button>
    </form>
  )
}
