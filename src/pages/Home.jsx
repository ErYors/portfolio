import Intro from '../components/Intro'
import Projects from '../components/Projects'
import yellowBg from '../assets/yellow-bg.png'
import heroWoman from '../assets/hero-woman.png'
import ContactForm from '../components/ContactForm'
import SectionTitle from '../components/SectionTitle'

export default function Home() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 hidden sm:block w-180 max-w-[50%]"
      >
        <img src={yellowBg} alt="" className="w-full h-auto" />
        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage: `url(${yellowBg})`,
            maskImage: `url(${yellowBg})`,
            WebkitMaskSize: '100% 100%',
            maskSize: '100% 100%',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'top right',
            maskPosition: 'top right',
          }}
        >
          <img src={heroWoman} alt="" className="w-full h-auto" />
        </div>
      </div>

      <Intro />
      <Projects />

      <section id="contact" className="flex flex-col items-center gap-20.25 px-6 pt-16 pb-14">
        <SectionTitle>Contact</SectionTitle>
        <ContactForm />
      </section>
    </>
  )
}
