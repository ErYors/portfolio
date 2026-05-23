import ContactSection from '../components/ContactSection'
import HeroIllustration from '../components/HeroIllustration'
import Intro from '../components/Intro'
import Projects from '../components/Projects'
import Testimonials from '../components/Testimonials'

export default function Home() {
  return (
    <>
      <HeroIllustration />
      <Intro />
      <Projects />
      <Testimonials />
      <ContactSection />
    </>
  )
}
