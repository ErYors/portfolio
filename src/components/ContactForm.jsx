import { useState } from 'react'
import Button from './Button'

const inputClass =
  'w-full rounded-lg border border-border bg-surface px-4 py-3 font-body text-base text-ink focus:outline-none focus:border-ink transition-colors'

const labelClass = 'font-body text-base text-ink'

const fields = [
  { id: 'name', label: 'Name', type: 'text', autoComplete: 'name' },
  { id: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
]

const INITIAL_VALUES = { name: '', email: '', message: '' }

export default function ContactForm({ onSubmit }) {
  const [values, setValues] = useState(INITIAL_VALUES)

  const handleChange = (e) => {
    const { id, value } = e.target
    setValues((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.(values)
    setValues(INITIAL_VALUES)
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
            value={values[field.id]}
            onChange={handleChange}
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
          value={values.message}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <Button variant="primary" type="submit">
        Send
      </Button>
    </form>
  )
}
