import Header from './components/Header'
import Intro from './components/Intro'
import ProjectCard from './components/ProjectCard'
import SectionTitle from './components/SectionTitle'
import yellowBg from './assets/yellow-bg.png'
import heroWoman from './assets/hero-woman.png'
import project1 from './assets/project-1.png'

function App() {
  return (
    <div className="relative min-h-screen bg-white">
      <Header />

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

      <main>
        <Intro />

        <section className="max-w-248 mx-auto px-6 py-16">
          <SectionTitle>Projects</SectionTitle>

          <div className="mt-10">
            <ProjectCard
              name="Project Name"
              description="I created this personal project in order to show how to create an interface in Figma using a portfolio as an example."
              image={project1}
            />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
