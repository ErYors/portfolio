import Button from './Button'

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-4 py-3 font-body text-base text-ink focus:outline-none focus:border-ink transition-colors'

const labelClass = 'font-body text-base text-ink'

const fields = [
  { id: 'name', label: 'Name', type: 'text' },
  { id: 'email', label: 'Email', type: 'email' },
]

export default function ContactForm() {
  return (
    <form className="flex w-100 max-w-full flex-col items-end gap-6">
      {fields.map((field) => (
        <div key={field.id} className="flex w-full flex-col gap-2">
          <label htmlFor={field.id} className={labelClass}>
            {field.label}
          </label>
          <input id={field.id} type={field.type} className={inputClass} />
        </div>
      ))}

      <div className="flex w-full flex-col gap-2">
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea id="message" rows={5} className={inputClass} />
      </div>

      <Button variant="primary" type="submit">
        Send
      </Button>
    </form>
  )
}
