import useContacts from '@/hooks/useContacts'
import useToast from '@/hooks/useToast'
import type { ContactDraft } from '@/types'
import ContactForm from './ContactForm'
import SectionTitle from './SectionTitle'

export default function ContactSection({
  className = '',
}: {
  className?: string
}) {
  const { addMessage } = useContacts()
  const toast = useToast()

  const handleSubmit = (values: ContactDraft) => {
    addMessage(values)
    toast.success('Message envoyé, merci !')
  }

  return (
    <section
      id="contact"
      className={`flex flex-col items-center gap-20.25 px-6 pt-16 pb-14 ${className}`}
    >
      <SectionTitle>Contact</SectionTitle>
      <ContactForm onSubmit={handleSubmit} />
    </section>
  )
}
