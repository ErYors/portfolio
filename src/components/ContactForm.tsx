import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import type { ContactDraft } from '@/types'
import Button from './Button'

const inputClass =
  'w-full rounded-lg border border-border bg-surface px-4 py-3 font-body text-base text-ink focus:outline-none focus:border-ink transition-colors'

const labelClass = 'font-body text-base text-ink'

const fields: { id: 'name' | 'email'; label: string; type: string }[] = [
  { id: 'name', label: 'Name', type: 'text' },
  { id: 'email', label: 'Email', type: 'email' },
]

const INITIAL_VALUES: ContactDraft = { name: '', email: '', message: '' }

interface ContactFormProps {
  onSubmit?: (values: ContactDraft) => void
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [values, setValues] = useState<ContactDraft>(INITIAL_VALUES)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target
    setValues((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
            autoComplete={field.id}
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
