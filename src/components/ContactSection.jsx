import ContactForm from './ContactForm'
import SectionTitle from './SectionTitle'

export default function ContactSection({ className = '' }) {
  return (
    <section
      id="contact"
      className={`flex flex-col items-center gap-20.25 px-6 pt-16 pb-14 ${className}`}
    >
      <SectionTitle>Contact</SectionTitle>
      <ContactForm />
    </section>
  )
}
