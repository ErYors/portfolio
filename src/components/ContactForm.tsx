import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { contactDraftSchema, type ContactDraft } from '@/types'
import Button from './Button'

const inputClass =
  'w-full rounded-lg border border-border bg-surface px-4 py-3 font-body text-base text-ink focus:outline-none focus:border-ink transition-colors'

const labelClass = 'font-body text-base text-ink'
const errorClass = 'font-body text-sm text-error'

const fields: { id: 'name' | 'email'; label: string; type: string }[] = [
  { id: 'name', label: 'Name', type: 'text' },
  { id: 'email', label: 'Email', type: 'email' },
]

const INITIAL_VALUES: ContactDraft = { name: '', email: '', message: '' }

type FieldErrors = Partial<Record<keyof ContactDraft, string>>

interface ContactFormProps {
  onSubmit: (values: ContactDraft) => void
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [values, setValues] = useState<ContactDraft>(INITIAL_VALUES)
  const [errors, setErrors] = useState<FieldErrors>({})

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target
    setValues((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = contactDraftSchema.safeParse(values)
    if (!result.success) {
      const fieldErrors: FieldErrors = {}
      for (const issue of result.error.issues) {
        const key = issue.path[0]
        if (typeof key === 'string' && !(key in fieldErrors)) {
          fieldErrors[key as keyof ContactDraft] = issue.message
        }
      }
      setErrors(fieldErrors)
      return
    }
    setErrors({})
    onSubmit(result.data)
    setValues(INITIAL_VALUES)
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
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
            value={values[field.id]}
            onChange={handleChange}
            aria-invalid={errors[field.id] ? true : undefined}
            aria-describedby={
              errors[field.id] ? `${field.id}-error` : undefined
            }
            className={inputClass}
          />
          {errors[field.id] && (
            <p id={`${field.id}-error`} role="alert" className={errorClass}>
              {errors[field.id]}
            </p>
          )}
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
          value={values.message}
          onChange={handleChange}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={inputClass}
        />
        {errors.message && (
          <p id="message-error" role="alert" className={errorClass}>
            {errors.message}
          </p>
        )}
      </div>

      <Button variant="primary" type="submit">
        Send
      </Button>
    </form>
  )
}
