import AboutMe from '../components/AboutMe'
import AboutPortrait from '../components/AboutPortrait'
import ContactForm from '../components/ContactForm'
import SectionTitle from '../components/SectionTitle'

export default function About() {
  return (
    <div className="relative max-w-300 mx-auto px-6 xl:px-0">
      <AboutPortrait />
      <AboutMe />

      <section className="mt-62.25 flex flex-col items-center gap-20.25 px-6 pt-16 pb-14">
        <SectionTitle>Contact</SectionTitle>
        <ContactForm />
      </section>
    </div>
  )
}
